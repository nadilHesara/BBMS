import ballerina/sql;

isolated function getBloodStockHospital(string hospitalID) returns bloodData|error {
    sql:ParameterizedQuery query = `SELECT
                                            SUM(A_plus) AS A_plus,
                                            SUM(B_plus) AS B_plus,
                                            SUM(O_plus) AS O_plus,
                                            SUM(AB_plus) AS AB_plus,
                                            SUM(A_minus) AS A_minus,
                                            SUM(B_minus) AS B_minus,
                                            SUM(O_minus) AS O_minus,
                                            SUM(AB_minus) AS AB_minus
                                                                    FROM bloodstocks WHERE HospitalID = ${hospitalID}`;

    bloodData|error result = dbClient->queryRow(query , bloodData);

    return result;
}