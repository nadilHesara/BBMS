import ballerina/io;
import ballerina/sql;

public isolated function addDoner(Doner doner) returns json|error {
    io:println(doner);
    // Generate new DonerID
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

    // Handle empty blood group
    if newDoner.blood_group is string && newDoner.blood_group == "" {
        newDoner.blood_group = ();
    }

    // Handle password
    string? password = newDoner.password;
    string defaultPassword;
    if password is () || password == "" {
        // Generate random default password
        defaultPassword = check generatePassword();
        newDoner.password = defaultPassword;

        // Send email to user
        string donerEmail = newDoner.email;
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
                "<p>Dear " + newDoner.name + ",</p>" +
                "<p>Your account password has been requested. Use the following password to log in:</p>" +
                "<div class='password-box'> " + defaultPassword + "</div>" +
                "<p>For security reasons, we recommend changing this password after your first login.</p>" +
                "<p>Thank you,<br>Support Team</p>" +
                "<div class='footer'>&copy; 2025 Your Company Name. All rights reserved.</div>" +
                "</div>" +
                "</body>" +
                "</html>";

        error? emailResult = sendEmail(donerEmail, "Welcome to BBMS - Your Account Details", htmlBody);
        if emailResult is error {
            io:println("Warning: Could not send welcome email. ", emailResult.message());
        }
    }

    // Encrypt password before storing
    password = newDoner.password;
    if !(password is string) {
        return error("Password does not exist");
    }
    string encryptedPassword = check hashPassword(password);

    // Insert donor details
    sql:ParameterizedQuery addDoner = `INSERT INTO Doner(DonerID, DonerName, Gender, BloodGroup, NICNo, Dob, Telephone, AddressLine1, AddressLine2, AddressLine3, District, Username, Email)
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
            ${newDoner.email}
        )`;

    // Insert login details
    sql:ParameterizedQuery addLoginDetails = `INSERT INTO login(UserName, Password, DonerID, UserType) 
            VALUES(
            ${newDoner.username},
            ${encryptedPassword},
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
        `select campaign.OrganizerName, campaign.DateofCampaign, campaign.District, campaign.CampaignName, hospital.Name from donates 
            inner join doner on donates.DonerID = doner.DonerID
            inner join campaign on donates.CampaignID = campaign.CampaignID
            left join hospital on campaign.HospitalID = hospital.HospitalID
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

public isolated function gateLastDonCount(string donor_id) returns int|error {
    int last_count;

    sql:ParameterizedQuery query = `SELECT COUNT(DISTINCT CampaignID) FROM donates WHERE DonerID = ${donor_id}`;
    int|error count = check dbClient->queryRow(query);

    if count is int {
        last_count = count;
        return last_count;
    }
    else {
        return error("No Previous Donations found");
    }
}
