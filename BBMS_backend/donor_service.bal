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

    io:println(newDoner , doner);
    string? password = newDoner.password;
    string defaultPassword ;
    if password is () || password == "" {
        defaultPassword = check generatePassword();
        
        string donerEmail = newDoner.email;
        string htmlBody = "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "<style>" +
            "  body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }" +
            "  .container { max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }" +
            "  .header { color: #d32f2f; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; }" +
            "  .content { font-size: 16px; color: #333; margin-bottom: 20px; line-height: 1.5; }" +
            "  .password { font-weight: bold; color: #d32f2f; }" +
            "  .footer { font-size: 14px; color: #777; text-align: center; margin-top: 30px; }" +
            "  .btn { display: inline-block; padding: 10px 20px; background-color: #d32f2f;  text-decoration: none; border-radius: 6px; color: #ffffffff; }" +
            "</style>" +
            "</head>" +
            "<body>" +
            "  <div class='container'>" +
            "    <div class='header'>Welcome to BBMS</div>" +
            "    <div class='content'>" +
            "      Hello " + newDoner.name + ",<br/><br/>" +
            "      Your account has been created successfully. Your login password is: " +
            "      <span class='password'>"+ defaultPassword + "</span><br/><br/>" +
            "      Please login and change your password immediately for security reasons." +
            "    </div>" +
            "    <div style='text-align: center;'>" +
            "      <a class='btn' href='https://your-bbms-app.com/login'>Login Now</a>" +
            "    </div>" +
            "    <div class='footer'>This is an auto-generated email. Please do not reply.</div>" +
            "  </div>" +
            "</body>" +
            "</html>";
        
        error? emailResult = sendEmail(donerEmail, "Welcome to BBMS - Your Account Details", htmlBody);
        if emailResult is error {
            io:println("Warning: Could not send welcome email. ", emailResult.message());
        }
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

    if result is error {
        return error("Failed to add donor: " + result.message());
    } else if loginResult is error {
        return error("Failed to add login details: " + loginResult.message());
    } else {
        return {"message": "Donor added successfully!"};
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