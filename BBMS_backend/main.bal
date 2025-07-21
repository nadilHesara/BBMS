import ballerina/http;
import ballerina/io;
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
    string donate_id;
    string doner_id;
    int campain_id;
    time:Utc donate_time;
    string pressure;
    float weight;
    string sugar;
    int blood_quantity;
};

public type Campaign record {
    string campain_id;
    string district;
    string date;
    string org_name;
    string org_tele;
    string org_email;
    string add_line1;
    string? add_line2;
    string? add_line3;
    int? doner_count;
    int? blood_quantity;
    string start_time;
    string end_time;
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

public type DonerID record {
    string? DonerID;
};

isolated function IDIncrement(string currentId) returns string {
    string prefix = currentId[0].toString(); // Get the first character as prefix
    string numericPart = currentId.substring(1); // Get the numeric part

    int numericValue = checkpanic int:fromString(numericPart);
    numericValue += 1;

    string newNumeric = padWithZeros(numericValue, 3); // e.g., "002"

    string nextId = prefix + newNumeric;
    io:println("Next ID: " + nextId); // Output: D002
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
    DonerID d = check dbClient->queryRow(
    `SELECT DonerID FROM Doner ORDER BY DonerID DESC LIMIT 1`
    );

    string? lastId = d.DonerID;
    string newDonerId;

    if lastId is string {
        newDonerId = IDIncrement(lastId);
    }
    else {
        newDonerId = "D001";
    }

    Doner newDoner = doner.clone();
    newDoner.doner_id = newDonerId;
    sql:ParameterizedQuery insertQuery = `INSERT INTO Doner(DonerID, DonerName, Gender, BloodGroup, NICNo, Dob, Telephone, AddressLine1, AddressLine2, AddressLine3, District)
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
    sql:ExecutionResult|error result = dbClient->execute(insertQuery);

    return result;

}

isolated function getDoner(string id) returns Doner|error {
    Doner
    doner = check dbClient->queryRow(
    `        SELECT * FROM        Doner WHERE        doner_id = ${id}        `
    );
    return doner;
}

isolated function getAllDoners() returns Doner[]|error {
    Doner[] doners = [];
    stream<Doner, error?> resultStream = dbClient->query(
        `        SELECT * FROM        Doner        `
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
        UPDATE Doner        SET
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
        WHERE doner_id = ${doner.doner_id}
        `);

    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
}

isolated function addCamp(Campaign campaign) returns sql:ExecutionResult|error {
    string? lastID = check dbClient->queryRow(`SELECT CampaignID FROM campaign ORDER BY CampaignID DESC LIMIT 1`);
    string newID;

    if lastID is string{
        newID = IDIncrement(lastID);
    }else{
        newID = "C001";
    }

    campaign.campain_id = newID;
    sql:ParameterizedQuery query = `Insert INTO campaign(CampaignID, District, DateofCampaign, OrganizerName, OrganizerTelephone, OrganizerEmail, AddressLine1, AddressLine2, AddressLine3, DonerCount, BloodQuantity, StartTime, EndTime)
            VALUES (
                ${campaign.campain_id},
                ${campaign.district},
                ${campaign.date},
                ${campaign.org_name},
                ${campaign.org_tele},
                ${campaign.org_email},
                ${campaign.add_line1},
                ${campaign.add_line2},
                ${campaign.add_line3},
                ${campaign.doner_count},
                ${campaign.blood_quantity},
                ${campaign.start_time},
                ${campaign.end_time}
            )`;
    sql:ExecutionResult|error result = dbClient->execute(query);

    return result;
}

// Assume your previous DB code is in a module `        db        `
// For this example, put your DB functions in the same file or import accordingly

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["GET","POST", "OPTIONS"],
        allowHeaders: ["Content-type"]
    }
}

service / on new http:Listener(9191) {

    // CORS preflight handler
    // resource function options .() returns http:Response {
    //     http:Response res = new;
    //     res.setHeader("Access-Control-Allow-Origin", "*");
    //     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
    //     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //     return res;
    // }

    // POST /doners
    isolated resource function post donorReg(@http:Payload Doner doner) returns json|error {
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

    isolated resource function post campReg(@http:Payload Campaign campaign) returns json|error {
        sql:ExecutionResult|error result = check addCamp(campaign);
        if result is sql:ExecutionResult {
            int|string? lastInsertId = result.lastInsertId;
            if lastInsertId is int {
                return {
                    "message": "Campaign added successfully",
                    "campaign_id": lastInsertId
                };
            } else {
                return {"message": "Campaign added, but no ID returned"};
            }
        } else {
            return result;
        }
    }

    isolated resource function get campReg() returns json|error {
        return{
            "message":"This is the GET method"
        };
    }



}
