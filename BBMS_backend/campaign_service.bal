import ballerina/sql;
import ballerina/io;

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
    io:println(campaigns);
    return campaigns;

};