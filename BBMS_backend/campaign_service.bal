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
    sql:ParameterizedQuery query = `Insert INTO campaign(CampaignID, District, DateofCampaign, OrganizerName, OrganizerTelephone, OrganizerEmail, AddressLine1, AddressLine2, AddressLine3, DonerCount, StartTime, EndTime , HospitalID)
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
                ${campaign.start_time},
                ${campaign.end_time},
                ${campaign.hospital_id}
            )`;

    sql:ExecutionResult|error result = dbClient->execute(query);

    if result is error {
        return error("Campaign Adding Failed!");
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
                    b.AB_minus
                FROM campaign AS c
                INNER JOIN bloodstocks AS b 
                    ON c.CampaignID = b.CampaignID
                where c.HospitalID = ${hospital_id}`;
    } else {
        string date  = month + "-01";
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
                    b.AB_minus
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
