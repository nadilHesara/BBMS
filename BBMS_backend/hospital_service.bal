import ballerina/sql;

isolated function addHospital(Hospital hospital) returns json|error {
    // Generate a new HOSPITAL ID

    HospitalID|error h = dbClient->queryRow(`SELECT HospitalID FROM Hospital ORDER BY HospitalID DESC LIMIT 1`);
    string newHospitalId;

    if h is HospitalID {
        string? lastId = h.HospitalID;
        if lastId is string {
            newHospitalId = IdIncriment(lastId);
        } else {
            newHospitalId = "H001";
        }
    } else {
        newHospitalId = "H001";
    }

    // Create a new Hospital record with the new Hospital Id
    Hospital newHospital = hospital.clone();
    newHospital.hospital_id = newHospitalId;
    newHospital.password = check generatePassword(12);

    sql:ParameterizedQuery addHospital = `INSERT INTO Hospital(HospitalID, Name, District, Contact, AddressLine1, AddressLine2, AddressLine3, Username, Password, Email)
        VALUES(
            ${newHospital.hospital_id},
            ${newHospital.name},
            ${newHospital.District},
            ${newHospital.contact_no},
            ${newHospital.address_line1},
            ${newHospital.address_line2},
            ${newHospital.address_line3},
            ${newHospital.username},
            ${newHospital.password},
            ${newHospital.email}
        )`;

    sql:ParameterizedQuery addLoginDetails = `INSERT INTO login(UserName , Password , HospitalID  , UserType) 
            VALUES(
            ${newHospital.username},
            ${newHospital.password},
            ${newHospital.hospital_id},
            "Hospital")`;

    sql:ExecutionResult|error result = dbClient->execute(addHospital);
    sql:ExecutionResult|error loginResult = dbClient->execute(addLoginDetails);

    if result is error && loginResult is error {
        return error("Hospital already exist!");
    }
    else if result is error && loginResult is sql:ExecutionResult {
        return error("Please enter valid data");
    } else {
        _ = check sendEmail(newHospital.email, newHospital.password, newHospital.username);
        return {"message": "Hospital adedd sucsessfully!"};
    }
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

isolated function getAllHospitals(string? district) returns HospitalName[]|error {
    HospitalName[] hospitals = [];
    stream<HospitalName, error?> resultStream;
    if district == (){
        resultStream = dbClient->query( ` SELECT Name FROM Hospital`,HospitalName);
    }else{
        resultStream = dbClient->query(` SELECT Name FROM Hospital WHERE District = ${district}` ,HospitalName);
    }
    
    check from HospitalName hospital in resultStream
        do {
            hospitals.push(hospital);
        };
    check resultStream.close();
    return hospitals;
}

isolated function updateHospital(Hospital hospital) returns sql:ExecutionResult|error {
    sql:ExecutionResult|error result = check dbClient->execute(`
        UPDATE Hospital SET
            Name = ${hospital.name},
            District = ${hospital.District},
            Conatct = ${hospital.contact_no},
            AddressLine1 = ${hospital.address_line1},
            AddressLine2 = ${hospital.address_line2},
            AddressLine3 = ${hospital.address_line3},
            ProfileImage = ${hospital.profileImage}
        WHERE  (HospitalID = ${hospital.hospital_id} AND Username = ${hospital.username} AND Email = ${hospital.email})
    `);
    return result;
}