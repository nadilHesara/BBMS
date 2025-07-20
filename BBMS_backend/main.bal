import ballerina/http;
// import ballerina/io;
// import ballerina/io;
import ballerina/sql;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

public type Doner record {
    string doner_id;
    string name;
    string gender;
    string? blood_group;
    string nic_no;
    string dob;
    string tele;
    string address_line1;
    string address_line2;
    string? address_line3;
    string District;
};

type Login record {
    @sql:Column {name: "UserName"}
    string user_name;

    @sql:Column {name: "Password"}
    string password;

    @sql:Column {name: "DonerID"}
    string? doner_id;

    @sql:Column {name: "HospitalID"}
    string? hospital_id;

    @sql:Column {name: "UserType"}
    string user_type;
};

public type Hospital record {
    @sql:Column {name: "HospitalID"}
    string hospital_id;

    @sql:Column {name: "Name"}
    string name;

    @sql:Column {name: "Address"}
    string address;

    @sql:Column {name: "District"}
    string District;

    @sql:Column {name: "Contact"}
    string contact_no;
};

public type Donates record {
    int donate_id;
    string doner_id;
    int campain_id;
    time:Utc donate_time;
    string pressure;
    float weight;
    string sugar;
    int blood_quantity;
};

public type Campaign record {
    int campain_id;
    string district;
    time:Date date;
    string org_name;
    string org_tele;
    string org_email;
    string add_line1;
    string? add_line2;
    string? add_line3;
    int? doner_count;
    int? blood_quantity;
    time:Utc start_time;
    time:Utc end_time;
};

public type DonerID record {
    string? DonerID;
};

public type HospitalID record {
    string? HospitalID;
};

type LoginRequest record {
    string username;
    string password;
};

configurable string HOST = ?;
configurable int PORT = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;

final mysql:Client dbClient = check new (
    host = HOST,
    port = PORT,
    user = USER,
    password = PASSWORD,
    database = DATABASE
);

isolated function IdIncriment(string currentId) returns string {
    string prefix = currentId[0].toString(); // Get the first character as prefix
    string numericPart = currentId.substring(1); // Get the numeric part

    int numericValue = checkpanic int:fromString(numericPart);
    numericValue += 1;

    string newNumeric = padWithZeros(numericValue, 3);

    string nextId = prefix + newNumeric;
    return nextId;
}

// Pads an integer with leading zeros to make a fixed width string
isolated function padWithZeros(int number, int width) returns string {
    string numStr = number.toString();
    int numZeros = width - numStr.length();
    if (numZeros <= 0) {
        return numStr;
    }
    string zeros = "";
    foreach int i in 0 ..< numZeros {
        zeros += "0";
    }

    return zeros + numStr;
}

isolated function addDoner(Doner doner) returns sql:ExecutionResult|error {
    // Generate a new DonerID
    DonerID|error d =  dbClient->queryRow(`SELECT DonerID FROM Doner ORDER BY DonerID DESC LIMIT 1`);
    string newDonerId;
    if d is DonerID {
        string? lastId = d.DonerID;
        if lastId is string{
            newDonerId = IdIncriment(lastId);
        }else{
            newDonerId = "D001";
        }
    }else {
        newDonerId = "D001";
    }
    // Create a new Doner record with the new DonerID
    Doner newDoner = doner.clone();
    newDoner.doner_id = newDonerId;
    sql:ParameterizedQuery addDoner = `INSERT INTO Doner(DonerID, DonerName, Gender, BloodGroup, NICNo, Dob, Telephone, AddressLine1, AddressLine2, AddressLine3, District)
        VALUES(
            ${newDoner.doner_id},
            ${newDoner.name},
            ${newDoner.gender},
            ${newDoner.blood_group},
            ${newDoner.nic_no},
            ${newDoner.dob},
            ${newDoner.tele},
            ${newDoner.address_line1},
            ${newDoner.address_line2},
            ${newDoner.address_line3},
            ${newDoner.District}
        )`;

    sql:ParameterizedQuery addLoginDetails = `INSERT INTO login(UserName , Password , DonerID  , UserType) 
            VALUES(
            ${newDoner.nic_no},
            ${newDoner.tele},
            ${newDoner.doner_id},
            "Doner")`;

    sql:ExecutionResult|error result = dbClient->execute(addDoner);
    sql:ExecutionResult|error loginResult = dbClient->execute(addLoginDetails);

    return result;

}


isolated function addHospital(Hospital hospital) returns sql:ExecutionResult|error {
    // Generate a new HOSPITAL ID
    
    HospitalID|error h =  dbClient->queryRow(`SELECT HospitalID FROM Hospital ORDER BY HospitalID DESC LIMIT 1`);
    string newHospitalId;
    if h is HospitalID {
        string? lastId = h.HospitalID;
        if lastId is string{
            newHospitalId = IdIncriment(lastId);
        }else {
            newHospitalId = "H001";
        }
    } else {
        newHospitalId = "H001";
    }

    // Create a new Doner record with the new DonerID
    Hospital newHospital = hospital.clone();
    newHospital.hospital_id = newHospitalId;
    sql:ParameterizedQuery addHospital = `INSERT INTO Hospital(HospitalID, Name, Address, District, Contact)
        VALUES(
            ${newHospital.hospital_id},
            ${newHospital.name},
            ${newHospital.address},
            ${newHospital.District},
            ${newHospital.contact_no}
           
        )`;

    sql:ParameterizedQuery addLoginDetails = `INSERT INTO login(UserName , Password , HospitalID  , UserType) 
            VALUES(
            ${newHospital.hospital_id},
            ${newHospital.contact_no},
            ${newHospital.hospital_id},
            "Hospital")`;

    sql:ExecutionResult|error result = dbClient->execute(addHospital);
    sql:ExecutionResult|error loginResult = dbClient->execute(addLoginDetails);

    return result;
}
isolated function getDoner(string id) returns Doner|error {
    Doner
    doner = check dbClient->queryRow(`
        SELECT * FROM Doner WHERE doner_id = ${id}`
    );
    return doner;
}


isolated function getHospital(string id) returns Hospital|error {
    Hospital
    hospital = check dbClient->queryRow(`
        SELECT * FROM Hospital WHERE hospital_id = ${id}`
    );
    return hospital;
}


isolated function getAllDoners() returns Doner[]|error {
    Doner[] doners = [];
    stream<Doner, error?> resultStream = dbClient->query(
        ` SELECT * FROM Doner `
    );
    check from Doner doner in resultStream
        do {
            doners.push(doner);
        };
    check resultStream.close();
    return doners;
}


isolated function getAllHospitals() returns Hospital[]|error {
    Hospital[] hospitals = [];
    stream<Hospital, error?> resultStream = dbClient->query(
        ` SELECT * FROM Hospital `
    );
    check from Hospital hospital in resultStream
        do {
            hospitals.push(hospital);
        };
    check resultStream.close();
    return hospitals;
}


isolated function updateDoners(Doner doner) returns int|error {
    sql:ExecutionResult result = check dbClient->execute(`
UPDATE  Doner  SET
 doner_id = ${doner.doner_id},
                name = ${doner.name},
                gender = ${doner.gender},
                blood_group = ${doner.blood_group},
                nic_no = ${doner.nic_no},
                tele = ${doner.tele},
                address_line1 = ${doner.address_line1},
                address_line2 = ${doner.address_line2},
                address_line3 = ${doner.address_line3},
                District = ${doner.District}
            WHERE  doner_id = ${doner.doner_id}
    `);

    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
}


isolated function updateHospitals(Hospital hospital) returns int|error {
    sql:ExecutionResult result = check dbClient->execute(`
UPDATE  Hospital  SET
 hospital_id = ${hospital.hospital_id},
                name = ${hospital.name},
                address = ${hospital.address},
                District = ${hospital.District},
                contact = ${hospital.contact_no},
            WHERE  hospital_id = ${hospital.hospital_id}
    `);

    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
}


isolated function toBinaryString(string numStr) returns string|error {
    int originalNum = check int:fromString(numStr);

    if originalNum == 0 {
        return "0";
    }
    int mutableNum = originalNum;
    string binary = "";

    while mutableNum > 0 {
        binary = (mutableNum % 2).toString() + binary;
        mutableNum = mutableNum / 2;
    }

    return binary;
}

isolated function checkPassword(string username, string password) returns json|error {
    sql:ParameterizedQuery query = `SELECT * FROM login WHERE (UserName=${username});`;
    Login|error result = check dbClient->queryRow(query);
    if result is Login {
        if (result.user_name == username && result.password == password) {
            if result.doner_id is string {
                return {
                    "message": "Doner Login successful",
                    "doner_id": result.doner_id,
                    "user_type": result.user_type
                };
            }
            else {
                return {
                    "message": "Hospital Login successful",
                    "hospital_id": result.hospital_id,
                    "user_type": result.user_type
                };
            }
        } else {
            return error("Invalid username or password");
        }
    } else {
        return result;
    }
}

// Assume your previous DB code is in a module ` db `
// For this example, put your DB functions in the same file or import accordingly
listener http:Listener listener9191 = new (9191);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["POST", "GET", "OPTIONS"]
    }
}

service /donorReg on listener9191 {
    // POST /doners
    isolated resource function post .(@http:Payload Doner doner) returns json|error {
        sql:ExecutionResult|error result = check addDoner(doner);
        if result is sql:ExecutionResult {
            int|string? lastInsertId = result.lastInsertId;
            if lastInsertId is int {
                return {
                    "message": "Doner added successfully",
                    "doner_id": lastInsertId
                };
            } else {
                return {"message": "Donor added, but no ID returned"};
            }
        } else {
            return result;
        }
    }
}

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        allowHeaders: ["Content-Type"],
        allowCredentials: true
    }
}

service /hospitalReg on listener9191 {

    isolated resource function post .(@http:Payload Hospital hospital) returns json|error {
        sql:ExecutionResult|error result = check addHospital(hospital);
        if result is sql:ExecutionResult {
            int|string? lastInsertId = result.lastInsertId;
            if lastInsertId is int {
                return {
                    "message": "Hospital added successfully",
                    "hospital_id": lastInsertId
                };
            } else {
                return {"message": "Hospital added, but no ID returned"};
            }
        } else {
            return result;
        }

    }
}


@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["POST", "GET", "OPTIONS"]
    }
}
service /login on listener9191 {
    // POST /login
    isolated
    resource function post .(@http:Payload LoginRequest loginReq) returns json|error {
        json|error result = check checkPassword(loginReq.username, loginReq.password);
        return result;
    }
}

