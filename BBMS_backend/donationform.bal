import ballerina/sql;

isolated function determine_eligibility(Eligible eligible) returns json|error {

    SubmissionID|error s = dbClient->queryRow(`SELECT submitID FROM eligibility ORDER BY submitID DESC LIMIT 1`);
    string newSubmissionID;

    if s is SubmissionID {
        string? lastId = s.submitID;
        if lastId is string {
            newSubmissionID = IdIncriment(lastId);
        } else {
            newSubmissionID = "S001";
        }
    } else {
        newSubmissionID = "S001";
    }

    // Create a new eleigibility record with the new Submission Id
    Eligible newSubmission = eligible.clone();
    newSubmission.submitID = newSubmissionID;

    sql:ParameterizedQuery addSubmission = `INSERT INTO eligibility(submitID, foreignTravel, risk, DonerID, eligible, CampaignID)
        VALUES(
            ${newSubmission.submitID},
            ${newSubmission.foreignTravel},
            ${newSubmission.risk},
            ${newSubmission.DonerID},
            ${newSubmission.eligible},
            ${newSubmission.CampaignID}        
        )`;

    sql:ExecutionResult|error result = dbClient->execute(addSubmission);

    if result is error {
        error e = <error>result;
        readonly ecVal = e.detail()["errorCode"];

        if ecVal is int && ecVal == 1062 {

            Eligible|error check_result = dbClient->queryRow(`SELECT * FROM eligibility WHERE DonerID=${newSubmission.DonerID} AND CampaignID=${newSubmission.CampaignID}`);

            if check_result is Eligible {
                return {"message": "Duplicate entry found", "SubmitID": check_result.submitID, "Eligible":check_result.eligible};
            }
            
        }
        
        return error("Eligibility Updating Failed!");
    }

    else {
        return {"message": "Eligibility Updated!", "SubmitID": newSubmission.submitID};
    }

}

isolated function update_eligibility(Eligible eligible) returns json|error {

    boolean dropped = false;

    if ((eligible?.previous_eligibility ?: false) && !(eligible.eligible)){

        sql:ExecutionResult|error dorpping = dbClient->execute(`DELETE FROM eligibility WHERE submitID=${eligible.submitID}`);

        if dorpping is error{
            return error("Deleting Error");
        }

        dropped = true;
    }

    if(dropped){

        sql:ExecutionResult|error reAddition = dbClient->execute(`INSERT INTO eligibility(submitID, foreignTravel, risk, DonerID, eligible, CampaignID)
            VALUES(
                ${eligible.submitID},
                ${eligible.foreignTravel},
                ${eligible.risk},
                ${eligible.DonerID},
                ${eligible.eligible},
                ${eligible.CampaignID}        
            )`);

            if reAddition is error{
                return error("Eligibility Updating Failed!");
            }

            return {"message": "Eligibility Updated!","Dropped":dropped};

    }
    
    sql:ExecutionResult|error UpdateDup = dbClient->execute(`UPDATE eligibility SET foreignTravel=${eligible.foreignTravel},risk=${eligible.risk}, eligible=${eligible.eligible} WHERE submitID=${eligible.submitID}`);

    if UpdateDup is error {
        return error("Eligibility Updating Failed!");
    }

    return {"message": "Eligibility Updated!","Dropped":dropped, "SubmitID":eligible.submitID};

}

isolated function addHistory(DonHistory donHistory) returns json|error {

    DonHistory newHistory = donHistory.clone();

    sql:ParameterizedQuery addHistory = `INSERT INTO donationhistory (submitID, hadIssuesBefore, issueDetails, advisedNotToDonate, readInfoLeaflet, medicalConditions)
        VALUES(
            ${newHistory.submitID},
            ${newHistory.hadIssuesBefore},
            ${newHistory.issueDetails},
            ${newHistory.advisedNotToDonate},
            ${newHistory.readInfoLeaflet},
            ${newHistory.medicalConditions} 

        ) 
        ON DUPLICATE KEY UPDATE hadIssuesBefore=${newHistory.hadIssuesBefore}, issueDetails=${newHistory.issueDetails}, advisedNotToDonate=${newHistory.advisedNotToDonate}, readInfoLeaflet=${newHistory.readInfoLeaflet}, medicalConditions=${newHistory.medicalConditions}`;

    sql:ExecutionResult|error result = dbClient->execute(addHistory);

    if result is error {
        return error("History updating failed");
    }
    else {
        return {"message": "Donation History successfully updated"};
    }

}

isolated function addmedicalRisk(MedRisks medRisks) returns json|error {

    MedRisks newmedRisk = medRisks.clone();

    sql:ParameterizedQuery addRisk = `INSERT INTO medicalrisk (submitID, jaundice, tbTyphoid, vaccinations, tattoos, imprisoned, foreignTravel, bloodTransfusion, malaria, dengue, recentIllness, dentalWork, recentMeds, riskyCategoriesAwareness, riskSymptoms)
        VALUES(
            ${newmedRisk.submitID},
            ${newmedRisk.jaundice},
            ${newmedRisk.tbTyphoid},
            ${newmedRisk.vaccinations},
            ${newmedRisk.tattoos},
            ${newmedRisk.imprisoned},
            ${newmedRisk.foreignTravel},
            ${newmedRisk.bloodTransfusion},
            ${newmedRisk.malaria},
            ${newmedRisk.dengue},
            ${newmedRisk.recentIllness},
            ${newmedRisk.dentalWork},
            ${newmedRisk.recentMeds},
            ${newmedRisk.riskyCategoriesAwareness},
            ${newmedRisk.riskSymptoms} 

        )
        
        ON DUPLICATE KEY UPDATE 
        jaundice = ${newmedRisk.jaundice}, 
        tbTyphoid = ${newmedRisk.tbTyphoid}, 
        vaccinations = ${newmedRisk.vaccinations}, 
        tattoos = ${newmedRisk.tattoos}, 
        imprisoned = ${newmedRisk.imprisoned}, 
        foreignTravel = ${newmedRisk.foreignTravel}, 
        bloodTransfusion = ${newmedRisk.bloodTransfusion}, 
        malaria = ${newmedRisk.malaria}, 
        dengue = ${newmedRisk.dengue}, 
        recentIllness = ${newmedRisk.recentIllness}, 
        dentalWork = ${newmedRisk.dentalWork}, 
        recentMeds = ${newmedRisk.recentMeds}, 
        riskyCategoriesAwareness = ${newmedRisk.riskyCategoriesAwareness}, 
        riskSymptoms = ${newmedRisk.riskSymptoms}`;

    sql:ExecutionResult|error result = dbClient->execute(addRisk);

    if result is error {
        return error("Medical Risk updating failed");
    }
    else {
        return {"message": "Medical Risk successfully updated"};
    }
}

isolated function addConsent(Consent consent) returns json|error {

    Consent newConsent = consent.clone();

    sql:ParameterizedQuery addConsent = `INSERT INTO consent (submitID, testConsent, instructionConsent, notifyConsent, frequency, DonerID) 
        VALUES(
            ${newConsent.submitID},
            ${newConsent.testConsent},
            ${newConsent.instructionConsent},
            ${newConsent.notifyConsent},
            ${newConsent.frequency},
            ${newConsent.DonerID}

        )

        ON DUPLICATE KEY UPDATE 

            testConsent = ${newConsent.testConsent},
            instructionConsent = ${newConsent.instructionConsent},
            notifyConsent = ${newConsent.notifyConsent},
            frequency = ${newConsent.frequency},
            DonerID = ${newConsent.DonerID}`;

    sql:ExecutionResult|error result = dbClient->execute(addConsent);

    if result is error {
        return error("Consent updating failed");
    }
    else {
        sql:ParameterizedQuery fill = `UPDATE eligibility
            SET filled = 'yes' WHERE submitID=${newConsent.submitID} AND DonerID=${newConsent.DonerID}`;

        sql:ExecutionResult|error filledresult = dbClient->execute(fill);

        if filledresult is error {
            return error("Eligibility table not updtaed successfully");
        }

        sql:ParameterizedQuery query = `SELECT AddressLine1, AddressLine2, AddressLine3, District, DateofCampaign FROM campaign WHERE CampaignID =  ${newConsent.campaignId}`;
        Campaign|error camp = dbClient->queryRow(query);

        if camp is Campaign {
            string Address = "";

            if ((camp.add_line2 != null) && (camp.add_line3 != null)) {
                string ad2 = camp.add_line2.toString();
                string ad3 = camp.add_line3.toString();
                Address = camp.add_line1 + " " + ad2 + " " + ad3;
            }
            else if (camp.add_line2 != null) {
                string ad2 = camp.add_line2.toString();
                Address = camp.add_line1 + " " + ad2;
            }

            else{
                Address = camp.add_line1;
            }
            
            return {"message": "Consent and Eligibility successfully updated", "Address": Address, "Date": camp.date};
        }

    }
}

isolated function FormDeatils(string donorId, string campaignId) returns json|error{

    string|error submitID = dbClient->queryRow(`SELECT submitID FROM eligibility WHERE DonerID=${donorId} AND CampaignID=${campaignId}`);

    if submitID is string{
        DonHistory|error resultHistory = dbClient->queryRow(`SELECT hadIssuesBefore, issueDetails, advisedNotToDonate, readInfoLeaflet, medicalConditions  FROM donationhistory WHERE submitID=${submitID}`);

        if resultHistory is error{
            return error("Donor's Donations History Fetching Error");
        }
        DonHistory newHistory=resultHistory;

        MedRisks|error medRisks =  dbClient->queryRow(`SELECT jaundice, tbTyphoid, vaccinations, tattoos, imprisoned, foreignTravel, bloodTransfusion, malaria, dengue, recentIllness, dentalWork, recentMeds, riskyCategoriesAwareness, riskSymptoms FROM medicalrisk WHERE submitID=${submitID}`);

        if medRisks is error{
            return error("Donor's Medical Risks Fetching Error");
        }
        MedRisks newMed = medRisks;

        Consent|error consent = dbClient->queryRow(`SELECT testConsent, instructionConsent, notifyConsent, frequency FROM consent WHERE submitID=${submitID}`);

        if consent is error{
            return error("Donor's Consent Info Fetching Error");
        }

        Consent newConsent = consent;


    json info = {
        hadIssuesBefore: newHistory.hadIssuesBefore,
        issueDetails:newHistory.issueDetails,
        advisedNotToDonate:newHistory.advisedNotToDonate,
        readInfoLeaflet:newHistory.readInfoLeaflet,
        medicalConditions:newHistory.medicalConditions,
        jaundice:newMed.jaundice, 
        tbTyphoid:newMed.tbTyphoid, 
        vaccinations:newMed.vaccinations, 
        tattoos:newMed.tattoos,
        imprisoned:newMed.imprisoned,
        foreignTravel:newMed.foreignTravel, 
        bloodTransfusion:newMed.bloodTransfusion, 
        malaria:newMed.malaria, 
        dengue:newMed.dengue, 
        recentIllness:newMed.recentIllness,
        dentalWork:newMed.dentalWork, 
        recentMeds:newMed.recentMeds, 
        riskyCategoriesAwareness:newMed.riskyCategoriesAwareness, 
        riskSymptoms:newMed.riskSymptoms,
        testConsent:newConsent.testConsent,
        instructionConsent:newConsent.instructionConsent,
        notifyConsent:newConsent.notifyConsent,
        frequency:newConsent.frequency

    }; 

        return info;
    }

    return error("Database Error");

}
