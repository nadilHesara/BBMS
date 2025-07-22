import ballerina/http;
// import ballerina/io;
import ballerina/sql;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

public type Doner record {
    @sql:Column {name: "DonerID"}
    string doner_id;

    @sql:Column {name: "DonerName"}
    string name;

    @sql:Column {name: "Gender"}
    string gender;

    @sql:Column {name: "BloodGroup"}
    string? blood_group;

    @sql:Column {name: "NICNo"}
    string nic_no;

    @sql:Column {name: "DoB"}
    string dob;

    @sql:Column {name: "Telephone"}
    string tele;

    @sql:Column {name: "AddressLine1"}
    string address_line1;

    @sql:Column {name: "AddressLine2"}
    string address_line2;

    @sql:Column {name: "AddressLine3"}
    string? address_line3;

    @sql:Column {name: "District"}
    string District;

    @sql:Column {name: "Username"}
    string username;

    @sql:Column {name: "Password"}
    string password;

    @sql:Column {name: "Email"}
    string email;
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

    @sql:Column {name: "District"}
    string District;

    @sql:Column {name: "Contact"}
    string contact_no;

    @sql:Column {name: "AddressLine1"}
    string address_line1;

    @sql:Column {name: "AddressLine2"}
    string address_line2;

    @sql:Column {name: "AddressLine2"}
    string? address_line3;

    @sql:Column {name: "Username"}
    string username;

    @sql:Column {name: "Password"}
    string password;

    @sql:Column {name: "Email"}
    string email;

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

// #################################### functions ###############################################
isolated function IdIncriment(string currentId) returns string {
    string prefix = currentId[0].toString(); // Get the first character as prefix
    string numericPart = currentId.substring(1); // Get the numeric part

    int numericValue = checkpanic int:fromString(numericPart);
    numericValue += 1;

    string newNumeric = padWithZeros(numericValue, 3);

    string nextId = prefix + newNumeric;
    return nextId;

}

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

// ########################################### DB functios Doner  ###########################################
isolated function addDoner(Doner doner) returns sql:ExecutionResult|error {
    // Generate a new DonerID
    DonerID|error d = dbClient->queryRow(`SELECT DonerID FROM Doner ORDER BY DonerID DESC LIMIT 1`);
    string newDonerId;
    if d is DonerID {
        string? lastId = d.DonerID;
        if lastId is string {
            newDonerId = IdIncriment(lastId);
        } else {
            newDonerId = "D001";
        }
    } else {
        newDonerId = "D001";
    }
    // Create a new Doner record with the new DonerID
    Doner newDoner = doner.clone();
    newDoner.doner_id = newDonerId;
    if newDoner.blood_group is string && newDoner.blood_group == "" {
        newDoner.blood_group = ();
    }

    sql:ParameterizedQuery addDoner = `INSERT INTO Doner(DonerID, DonerName, Gender, BloodGroup, NICNo, Dob, Telephone, AddressLine1, AddressLine2, AddressLine3, District, Username, Password, Email)
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
            ${newDoner.District},
            ${newDoner.username},
            ${newDoner.password},
            ${newDoner.email}
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

isolated function getDoner(string id, string username, string email) returns Doner|error {
    Doner|error doner;
    if id is string {
        doner = check dbClient->queryRow(`
            SELECT * FROM Doner WHERE DonerID = ${id}`
        );
    } else if username is string {
        doner = check dbClient->queryRow(`
            SELECT * FROM Doner WHERE Username = ${username}`
        );
    } else if username is string {
        doner = check dbClient->queryRow(`
            SELECT * FROM Doner WHERE Email = ${email}`
        );
    }

    return doner;
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

isolated function updateDoners(Doner doner) returns sql:ExecutionResult|error {
    sql:ExecutionResult|error result = check dbClient->execute(`
        UPDATE  Doner  SET
            DonerName = ${doner.name},
            Gender = ${doner.gender},
            BloodGroup = ${doner.blood_group},
            NICNo = ${doner.nic_no},
            DoB =${doner.dob},
            Telephone = ${doner.tele},
            AddressLine1 = ${doner.address_line1},
            AddressLine2 = ${doner.address_line2},
            AddressLine3 = ${doner.address_line3},
            District = ${doner.District},
            Username = ${doner.username},
            Password = ${doner.password},
        WHERE  (DonerID = ${doner.doner_id} || Username = ${doner.username} || Email = ${doner.email})
    `);
    return result;
}

// ################################# DB Hopital Functions ######################################
isolated function addHospital(Hospital hospital) returns sql:ExecutionResult|error {
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
            ${newHospital.hospital_id},
            ${newHospital.contact_no},
            ${newHospital.hospital_id},
            "Hospital")`;

    sql:ExecutionResult|error result = dbClient->execute(addHospital);
    sql:ExecutionResult|error loginResult = dbClient->execute(addLoginDetails);

    return result;
}

isolated function getHospital(string id, string username, string email) returns Hospital|error {
    Hospital|error hospital;
    if id is string {
        hospital = check dbClient->queryRow(`
            SELECT * FROM Hospital WHERE DonerID = ${id}`
        );
    } else if username is string {
        hospital = check dbClient->queryRow(`
            SELECT * FROM Hospital WHERE Username = ${username}`
        );
    } else if username is string {
        hospital = check dbClient->queryRow(`
            SELECT * FROM Hospital WHERE Email = ${email}`
        );
    }

    return hospital;
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

isolated function updateHospitals(Hospital hospital) returns sql:ExecutionResult|error {
    sql:ExecutionResult|error result = check dbClient->execute(`
        UPDATE Hospital SET
            Name = ${doner.name},
            District = ${doner.gender},
            Conatct = ${doner.blood_group},
            AddressLine1 = ${doner.address_line1},
            AddressLine2 = ${doner.address_line2},
            AddressLine3 = ${doner.address_line3},
            Username = ${doner.username},
            Password = ${doner.password},
        WHERE  (HospitalID = ${doner.doner_id} || Username = ${doner.username} || Email = ${doner.email})
    `);
    return result;
}

// ################################# DB check password ###################################

isolated function checkPassword(string username, string password) returns json|error {
    sql:ParameterizedQuery query = `SELECT * FROM login WHERE (UserName=${username});`;
    Login|error result = check dbClient->queryRow(query);
    if result is Login {
        if (result.user_name == username && result.password == password) {
            if result.doner_id is string {
                return {
                    "message": "Doner Login successful",
                    "user_id": result.doner_id,
                    "user_type": result.user_type
                };
            }
            else {
                return {
                    "message": "Hospital Login successful",
                    "user_id": result.hospital_id,
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

// ############################################# Service functions ###############################################

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

