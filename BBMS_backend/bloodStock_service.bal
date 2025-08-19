import ballerina/sql;

isolated function getBloodStockHospital(string district, string hospitalID) returns bloodData|error {
    sql:ParameterizedQuery query;
    if district != "All" {
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
                        FROM bloodstocks 
                        INNER JOIN hospital ON bloodstocks.HospitalID = hospital.HospitalID
                            WHERE hospital.District = ${district}`;
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
                        INNER JOIN hospital ON bloodstocks.HospitalID = hospital.HospitalID
                            WHERE hospital.District = ${district} AND bloodstocks.HospitalID = ${hospitalID}`;
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
                FROM bloodstocks `;

    }

    bloodData|error result = dbClient->queryRow(query, bloodData);

    return result;
}

isolated function addBloodStock(BloodData bloodData) returns json|error {
    string bloodType = bloodData.bloodType;
    sql:ParameterizedQuery query;

    if bloodData.campaignId is () || bloodData.campaignId == "" {
        if bloodType == "A_plus" {
            query = `INSERT INTO bloodstocks( HospitalId , A_plus, note)
                     VALUES ( ${bloodData.hospitalId},${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "B_plus" {
            query = `INSERT INTO bloodstocks( HospitalId , B_plus, note)
                     VALUES (${bloodData.hospitalId}, ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "O_plus" {
            query = `INSERT INTO bloodstocks( HospitalId , O_plus, note)
                     VALUES (${bloodData.hospitalId}, ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "AB_plus" {
            query = `INSERT INTO bloodstocks( HospitalId , AB_plus, note)
                     VALUES (${bloodData.hospitalId}, ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "A_minus" {
            query = `INSERT INTO bloodstocks( HospitalId , A_minus, note)
                     VALUES (${bloodData.hospitalId}, ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "B_minus" {
            query = `INSERT INTO bloodstocks( HospitalId , B_minus, note)
                     VALUES (${bloodData.hospitalId}, ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "O_minus" {
            query = `INSERT INTO bloodstocks( HospitalId , O_minus, note)
                     VALUES (${bloodData.hospitalId}, ${bloodData.units}, ${bloodData.notes})`;
        } else if bloodType == "AB_minus" {
            query = `INSERT INTO bloodstocks( HospitalId , AB_minus, note)
                     VALUES (${bloodData.hospitalId}, ${bloodData.units}, ${bloodData.notes})`;
        } else {
            return error("Invalid blood type: " + bloodType);
        }
    } else {
        // Check if blood stock record exists for this campaign
        sql:ExecutionResult|error existingRecord = dbClient->queryRow(
            `SELECT StockId, CampaignID FROM bloodstocks WHERE CampaignID = ${bloodData.campaignId}`
        );

        if existingRecord is error {
            // No existing record, INSERT new one
            int aPlus = bloodType == "A_plus" ? bloodData.units : 0;
            int bPlus = bloodType == "B_plus" ? bloodData.units : 0;
            int oPlus = bloodType == "O_plus" ? bloodData.units : 0;
            int abPlus = bloodType == "AB_plus" ? bloodData.units : 0;
            int aMinus = bloodType == "A_minus" ? bloodData.units : 0;
            int bMinus = bloodType == "B_minus" ? bloodData.units : 0;
            int oMinus = bloodType == "O_minus" ? bloodData.units : 0;
            int abMinus = bloodType == "AB_minus" ? bloodData.units : 0;

            sql:ExecutionResult|error newRowResult = dbClient->execute(`INSERT INTO bloodstocks
                    (CampaignID, HospitalId, A_plus, B_plus, O_plus, AB_plus, A_minus, B_minus, O_minus, AB_minus)
                    VALUES (${bloodData.campaignId}, ${bloodData.hospitalId}, ${aPlus}, ${bPlus}, ${oPlus}, ${abPlus}, 
                            ${aMinus}, ${bMinus}, ${oMinus}, ${abMinus})`);

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

