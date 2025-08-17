import ballerina/http;
import ballerina/jwt;
import ballerina/sql;
// import ballerina/io;

listener http:Listener listener9191 = new (9191);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        allowCredentials: true
    }
}

service / on listener9191 {
    // POST /doners
    isolated resource function post donorReg(@http:Payload Doner doner) returns json|error {
        json|error result = check addDoner(doner);
        return result;
    }

    isolated resource function post login(@http:Payload LoginRequest loginReq) returns http:Response|error {
        http:Response|error result = check loginUser(loginReq.username, loginReq.password);
        return result;
    }

    isolated resource function post forgotpassword(@http:Payload ForgotPasswordRequest request) returns json|error{
        return resetPassword(request.userType,request.userInfo);         
    }

    isolated resource function post donates(@http:Payload SearchRequest searchReq) returns json|error {
        json|error result = check search_Doner(searchReq.username_email, searchReq.nic);
        return result;
    }

    isolated resource function post donations(@http:Payload Donates donates) returns json|error {
        json|error result = check addDonation(donates);
        return result;
    }

    isolated resource function post campaignRequest(@http:Payload CampaignRequest data) returns json|error {
        string emailBody = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "  .container { font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px; }" +
                    "  .header { color: #d32f2f; font-size: 22px; font-weight: bold; margin-bottom: 20px; }" +
                    "  .content { font-size: 16px; margin-bottom: 10px; }" +
                    "  .label { font-weight: bold; color: #333; }" +
                    "  .footer { font-size: 14px; color: #555; margin-top: 20px; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "  <div class='container'>" +
                    "    <div class='header'>New Blood Donation Campaign Request</div>" +
                    "    <div class='content'><span class='label'>Organizer Name:</span> " + data.organizerName + "</div>" +
                    "    <div class='content'><span class='label'>Email:</span> " + data.email + "</div>" +
                    "    <div class='content'><span class='label'>Phone Number:</span> " + data.phone + "</div>" +
                    "    <div class='content'><span class='label'>Campaign Name:</span> " + data.campaignName + "</div>" +
                    "    <div class='content'><span class='label'>Location:</span> " + data.location + "</div>" +
                    "    <div class='content'><span class='label'>Date:</span> " + data.date + "</div>" ;
        string? details = data.details;
        if details is string {
                emailBody += "<div class='content'><span class='label'>Additional Details:</span> " + details + "</div>";
            }

            emailBody += "<div class='footer'>This is an auto-generated email. Please do not reply.</div>" +
            "  </div>" +
            "</body>" +
            "</html>";

        string subject = "New Blood Donation Campaign Request | " + data.campaignName+"";
        json|error result =  sendEmail("thilokyaangeesa@gmail.com",subject,emailBody);

        return result;
    }
    //POST donation eligibility
    isolated resource function post eligibility(@http:Payload Eligible eligible) returns json|error {
        json|error result = check determine_eligibility(eligible);
        return result;
    }

    isolated resource function post donationHis(@http:Payload DonHistory donHistory) returns json|error{
        json|error result = check addHistory(donHistory);
        return result;
    }

    isolated resource function post medicalRisk(@http:Payload MedRisks medRisks) returns json|error{
        json|error result = check addmedicalRisk(medRisks);
        return result;
    }

    isolated resource function post consent(@http:Payload Consent consent) returns json|error {
        json|error result = check addConsent(consent);
        return result;
    }

}

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        allowCredentials: true
    }
}

service /dashboard on listener9191 {

    resource function get .(@http:Query string user_id, @http:Query string user_type) returns json|error {
        json body = {
            "userId": "",
            "userName": "",
            "Name": "",
            "Email": "",
            "gender": "",
            "bloodGroup": "",
            "NicNo": "",
            "Dob": "",
            "Telephone": "",
            "AddressLine1": "",
            "AddressLine2": "",
            "AddressLine3": "",
            "District": ""
            //"profileImage" : ""
        };

        if user_type == "Doner" {
            Doner|error doner = getDoner(id = user_id);
            if doner is Doner {
                body = {
                    userId: doner.doner_id,
                    userName: doner.username,
                    Name: doner.name,
                    Email: doner.email,
                    gender: doner.gender,
                    bloodGroup: doner.blood_group,
                    NicNo: doner.nic_no,
                    Dob: doner.dob,
                    Telephone: doner.tele,
                    AddressLine1: doner.address_line1,
                    AddressLine2: doner.address_line2,
                    AddressLine3: doner.address_line3,
                    District: doner.District
                };
            } else {
                return doner;
            }

        } else if user_type == "Hospital" {
            Hospital|error hospital = getHospital(id = user_id);
            if hospital is Hospital {
                body = {
                    userId: hospital.hospital_id,
                    userName: hospital.username,
                    Name: hospital.name,
                    Email: hospital.email,
                    Telephone: hospital.contact_no,
                    AddressLine1: hospital.address_line1,
                    AddressLine2: hospital.address_line2,
                    AddressLine3: hospital.address_line3,
                    District: hospital.District
                };
            } else {
                return hospital;
            }
        } else {
            body= {
                userId: "Admin",
                userName: "Admin",
                Name: "Admin"
            };
        }
        return body;
    }
    
    resource function put .(@http:Query string user_id , @http:Query string user_type, @http:Payload json user_data) returns json|error {
        if user_type == "Doner" {
            map<json> userMap = <map<json>>user_data;
            json donerJson = userMap["doner"];

            Doner|error existingDoner = getDoner(id = user_id);

            if existingDoner is Doner {
                if donerJson is map<json> {
                    donerJson["password"] = existingDoner.password;
                }
            }

            Doner doner = checkpanic donerJson.fromJsonWithType(Doner);

            sql:ExecutionResult|error result = updateDoner(doner);
            if result is sql:ExecutionResult {
                return {"message": "Doner updated successfully"};
            } else {
                return result;
            }

        } else if user_type == "Hospital" {
            map<json> userMap = <map<json>>user_data;
            json hospitalJson = userMap["hospital"];

            Hospital|error existingHospital = getHospital(id = user_id);

            if existingHospital is Hospital {
                if hospitalJson is map<json> {
                    hospitalJson["password"] = existingHospital.password;
                }
            }

            Hospital hospital = checkpanic hospitalJson.fromJsonWithType(Hospital);

            sql:ExecutionResult|error result = updateHospital(hospital);
            if result is sql:ExecutionResult {
                return {"message": "Hospital updated successfully"};
            } else {
                return result;
            }
        }
    }
    
    resource function post hospitalReg(@http:Payload Hospital hospital, http:Caller caller, http:Request req) returns error? {
    // Verify JWT from request
    jwt:Payload payload = check verifyJwtFromRequest(req);

    // Extract role from token
    anydata roleValue = payload["role"];
    if roleValue is () {
        // Missing role
        http:Response res = new;
        res.statusCode = 401;
        res.setJsonPayload({ status: "error", message: "Invalid token: missing role" });
        check caller->respond(res);
        return;
    } else if roleValue != "admin" {
        // Unauthorized role
        http:Response res = new;
        res.statusCode = 403;
        res.setJsonPayload({ status: "error", message: "Unauthorized: Only admin can register hospitals" });
        check caller->respond(res);
        return;
    }

    // Authorized, proceed with adding hospital
    json result = check addHospital(hospital);

    // Respond with success
    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload(result);
    check caller->respond(res);
    }

    resource function get bloodStock(@http:Query string district, string hospital) returns json|error {
        HospitalDetails[]|error hospitalsResult = getAllHospitals(district);

        bloodData|error bloodResult = getBloodStockHospital(district,hospital);
        if district == "All" {
            hospitalsResult = [];
        }

        if hospitalsResult is error {
            return hospitalsResult;
        }
        if bloodResult is error {
            return bloodResult;
        }

        json body = {
            "hospitals": hospitalsResult.toJson(),
            "blood":bloodResult.toJson()
        };

        return body;
    }

    resource function post campReg(@http:Payload Campaign campaign) returns json|error {
        json|error result = check addCamp(campaign);
        return result;
    }
    
    resource function get donations(@http:Query string user_id) returns DonateRecord[]|error{
        DonateRecord[]|error donations= get_DonationHistory(user_id);
        return donations;
    }

    resource function get donor(@http:Query string donor_id) returns json|error{
        string|error dateResult = getLastDonation(donor_id);
        string lastDonation = "";
        string status = "No";
        int donationscount = 0;

        if dateResult is string {
            int|error count = gateLastDonCount(donor_id);
            if count is int {
                if count > 0{
                    donationscount = count;
                    status = "Yes";

                }else{
                    donationscount = count;
                    status = "No";
                }
            }
            lastDonation = dateResult;

        } else {
            lastDonation = "";
        }
        json body = {
            "LastDonation": "",
            "Status": "",
            "Count": "",
            "LastDonationYR": "",
            "LastDonationMonth": "",
            "BYear": "",
            "BMonth": "",
            "Name" : "",
            "BloodGroup" : ""
        };

        Doner|error doner = getDoner(donor_id);
            if doner is Doner {
                string DOB = doner.dob;
                string[] parts1 = re `-`.split(DOB);

                if parts1.length() > 3 {
                    return error("Invalid month format");
                }

                int b_yr = checkpanic int:fromString(parts1[0]);
                int b_m = checkpanic int:fromString(parts1[1]);

                (string|int) lastYear = " ";
                (string|int) lastMonth = " ";

                if lastDonation != "" {
                    string[] parts2 = re `-`.split(lastDonation);

                    if parts2.length() > 3 {
                        return error("Invalid month format");
                    }

                    lastYear = checkpanic int:fromString(parts2[0]);
                    lastMonth = checkpanic int:fromString(parts2[1]);
                }



                body = {
                    LastDonation: lastDonation,
                    Status: status,
                    Count: donationscount,
                    LastDonationYR: lastYear,
                    LastDonationMonth: lastMonth,
                    BYear : b_yr,
                    BMonth : b_m,
                    Name : doner.name,
                    BloodGroup : doner.blood_group

                };

            }else {
                return error("Doner not found");
            }

        return body;
    }

    resource function get campaigns(@http:Query string date, string district) returns Campaign[]|error {
        Campaign[]|error campaigns = getCampaignEvent(date,district);
        return campaigns;
    };

    resource function get CampaignHistory(@http:Query string user_id) returns CampaignDetails[]|error {
        CampaignDetails[]|error campaigns = getCampaignHistory(user_id);
        return campaigns;
    }

    resource function post ChangePassword(@http:Payload passwordData passwordData) returns json|error {
        json|error result = check changePassword(passwordData.userType, passwordData.userName, passwordData.newPassword, passwordData.currentPassword);
        return result;
    }

    resource function get addBloodCampaigns(@http:Query string hospital) returns CampaignIdName[]|error {
        CampaignIdName[]|error hospitals = getCampaignHospital(hospital);
        if hospitals is error {
            return hospitals;
        }
        return hospitals;
        
    }
    resource function post addBlood(@http:Payload BloodData bloodData) returns json|error {

        json|error result = check addBloodStock(bloodData);
        return result;
        
    }

    resource function get verifyRole(http:Request req, @http:Query string pageName) returns json|error {
        
        // Get JWT from request (cookie or Authorization header)
        jwt:Payload payload = check verifyJwtFromRequest(req);

        // Extract role directly from payload
        anydata roleValue = payload["role"];
        if !(roleValue is string) {
            return { "status": "error", "message": "Invalid token: missing or invalid role" };
        }

        // Allowed roles per page
        map<string[]> allowedRoles = {
            "hospitalReg": ["Admin"],
            "availableBloodStock": ["Admin", "Hospital"],
            "dashboard": ["Admin", "Hospital", "Doner"],
            "donates" : ["Hospital"],
            "campReg" : ["Hospital"],
            "donation-history" : ["Doner"],
            "profileInfo" : ["Doner" , "Hospital"],
            "campaignHistory" : ["Hospital" , "Admin"]
        };

        string[]? rolesForPage = allowedRoles[pageName];
        if rolesForPage is () {
            return { "status": "error", "message": "Unknown page: " + pageName };
        }

        boolean isAuthorized = false;
        foreach string allowedRole in rolesForPage {
            if allowedRole.toLowerAscii() == roleValue.toLowerAscii() {
                isAuthorized = true;
                break;
            }
        }

        if !isAuthorized {
            return { 
                "status": "error", 
                "message": "Unauthorized: role '" + roleValue + "' cannot access page '" + pageName + "'" 
            };
        }

        // ✅ Success
        return {
            "status": "authorized",
            "role": roleValue,
            "page": pageName
        };
    }

}