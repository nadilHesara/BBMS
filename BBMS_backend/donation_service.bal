import ballerina/sql;

isolated function addDonation(Donates donates) returns json|error {
    // Generate a new Doantion Id

    DonationID|error m = dbClient->queryRow(`SELECT DonateID FROM donates ORDER BY DonateID DESC LIMIT 1`);
    string newDonationId;

    if m is DonationID {
        string? lastId = m.DonateID;
        if lastId is string {
            newDonationId = IdIncriment(lastId);
        } else {
            newDonationId = "M001";
        }
    } else {
        newDonationId = "M001";
    }

    // Create a new Donation record with the new Donation Id
    Donates newDonation = donates.clone();
    newDonation.donate_id = newDonationId;

    sql:ParameterizedQuery addDonation = `INSERT INTO donates(DonateID, DonerID, CampaignID, DonateTime, Pressure, Weight, Sugar, BloodQuantity)
        VALUES(
            ${newDonation.donate_id},
            ${newDonation.doner_id},
            ${newDonation.campaign_id},
            ${newDonation.donate_time},
            ${newDonation.pressure},
            ${newDonation.weight},
            ${newDonation.sugar},
            ${newDonation.blood_quantity}
        )`;

    sql:ParameterizedQuery updateDonorBloodGroup = `UPDATE doner 
        SET BloodGroup = ${newDonation.blood_group} 
        WHERE DonerID = ${newDonation.doner_id} 
        AND BloodGroup <> ${newDonation.blood_group}`;

    var updateResult = dbClient->execute(updateDonorBloodGroup);

    if updateResult is sql:Error {
        return updateResult;
    }

    sql:ExecutionResult|error result = dbClient->execute(addDonation);

    if result is error {
        return error("Donation Updating Failed!");
    }
    else {
        return {"message": "Donation added successfully!"};
    }

}

isolated function checkEligibility(string donor_id, string campaign_Id) returns json|error{

        record {| boolean eligible; string filled; |}|error result = dbClient->queryRow(`SELECT eligible, filled FROM eligibility e WHERE e.DonerID = ${donor_id}  AND e.CampaignID = ${campaign_Id}`);

        if result is error{
 
            json db_error = {
                "eligible":"Eligilbity Not Found"
            };

            return db_error;

        }

        
        json data = {
            "eligible": result.eligible,
            "filled": result.filled
        };

        return data;

    
}