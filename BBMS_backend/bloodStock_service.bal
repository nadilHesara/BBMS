import ballerina/sql;
import ballerina/io;

isolated function getBloodStockHospital(string district, string hospitalID) returns bloodData|error {
    sql:ParameterizedQuery query;
    io:println(hospitalID);

    if district == "All" {
        if hospitalID == "All" {
            query = `SELECT
                    SUM(A_plus) AS A_plus,
                    SUM(B_plus) AS B_plus,
                    SUM(O_plus) AS O_plus,
                    SUM(AB_plus) AS AB_plus,
                    SUM(A_minus) AS A_minus,
                    SUM(B_minus) AS B_minus,
                    SUM(O_minus) AS O_minus,
                    SUM(AB_minus) AS AB_minus
                        FROM bloodstocks `;
        } else {

            query = `SELECT
                    SUM(A_plus) AS A_plus,
                    SUM(B_plus) AS B_plus,
                    SUM(O_plus) AS O_plus,
                    SUM(AB_plus) AS AB_plus,
                    SUM(A_minus) AS A_minus,
                    SUM(B_minus) AS B_minus,
                    SUM(O_minus) AS O_minus,
                    SUM(AB_minus) AS AB_minus
                        FROM bloodstocks  
                        JOIN campaign ON bloodstocks.CampaignID = campaign.CampaignID
                            WHERE campaign.HospitalID = ${hospitalID}`;
        }
    } else {
        query = `SELECT
                    SUM(A_plus) AS A_plus,
                    SUM(B_plus) AS B_plus,
                    SUM(O_plus) AS O_plus,
                    SUM(AB_plus) AS AB_plus,
                    SUM(A_minus) AS A_minus,
                    SUM(B_minus) AS B_minus,
                    SUM(O_minus) AS O_minus,
                    SUM(AB_minus) AS AB_minus
                        FROM bloodstocks 
                        JOIN campaign ON bloodstocks.CampaignID = campaign.CampaignID
                            WHERE campaign.District = ${district}`;
    }

    bloodData|error result = dbClient->queryRow(query, bloodData);

    return result;
}

isolated function addBloodStock(BloodData bloodData) returns json|error {
    io:println("Adding blood stock: ", bloodData);
    string bloodType = bloodData.bloodType;
    sql:ParameterizedQuery query;

    if bloodData.campaignId is () || bloodData.campaignId == "" {
        if bloodType == "A_plus" {
            query = `INSERT INTO bloodstocks( A_plus, note)
                     VALUES ( ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "B_plus" {
            query = `INSERT INTO bloodstocks( B_plus, note)
                     VALUES ( ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "O_plus" {
            query = `INSERT INTO bloodstocks( O_plus, note)
                     VALUES ( ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "AB_plus" {
            query = `INSERT INTO bloodstocks( AB_plus, note)
                     VALUES ( ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "A_minus" {
            query = `INSERT INTO bloodstocks( A_minus, note)
                     VALUES ( ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "B_minus" {
            query = `INSERT INTO bloodstocks( B_minus, note)
                     VALUES ( ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "O_minus" {
            query = `INSERT INTO bloodstocks( O_minus, note)
                     VALUES ( ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "AB_minus" {
            query = `INSERT INTO bloodstocks( AB_minus, note)
                     VALUES ( ${bloodData.units}, ${bloodData.notes})`;
        } else {
            return error("Invalid blood type: " + bloodType);
        }
    }else {
        // Check if blood stock record exists for this campaign
        sql:ExecutionResult|error existingRecord = dbClient->queryRow(
            `SELECT StockId, CampaignID FROM bloodstocks WHERE CampaignID = ${bloodData.campaignId}`
        );


        if existingRecord is error {
            // No existing record, INSERT new one
            sql:ExecutionResult|error newRowResult = dbClient->execute(`INSERT INTO bloodstocks CampaignID , A_plus, B_plus, O_plus, AB_plus, A_minus, B_minus, O_minus, AB_minus
                VALUES (${bloodData.campaignId}, 
                        ${bloodType == "A_plus" ? bloodData.units : null}, 
                        ${bloodType == "B_plus" ? bloodData.units : null}, 
                        ${bloodType == "O_plus" ? bloodData.units : null}, 
                        ${bloodType == "AB_plus" ? bloodData.units : null}, 
                        ${bloodType == "A_minus" ? bloodData.units : null}, 
                        ${bloodType == "B_minus" ? bloodData.units : null}, 
                        ${bloodType == "O_minus" ? bloodData.units : null}, 
                        ${bloodType == "AB_minus" ? bloodData.units : null})`);

            // Check if the insert was successful
            if newRowResult is error {
                return error("Failed to add new blood stock: " + newRowResult.message());
            }
            
        } 
        
        //UPDATE it by adding new units to existing units
        if bloodType == "A_plus" {
            query = `UPDATE bloodstocks SET A_plus = COALESCE(A_plus, 0) + ${bloodData.units}, note = ${bloodData.notes}
                        WHERE CampaignID = ${bloodData.campaignId}`;
        } else if bloodType == "B_plus" {
            query = `UPDATE bloodstocks SET B_plus = COALESCE(B_plus, 0) + ${bloodData.units}, note = ${bloodData.notes}
                        WHERE CampaignID = ${bloodData.campaignId}`;
        } else if bloodType == "O_plus" {
            query = `UPDATE bloodstocks SET O_plus = COALESCE(O_plus, 0) + ${bloodData.units}, note = ${bloodData.notes}
                        WHERE CampaignID = ${bloodData.campaignId}`;
        } else if bloodType == "AB_plus" {
            query = `UPDATE bloodstocks SET AB_plus = COALESCE(AB_plus, 0) + ${bloodData.units}, note = ${bloodData.notes}
                        WHERE CampaignID = ${bloodData.campaignId}`;
        } else if bloodType == "A_minus" {
            query = `UPDATE bloodstocks SET A_minus = COALESCE(A_minus, 0) + ${bloodData.units}, note = ${bloodData.notes}
                        WHERE CampaignID = ${bloodData.campaignId}`;
        } else if bloodType == "B_minus" {
            query = `UPDATE bloodstocks SET B_minus = COALESCE(B_minus, 0) + ${bloodData.units}, note = ${bloodData.notes}
                        WHERE CampaignID = ${bloodData.campaignId}`;
        } else if bloodType == "O_minus" {
            query = `UPDATE bloodstocks SET O_minus = COALESCE(O_minus, 0) + ${bloodData.units}, note = ${bloodData.notes}
                        WHERE CampaignID = ${bloodData.campaignId}`;
        } else if bloodType == "AB_minus" {
            query = `UPDATE bloodstocks SET AB_minus = COALESCE(AB_minus, 0) + ${bloodData.units}, note = ${bloodData.notes}
                        WHERE CampaignID = ${bloodData.campaignId}`;
        } else {
            return error("Invalid blood type: " + bloodType);
        }
    
    }
    sql:ExecutionResult|error result = dbClient->execute(query);
    if result is error {
        return result;
    }
    
    return {"status": "success", "message": "Blood stock added successfully"};
   
}