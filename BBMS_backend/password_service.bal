import ballerina/sql;
import ballerina/http;




isolated function getUserByUsername(string username) returns Login|error {
    sql:ParameterizedQuery query = `SELECT * FROM login WHERE UserName=${username};`;
    Login|error result = dbClient->queryRow(query);
    return result;
}

isolated function loginUser(string username, string password) returns http:Response|error {
    Login user = check getUserByUsername(username);
    boolean isValidPassword = check verifyPassword(password, user.password);

    if !isValidPassword {
        http:Response response = new;
        response.statusCode = 401;
        json errorBody = {
            "error": "Invalid username or password"
        };
        response.setJsonPayload(errorBody);
        return response;
    }

    string? donerId = user.doner_id;
    string userId = donerId is string ? donerId : user.hospital_id ?: "Admin";
    string role = user.user_type;

    string token = check issueToken(username, userId, role);

    // Create HTTP response
    http:Response response = new;

    // Create and set cookie with JWT token
    http:Cookie jwtCookie = new (
        name = "auth_token",
        value = token,
        path = "/",
        httpOnly = true,
        secure = false, // Set to true in production with HTTPS
        maxAge = 3600 // 1 hour in seconds
    );

    // Add cookie to response
    response.addCookie(jwtCookie);

    // Set response headers for token (alternative to cookie)
    response.setHeader("Authorization", "Bearer " + token);
    response.setHeader("Access-Control-Expose-Headers", "Authorization");

    // Set response body
    json responseBody = {
        message: "Login successful",
        user_id: userId,
        user_type: role,
        access_token: token,
        token_type: "Bearer",
        expires_in: 36000
    };

    response.setJsonPayload(responseBody);
    return response;
}

isolated function changePassword(string userType, string username, string newPassword, string? previousPassword) returns json|error {
    if previousPassword is string {
        Login user = check getUserByUsername(username);
        boolean isValidPassword = check verifyPassword(previousPassword, user.password);
        if !isValidPassword {
            return error("Current password is incorrect");
        }
    }

    // Encrypt the new password
    string encryptedNewPassword = check hashPassword(newPassword);

    sql:ExecutionResult|error loginUpdateResult = dbClient->execute(
       ` UPDATE login SET Password = ${encryptedNewPassword} WHERE UserName = ${username}`
    );

    if loginUpdateResult is sql:ExecutionResult {
        return {"Message": "Password changed successfully"};
    } else {
        return loginUpdateResult;
    }
}


isolated function resetPassword(string userType, string userInfo) returns json|error {
    string newPassword = check generatePassword(12);
    Doner|Hospital|error result;
    if userType == "Doner" {
        result = dbClient->queryRow(`SELECT * from Doner where ( Username = ${userInfo} OR Email =${userInfo} OR NICNo = ${userInfo} OR Telephone = ${userInfo});`);

    } else if userType == "Hospital" {
        result = dbClient->queryRow(`SELECT * from Hospital where (Username = ${userInfo} OR Email =${userInfo} OR Contact = ${userInfo});`);

    } else {
        result = error("Incorrect type");
    }

    if result is error {
        return result;
    }
    string? username = result.username;
    string? name = result.name;
    string? Email = result.email;

    if username is string && name is string && Email is string {
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
            "  .btn a {color: #fff; text-decoration: none}" +
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

        _ = check sendEmail(Email, "Password Reset", htmlBody);
        return changePassword(userType, username, newPassword, ());
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
