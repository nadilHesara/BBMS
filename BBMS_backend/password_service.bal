import ballerina/sql;

isolated function checkPassword(string username, string password) returns json|error {
    sql:ParameterizedQuery query = `SELECT * FROM login WHERE (UserName=${username});`;
    Login|error result = check dbClient->queryRow(query);
    if result is Login {
        if (result.user_name == username && result.password == password) {
            if result.doner_id is string {
                return {
                    "message": "Doner Login successful",
                    "user_id": result.doner_id,
                    "user_type": result.user_type
                };
            }
            else {
                return {
                    "message": "Hospital Login successful",
                    "user_id": result.hospital_id,
                    "user_type": result.user_type
                };
            }
        } else {
            return error("Invalid username or password");
        }
    } else {
        return result;
    }
}

isolated function changePassword(string userType, string username, string newPassword, string? previousPassword) returns json|error {
    json|error? oldPasswordCheck =() ;
    if previousPassword is string {
        oldPasswordCheck= checkPassword(username, previousPassword);
    }
    if oldPasswordCheck is error {
        return oldPasswordCheck;
    }

    // Build parameterized query (safe interpolation)
    sql:ExecutionResult|error userUpdateResult;
    if userType == "Doner" {
        userUpdateResult = dbClient->execute(`UPDATE Doner SET Password = ${newPassword} WHERE Username = ${username}`);
    }else if userType == "Hospital" {
        userUpdateResult = dbClient->execute(`UPDATE Hospital SET Password = ${newPassword} WHERE Username = ${username}`);
    }else {
        userUpdateResult = error("User type is different!");
    }

    if userUpdateResult is sql:ExecutionResult {
        sql:ParameterizedQuery updateLoginQuery = `UPDATE login SET Password = ${newPassword} WHERE Username = ${username}`;
        sql:ExecutionResult|error loginUpdateResult = dbClient->execute(updateLoginQuery);

        if loginUpdateResult is sql:ExecutionResult {
            return { "Message": "Password changed successfully" };
        } else {
            return loginUpdateResult;
        }
    } else {
        return userUpdateResult;
    }
}


isolated function resetPassword(string userType, string userInfo) returns json|error {
    string newPassword = check generatePassword(12);
    Doner|Hospital|error result ;
    if userType == "Doner" {
        result = dbClient->queryRow(`SELECT * from Doner where ( Username = ${userInfo} OR Email =${userInfo} OR NICNo = ${userInfo} OR Telephone = ${userInfo});`);
        
    }else if userType == "Hospital" {
        result = dbClient->queryRow(`SELECT * from Hospital where (Username = ${userInfo} OR Email =${userInfo} OR Contact = ${userInfo});`);
    
    }else {
        result = error("Incorrect type");
    }

    if result is error{
        return result;
    }

        string? Username = result.username;
        string? previousPassword = result.password; 
        string? Email = result.email;

    if Username is string && previousPassword is string && Email is string{
        _ = check sendEmail(Email,newPassword,Username);
        return changePassword(userType, Username,newPassword, ());
    }
    return error("Incorrect user");
}

isolated function search_Doner(string username_email, string nic) returns json|error {
    sql:ParameterizedQuery query = `SELECT * FROM doner WHERE ((UserName=${username_email} OR Email=${username_email}) AND NICNo=${nic});`;
    Doner|error result = check dbClient->queryRow(query);
    
        if result is Doner {
        return {
            "message": "A Registered Doner",
            "user_id": result.doner_id
        };
                   
    } else {
        return error("No Registered Doner found");

    }

}