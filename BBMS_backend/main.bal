import ballerina/http;
// import ballerina/io;
import ballerina/sql;
import ballerina/io;

listener http:Listener listener9191 = new (9191);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["POST", "GET", "OPTIONS"]
    }
}

service / on listener9191 {
    // POST /doners
    isolated resource function post donorReg(@http:Payload Doner doner) returns json|error {
        json|error result = check addDoner(doner);
        return result;
    }

    isolated resource function post hospitalReg(@http:Payload Hospital hospital) returns json|error {
        json|error result = check addHospital(hospital);
        return result;
    }

    isolated resource function post login(@http:Payload LoginRequest loginReq) returns json|error {
        json|error result = check loginUser(loginReq.username, loginReq.password);
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
}

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"]
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

    isolated resource function post campReg(@http:Payload Campaign campaign) returns json|error {
        io:println(campaign);
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
        if dateResult is string {
            lastDonation = dateResult;
        } else {
            lastDonation = "";
        }
        json body = {
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
        io:println(campaigns);
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

}