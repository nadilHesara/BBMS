import ballerina/sql;

isolated function checkPassword(string username) returns Login|error {
    sql:ParameterizedQuery query = `SELECT * FROM login WHERE UserName=${username};`;
    Login|error result =  dbClient->queryRow(query);
    return result;
}

isolated function loginUser(string username, string password) returns json|error {
    Login user = check checkPassword(username);

    boolean valid = check verifyPassword(password, user.password);
    if valid {
        if user.doner_id is string {
            return {
                "message": "Doner Login successful",
                "user_id": user.doner_id,
                "user_type": user.user_type
            };
        } else {
            return {
                "message": "Hospital Login successful",
                "user_id": user.hospital_id,
                "user_type": user.user_type
            };
        }
    } else {
        return error("Invalid username or password");
    }
}

isolated function changePassword(string userType, string username, string newPassword, string? previousPassword) returns json|error {
    if previousPassword is string {
        json|error loginCheck =  loginUser(username, previousPassword);
        if loginCheck is error {
            return error("User Does not Exist");
        }
    }

    // Encrypt the new password
    string encryptedNewPassword = check hashPassword(newPassword);
 
    sql:ExecutionResult|error loginUpdateResult = dbClient->execute(
        `UPDATE login SET Password = ${encryptedNewPassword} WHERE UserName = ${username}`
        );

    if loginUpdateResult is sql:ExecutionResult {
        return { "Message": "Password changed successfully" };
    } else {
        return loginUpdateResult;
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
    string? username = result.username;
    string? name = result.name;
    string? Email = result.email;

    if username is string && name is string  && Email is string{
        string htmlBody = 
            "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "<style>" +
            "  body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }" +
            "  .container { max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }" +
            "  .header { color: #d32f2f; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; }" +
            "  .content { font-size: 16px; color: #333; margin-bottom: 20px; line-height: 1.5; }" +
            "  .password { font-weight: bold; color: #d32f2f; }" +
            "  .footer { font-size: 14px; color: #777; text-align: center; margin-top: 30px; }" +
            "  .btn { display: inline-block; padding: 10px 20px; background-color: #d32f2f; color: #fff; text-decoration: none; border-radius: 6px; }" +
            "  .btn a {color: #fff; text-decoration: none}"+
            "</style>" +
            "</head>" +
            "<body>" +
            "  <div class='container'>" +
            "    <div class='header'>Reset Your BBMS Password</div>" +
            "    <div class='content'>" +
            "      Hello " + name + ",<br/><br/>" +
            "      Your password has been reset successfully. <br/>" +
            "Your user name is : " + username +
            " <br/> Your new password is: " +
            "      <span class='password'>" + newPassword + "</span><br/><br/>" +
            "      Please login and change your password immediately for security reasons." +
            "    </div>" +
            "    <div style='text-align: center;'>" +
            "      <a class='btn' href='http://localhost:5173/login'>Login Now</a>" +
            "    </div>" +
            "    <div class='footer'>This is an auto-generated email. Please do not reply.</div>" +
            "  </div>" +
            "</body>" +
            "</html>";
            
        _ = check sendEmail(Email , "Password Reset", htmlBody);
        return changePassword(userType, username,newPassword, ());
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