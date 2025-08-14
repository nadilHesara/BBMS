import ballerina/sql;
import ballerina/io;

public isolated function addDoner(Doner doner) returns json|error {


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

    Doner newDoner = doner.clone();
    newDoner.doner_id = newDonerId;
    if newDoner.blood_group is string && newDoner.blood_group == "" {
        newDoner.blood_group = ();
    }

    string defaultPassword;
    if doner.password is () || doner.password == "" {
        defaultPassword = check generatePassword(12);
        _ = check sendEmail(doner.email, defaultPassword,doner.username);
        newDoner.password = defaultPassword;
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
            ${newDoner.username},
            ${newDoner.password},
            ${newDoner.doner_id},
            "Doner")`;

    sql:ExecutionResult|error result = dbClient->execute(addDoner);
    sql:ExecutionResult|error loginResult = dbClient->execute(addLoginDetails);

    if result is error && loginResult is error {
        return error("Doner already exist!");
    }
    else if result is error && loginResult is sql:ExecutionResult {
        return error("Please enter valid data");
    } else {
        return {"message": "Doner adedd sucsessfully!"};
    }
}

public isolated function getDoner(string? id = (), string? username = (), string? email = ()) returns Doner|error {
    Doner|error doner;
    if id is string {
        doner = check dbClient->queryRow(`
            SELECT * FROM Doner WHERE DonerID = ${id}`
        );
    } else if username is string {
        doner = check dbClient->queryRow(`
            SELECT * FROM Doner WHERE Username = ${username}`
        );
    } else if email is string {
        doner = check dbClient->queryRow(`
            SELECT * FROM Doner WHERE Email = ${email}`
        );
    }
    else {
        doner = error("Doner does't exist");
    }

    return doner;
}

public isolated function getAllDoners() returns Doner[]|error {
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

public isolated function updateDoner(Doner doner) returns sql:ExecutionResult|error {
    sql:ExecutionResult result;
    
    if (doner.password is string) {
        result = check dbClient->execute(`
            UPDATE Doner SET 
                Username = ${doner.username}, 
                DonerName = ${doner.name}, 
                Email = ${doner.email}, 
                Gender = ${doner.gender}, 
                BloodGroup = ${doner.blood_group}, 
                NICNo = ${doner.nic_no}, 
                DoB = ${doner.dob}, 
                Telephone = ${doner.tele}, 
                AddressLine1 = ${doner.address_line1}, 
                AddressLine2 = ${doner.address_line2}, 
                AddressLine3 = ${doner.address_line3}, 
                District = ${doner.District},
                Password = ${doner.password}
            WHERE DonerID = ${doner.doner_id}
        `);
    } else {
        result = check dbClient->execute(`
            UPDATE Doner SET 
                Username = ${doner.username}, 
                DonerName = ${doner.name}, 
                Email = ${doner.email}, 
                Gender = ${doner.gender}, 
                BloodGroup = ${doner.blood_group}, 
                NICNo = ${doner.nic_no}, 
                DoB = ${doner.dob}, 
                Telephone = ${doner.tele}, 
                AddressLine1 = ${doner.address_line1}, 
                AddressLine2 = ${doner.address_line2}, 
                AddressLine3 = ${doner.address_line3}, 
                District = ${doner.District}
            WHERE DonerID = ${doner.doner_id}
        `);
    }
    return result;
}


public isolated function get_DonationHistory(string userID) returns DonateRecord[]|error {
    DonateRecord[] donations = [];

    stream<DonateRecord, error?> resultStream = dbClient->query(
        `select campaign.OrganizerName, campaign.DateofCampaign, campaign.District from donates 
            join doner on donates.DonerID = doner.DonerID
            join campaign on donates.CampaignID = campaign.CampaignID
            where donates.donerID = ${userID}`
    );
    check from DonateRecord donation in resultStream
        do {
            donations.push(donation);
            
        };
    check resultStream.close();
    io:println(donations);
    return donations;
}

public isolated function getLastDonation(string donor_id) returns string|error {
    string LastDonation = "";
    sql:ParameterizedQuery query1 = `SELECT CampaignID FROM donates WHERE DonerID = ${donor_id} ORDER BY DonateID DESC LIMIT 1`;
    Campaign|error Camp = check dbClient->queryRow(query1);

    if Camp is Campaign {  
        sql:ParameterizedQuery query2 = `SELECT DateofCampaign FROM campaign WHERE CampaignID = ${Camp.campain_id}`;
        LastDonation = check dbClient->queryRow(query2);
        
    } else {
        return error("No Previous Donations found");
    }
    return LastDonation;
}