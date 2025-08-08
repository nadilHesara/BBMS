import ballerina/http;
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
        json|error result = check checkPassword(loginReq.username, loginReq.password);
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

}

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["POST", "GET", "PUT", "OPTIONS"]
    }
}

service /dashboard on listener9191 {

    resource function get .(@http:Query string user_id, @http:Query string user_type) returns json|error {
        json body = {
            "userId" : "",
            "userName":"",
            "Name" : "",
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
                    userId : doner.doner_id,
                    userName : doner.username,
                    Name : doner.name,
                    Email : doner.email,
                    gender : doner.gender,
                    bloodGroup : doner.blood_group,
                    NicNo : doner.nic_no,
                    Dob : doner.dob,
                    Telephone : doner.tele,
                    AddressLine1 : doner.address_line1,
                    AddressLine2 : doner.address_line2,
                    AddressLine3 : doner.address_line3,
                    District : doner.District
                };
            } else {
                return doner;
            }

        } else if user_type == "Hospital" {
            Hospital|error hospital = getHospital(id = user_id);
            if hospital is Hospital {
                body = {
                    userId : hospital.hospital_id,
                    userName : hospital.username,
                    Name : hospital.name,
                    Email : hospital.email,
                    Telephone : hospital.contact_no,
                    AddressLine1 : hospital.address_line1,
                    AddressLine2 : hospital.address_line2,
                    AddressLine3 : hospital.address_line3,
                    District : hospital.District
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
            if result is sql:ExecutionResult{
                    return {"message" : "Doner updated successfully"} ;
            }else {
                return result;
            }
            
            
        }else if user_type == "Hospital" {            
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
            if result is sql:ExecutionResult{
                    return {"message" : "Hospital updated successfully"} ;

            }else {
                    return result;
            }

        }
    }

    resource function get bloodStock(@http:Query string district) returns json|error {

        HospitalName[]|error hospitalsResult;
        if district == "All" {
            hospitalsResult = getAllHospitals(());
        } else {
            hospitalsResult = getAllHospitals(district);
        }
        
        if hospitalsResult is error {
            return hospitalsResult;
        }
        
        json body = {
            "hospitals": hospitalsResult
        };
        return body;
    }

    isolated resource function post campReg(@http:Payload Campaign campaign) returns json|error {
        json|error result = check addCamp(campaign);
        return result;
    }
    
    resource function get donations(@http:Query string user_id) returns DonateRecord[]|error{
        DonateRecord[]|error donations= get_DonationHistory(user_id);
        return donations;
    }

    resource function get donor(@http:Query string donor_id,@http:Query string campaign) returns json|error{
        json body = {
            "Name" : "",
            "BloodGroup": "",
            "BYear": "",
            "BMonth": ""
        };
        Doner|error doner = getDoner(donor_id);
            if doner is Doner {
                string DOB = doner.dob;
                string Age_yr = string:substring(DOB, 0, 4);
                string Age_m = string:substring(DOB, 5, 7);
                int b_yr = checkpanic int:fromString(Age_yr);
                int b_m = checkpanic int:fromString(Age_m);

                body = {
                    Name : doner.name,
                    BloodGroup : doner.blood_group,
                    BYear : b_yr,
                    BMonth : b_m
                };

            }else {
                return error("Doner not found");
            }
        io:println(body);
        return body;
    }

    resource function get campaigns(@http:Query string date, string district) returns Campaign[]|error {
        Campaign[]|error campaigns = getCampaignEvent(date,district);
        return campaigns;
    };
}
