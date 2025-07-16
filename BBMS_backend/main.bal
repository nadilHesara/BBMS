import ballerina/http;
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
    int tele;
    string address_line1;
    string? address_line2;
    string? address_line3;
    string District;
};

public type Login record {
    string user_name;
    string password;
    string? doner_id;
    string? hospital_id;
    string user_type;
};

public type Hospital record {
    string hospital_id;
    string name;
    string address;
    string District;
    int contact_no;
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

isolated function addDoner(Doner doner) returns int|error {

    sql:ExecutionResult result = check dbClient->execute(
                `INSERT INTO Doner(doner_id, name, gender, blood_group, nic_no, tele, address_line1, address_line2, address_line3, District)
        VALUES(
            ${doner.doner_id},
            ${doner.name}, 
            ${doner.gender}, 
            ${doner.blood_group}, 
            ${doner.nic_no},
            ${doner.tele}, 
            ${doner.address_line1}, 
            ${doner.address_line2}, 
            ${doner.address_line3}, 
            ${doner.District}
        ) 
        `);
    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
}

isolated function getDoner(string id) returns Doner|error {
    Doner doner = check dbClient->queryRow(
        `SELECT * FROM Doner WHERE doner_id = ${id}`
    );
    return doner;
}

isolated function getAllDoners() returns Doner[]|error {
    Doner[] doners = [];
    stream<Doner, error?> resultStream = dbClient->query(
        `SELECT * FROM Doner`
    );
    check from Doner doner in resultStream
        do {
            doners.push(doner);
        };
    check resultStream.close();
    return doners;
}

isolated function updateDoners(Doner doner) returns int|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE Doner SET
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
        WHERE employee_id = ${doner.doner_id}  
    `);

    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
}

// Assume your previous DB code is in a module `db`
// For this example, put your DB functions in the same file or import accordingly

service /doners on new http:Listener(8080) {

    // CORS preflight handler
    resource function options .() returns http:Response {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }

    // POST /doners
    resource function post .(http:Request req) returns http:Response|error {
        json payload = check req.getJsonPayload();
        Doner doner = check <Doner>payload;

        int id = check addDoner(doner);

        http:Response res = new;
        res.statusCode = 201;
        res.setPayload({message: "Doner added successfully"});
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res;
    }

}
