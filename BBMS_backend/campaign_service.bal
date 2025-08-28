import ballerina/sql;

isolated function addCamp(Campaign campaign) returns json|error {

    CampaignID|error c = dbClient->queryRow(`SELECT CampaignID FROM campaign ORDER BY CampaignID DESC LIMIT 1`);
    string newID;

    if c is CampaignID {
        string? lastID = c.CampaignID;
        if lastID is string {
            newID = IdIncriment(lastID);
        } else {
            newID = "C001";
        }
    } else {
        newID = "C001";
    }

    campaign.campain_id = newID;
    sql:ParameterizedQuery query = `Insert INTO campaign(CampaignID, CampaignName, District, DateofCampaign, OrganizerName, OrganizerTelephone, OrganizerEmail, AddressLine1, AddressLine2, AddressLine3, DonerCount, StartTime, EndTime , HospitalID, location)
            VALUES (
                ${campaign.campain_id},
                ${campaign.CampaignName},
                ${campaign.district},
                ${campaign.date},
                ${campaign.org_name},
                ${campaign.org_tele},
                ${campaign.org_email},
                ${campaign.add_line1},
                ${campaign.add_line2},
                ${campaign.add_line3},
                ${campaign.doner_count},
                ${campaign.start_time},
                ${campaign.end_time},
                ${campaign.hospital_id},
                ${campaign.location}
            )`;
    string campaignEmailBody = "<html>" +
    "<body style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin:0; padding:0;\">" +
    "<table align=\"center\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color: #ffffff; margin-top: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);\">" +
    "<tr><td style=\"background-color: #1976D2; color: #ffffff; padding: 20px; text-align: center;\">" +
    "<h1 style=\"margin: 0; font-size: 24px;\">Campaign Registration Confirmed</h1></td></tr>" +
    "<tr><td style=\"padding: 20px; color: #333;\">" +
    "<p>Hi <strong>" + campaign.org_name + "</strong>,</p>" +
    "<p>Your campaign has been successfully registered. Here are the details:</p>" +
    "<table width=\"100%\" cellpadding=\"5\" cellspacing=\"0\" style=\"border-collapse: collapse; margin-top: 10px;\">" +
    "<tr style=\"background-color: #e3f2fd;\"><td style=\"font-weight: bold;\">Campaign Name:</td><td>" + campaign.CampaignName + "</td></tr>" +
    "<tr><td style=\"font-weight: bold;\">Date:</td><td>" + (campaign.date ?: "-") + "</td></tr>" +
    "<tr style=\"background-color: #e3f2fd;\"><td style=\"font-weight: bold;\">Time:</td><td>" + (campaign.start_time ?: "-") + " to " + (campaign.end_time ?: "-") + "</td></tr>" +
    "<tr><td style=\"font-weight: bold;\">Address:</td><td>" + campaign.add_line1 + "<br/>" + (campaign.add_line2 ?: "") + "<br/>" + (campaign.add_line3 ?: "") + "</td></tr>" +
    "<tr style=\"background-color: #e3f2fd;\"><td style=\"font-weight: bold;\">Organizer Email:</td><td>" + campaign.org_email + "</td></tr>" +
    "<tr><td style=\"font-weight: bold;\">Organizer Telephone:</td><td>" + campaign.org_tele + "</td></tr>" +
    "</table>" +
    "<p style=\"margin-top: 20px;\">Thank you for organizing this campaign. We wish you a successful event!</p>" +
    "<p>Best regards,<br/>The MedSync Team</p>" +
    "</td></tr>" +
    "<tr><td style=\"background-color: #f4f6f8; color: #999; padding: 10px; font-size: 12px; text-align: center;\">" +
    "&copy; 2025 BBMS. All rights reserved.</td></tr>" +
    "</table>" +
    "</body></html>";

    error? email=  sendEmail(campaign.org_email , "Register Your Campaign" ,campaignEmailBody);

    if email is error{
        return email;
    }

    sql:ExecutionResult|error result = dbClient->execute(query);

    if result is error {
        return result;
    } else {
        return {"message": "Campaign adedd sucsessfully!"};
    }
}

isolated function getCampaignEvent(string year_month, string district) returns Campaign[]|error {
    Campaign[] campaigns = [];
    string[] parts = re `-`.split(year_month);
    if parts.length() > 3 {
        return error("Invalid month format");
    }
    string d = district;
    int year = check int:fromString(parts[0]);
    int mon = check int:fromString(parts[1]);
    stream<Campaign, error?> resultStream = dbClient->query(
        `SELECT * FROM campaign where year(DateofCampaign) = ${year} and month(DateofCampaign) = ${mon} and District = ${d}`
    );
    check from Campaign campaign in resultStream
        do {
            campaigns.push(campaign);
        };
    check resultStream.close();
    return campaigns;

};

isolated function getCampaignHistory(string hospital_id, string? month = ()) returns CampaignDetails[]|error {
    CampaignDetails[] campaigns = [];

    sql:ParameterizedQuery query;
    string curruntDate = getCurrentDate();
    if month is () {
        query = `SELECT 
                    c.CampaignID, 
                    c.District, 
                    c.DateofCampaign, 
                    c.OrganizerName, 
                    c.OrganizerTelephone, 
                    c.OrganizerEmail, 
                    c.DonerCount, 
                    b.A_plus, 
                    b.B_plus, 
                    b.O_plus, 
                    b.AB_plus, 
                    b.A_minus, 
                    b.B_minus, 
                    b.O_minus, 
                    b.AB_minus,
                    c.completed
                FROM campaign AS c
                INNER JOIN bloodstocks AS b 
                    ON c.CampaignID = b.CampaignID
                where c.HospitalID = ${hospital_id} AND c.DateofCampaign <= ${curruntDate} `;
    } else {
        string date = month + "-01";
        query = `SELECT 
                    c.CampaignID, 
                    c.District, 
                    c.DateofCampaign, 
                    c.OrganizerName, 
                    c.OrganizerTelephone, 
                    c.OrganizerEmail, 
                    c.DonerCount, 
                    b.A_plus, 
                    b.B_plus, 
                    b.O_plus, 
                    b.AB_plus, 
                    b.A_minus, 
                    b.B_minus, 
                    b.O_minus, 
                    b.AB_minus,
                    c.completed
                FROM campaign AS c
                INNER JOIN bloodstocks AS b 
                    ON c.CampaignID = b.CampaignID
                where c.HospitalID = ${hospital_id} and c.DateofCampaign >= ${date}`;
    }
    stream<CampaignDetails, error?> resultStream = dbClient->query(query);
    check from CampaignDetails campaign in resultStream
        do {
            campaigns.push(campaign);
        };
    check resultStream.close();
    return campaigns;
}

isolated function getCampaignHospital(string hospitalID) returns CampaignIdName[]|error {
    CampaignIdName[] campaigns = [];
    string curruntDate = getCurrentDate();
    sql:ParameterizedQuery query = `SELECT CampaignID, CampaignName FROM campaign WHERE HospitalID = ${hospitalID} AND DateofCampaign <= ${curruntDate} AND completed = "1" ORDER BY DateofCampaign DESC`;

    stream<CampaignIdName, error?> resultStream = dbClient->query(query);

    check from CampaignIdName campaign in resultStream
        do {
            campaigns.push(campaign);
        };
    check resultStream.close();
    CampaignIdName|error camp = getCamp(hospitalID);
    if camp is CampaignIdName {
        campaigns.push(camp);
    }
    return campaigns;
}

isolated function getCamp(string hospitalId) returns CampaignIdName|error {
    sql:ParameterizedQuery query = `
        SELECT c.CampaignID, c.CampaignName
        FROM campaign c
        INNER JOIN hospital h ON c.CampaignName = h.Name
        WHERE c.HospitalID = ${hospitalId};
    `;

    CampaignIdName|error campaignId = dbClient->queryRow(query, CampaignIdName);
    return campaignId;
}

isolated function updateCamp(CampaignDetails campaign) returns sql:ExecutionResult|error {
    sql:ParameterizedQuery query = `UPDATE campaign set completed = ${campaign.completed} WHERE CampaignID = ${campaign.CampaignID} ;`;

    sql:ExecutionResult|error result = dbClient->execute(query);

    return result;
}
