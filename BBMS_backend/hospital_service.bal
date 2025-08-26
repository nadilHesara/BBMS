import ballerina/io;
import ballerina/sql;

isolated function addHospital(Hospital hospital) returns json|error {
    io:println("Hospital request: ", hospital);

    // 1. Generate HospitalID
    HospitalID|error h = dbClient->queryRow(`SELECT HospitalID FROM Hospital ORDER BY HospitalID DESC LIMIT 1`);
    string newHospitalId = "H001";
    if h is HospitalID {
        string? lastId = h.HospitalID;
        if lastId is string {
            newHospitalId = IdIncriment(lastId);
        }
    }

    // 2. Prepare hospital record
    Hospital newHospital = hospital.clone();
    newHospital.hospital_id = newHospitalId;
    string plainPassword = check generatePassword(12);
    newHospital.password = check hashPassword(plainPassword);

    // 3. Insert hospital
    sql:ParameterizedQuery addHospital = `INSERT INTO hospital(
        HospitalID, Name, District, Contact, AddressLine1, AddressLine2, AddressLine3, Username, Email
    ) VALUES (
        ${newHospital.hospital_id},
        ${newHospital.name},
        ${newHospital.District},
        ${newHospital.contact_no},
        ${newHospital.address_line1},
        ${newHospital.address_line2},
        ${newHospital.address_line3},
        ${newHospital.username},
        ${newHospital.email}
    )`;

    sql:ExecutionResult|error result = dbClient->execute(addHospital);
    if result is error {
        return error("Hospital insert failed: " + result.toString());
    }

    // 4. Insert login
    sql:ParameterizedQuery addLoginDetails = `INSERT INTO login(UserName, Password, HospitalID, UserType)
        VALUES(${newHospital.username}, ${newHospital.password}, ${newHospital.hospital_id}, "Hospital")`;

    sql:ExecutionResult|error loginResult = dbClient->execute(addLoginDetails);
    if loginResult is error {
        return error("Login insert failed: " + loginResult.toString());
    }

    // 5. Auto-create campaign if needed
    if newHospital.isCampaign == 1 {
        Campaign hospitalCamp = {
            campain_id: newHospitalId,
            CampaignName: newHospital.name,
            district: newHospital.District,
            org_name: newHospital.name,
            org_email: newHospital.email,
            org_tele: newHospital.contact_no,
            date: (),
            add_line1: newHospital.address_line1,
            add_line2: newHospital.address_line2,
            add_line3: newHospital.address_line3,
            doner_count: (),
            start_time: (),
            end_time: (),
            hospital_id: newHospitalId,
            location: ()
        };
        json|error camp = addCamp(hospitalCamp);
        if camp is error {
            return camp;
        }
    }

    // 6. Send email last
    string htmlBody = "<html><body><h2>Welcome " + newHospital.name + "</h2>" +
        "<p>Your account has been created successfully.</p>" +
        "<p><b>Username:</b> " + newHospital.username + "</p>" +
        "<p><b>Password:</b> " + plainPassword + "</p>" +
        "<p>Please log in and change your password immediately.</p>" +
        "</body></html>";

    error? mail = sendEmail(newHospital.email, "Welcome to BBMS - Your Account Details", htmlBody);
    if mail is error {
        return mail;
    }

    return { "message": "Hospital added successfully!" };
}


isolated function getHospital(string? id = (), string? username = (), string? email = ()) returns Hospital|error {

    Hospital|error hospital;

    if id is string {
        hospital =  dbClient->queryRow(`
            SELECT * FROM Hospital WHERE HospitalID = ${id}`
            );
    } else if username is string {
        hospital =  dbClient->queryRow(`
            SELECT * FROM Hospital WHERE Username = ${username}`
            );
    } else if email is string {
        hospital =  dbClient->queryRow(`
            SELECT * FROM Hospital WHERE Email = ${email}`
            );
    } else {
        hospital = error("Hospital does't exist");
    }

    return hospital;
}

isolated function getAllHospitals(string? district) returns HospitalDetails[]|error {
    HospitalDetails[] hospitals = [];
    stream<HospitalDetails, error?> resultStream;
    if district == "All" {
        resultStream = dbClient->query(`SELECT HospitalID,Name FROM Hospital`, HospitalDetails);
    } else {
        resultStream = dbClient->query(`SELECT HospitalID,Name FROM Hospital WHERE District = ${district}`, HospitalDetails);
    }

    check from HospitalDetails hospital in resultStream
        do {
            hospitals.push(hospital);
        };
    check resultStream.close();
    return hospitals;
}

isolated function updateHospital(Hospital hospital) returns sql:ExecutionResult|error {
    sql:ExecutionResult|error result = dbClient->execute(`
        UPDATE Hospital SET 
            Name = ${hospital.name},
            District = ${hospital.District},
            Contact = ${hospital.contact_no},
            AddressLine1 = ${hospital.address_line1},
            AddressLine2 = ${hospital.address_line2},
            AddressLine3 = ${hospital.address_line3} 
        WHERE   HospitalID = ${hospital.hospital_id} AND Username = ${hospital.username} AND Email = ${hospital.email}
    `);

    if result is error {
        return result;
    }

    sql:ExecutionResult|error updateCamp = dbClient->execute(`UPDATE campaign SET
                District = ${hospital.District},
                OrganizerTelephone = ${hospital.contact_no},
                AddressLine1 = ${hospital.address_line1},
                AddressLine2 = ${hospital.address_line2},
                AddressLine3 = ${hospital.address_line3},
            WHERE HospitalID = ${hospital.hospital_id} AND CampaignName = ${hospital.name}`);

    if updateCamp is error {
        return updateCamp;
    }

    return result;
}
