import ballerina/sql;
import ballerina/io;


isolated function addHospital(Hospital hospital) returns json|error {
    io:println(hospital);

    // Generate a new HOSPITAL ID
    HospitalID|error h = dbClient->queryRow(`SELECT HospitalID FROM Hospital ORDER BY HospitalID DESC LIMIT 1`);
    string newHospitalId = "H001";

    if h is HospitalID {
        string? lastId = h.HospitalID;
        if lastId is string {
            newHospitalId = IdIncriment(lastId);
        }
    }

    // Create a new Hospital record with the new Hospital Id
    Hospital newHospital = hospital.clone();
    newHospital.hospital_id = newHospitalId;
    string password = check generatePassword(12);
    newHospital.password = check hashPassword(password);
    // Insert into Hospital table (now includes password)
    sql:ParameterizedQuery addHospital = `INSERT INTO hospital(
        HospitalID, Name, District, Contact, AddressLine1, AddressLine2, AddressLine3, Username, Email)
         VALUES(
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

    // Insert into login table
    sql:ParameterizedQuery addLoginDetails = `INSERT INTO login(UserName, Password, HospitalID, UserType) 
        VALUES(
        ${newHospital.username},
        ${newHospital.password},
        ${newHospital.hospital_id},
        "Hospital")`;


    string htmlBody = "<html>" +
        "<head>" +
        "<meta charset='UTF-8'>" +
        "<title>Password Reset</title>" +
        "<style>" +
        "body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }" +
        ".container { max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }" +
        "h2 { color: #333333; }" +
        "p { color: #555555; font-size: 16px; }" +
        ".password-box { background-color: #f0f0f0; border-radius: 5px; padding: 15px; font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0; letter-spacing: 1px; }" +
        ".footer { font-size: 12px; color: #999999; margin-top: 30px; text-align: center; }" +
        "</style>" +
        "</head>" +
        "<body>" +
        "<div class='container'>" +
        "<h2>Password Reset Request</h2>" +
        "<p>Dear "+ newHospital.name +",</p>" +
        "<p>Your account password has been requested. Use the following password to log in:</p>" +
        "<div class='password-box'> "+password+"</div>" +
        "<p>For security reasons, we recommend changing this password after your first login.</p>" +
        "<p>Thank you,<br>Support Team</p>" +
        "<div class='footer'>&copy; 2025 Your Company Name. All rights reserved.</div>" +
        "</div>" +
        "</body>" +
        "</html>";

    error? mail =  sendEmail(newHospital.email,"Welcome to BBMS - Your Account Details",htmlBody);

    if mail != (){
        return mail;
    }

    sql:ExecutionResult|error result = dbClient->execute(addHospital);
    sql:ExecutionResult|error loginResult = dbClient->execute(addLoginDetails);

    if result is error && loginResult is error {
        return error("Hospital already exists!");
    } else if result is error {
        return error("Please enter valid data");
    }
    
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
            hospital_id: newHospitalId
            };
            _ = check addCamp(hospitalCamp);
    }
    return {"message": "Hospital added successfully!"};
}

isolated function getHospital(string? id = (), string? username = (), string? email = ()) returns Hospital|error {

    Hospital|error hospital;

    if id is string {
        hospital = check dbClient->queryRow(`
            SELECT * FROM Hospital WHERE HospitalID = ${id}`
            );
    } else if username is string {
        hospital = check dbClient->queryRow(`
            SELECT * FROM Hospital WHERE Username = ${username}`
            );
    } else if email is string {
        hospital = check dbClient->queryRow(`
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
    if district == "All"{
        resultStream = dbClient->query( `SELECT HospitalID,Name FROM Hospital`,HospitalDetails);
    }else{
        resultStream = dbClient->query(`SELECT HospitalID,Name FROM Hospital WHERE District = ${district}` ,HospitalDetails);
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
    
    if updateCamp is error{
        return updateCamp;
    }


    return result;
}