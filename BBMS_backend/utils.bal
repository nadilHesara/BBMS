import ballerina/email;
import ballerina/random;

public isolated function IdIncriment(string currentId) returns string {
    string prefix = currentId[0].toString();
    string numericPart = currentId.substring(1);

    int numericValue = checkpanic int:fromString(numericPart);
    numericValue += 1;

    string newNumeric = padWithZeros(numericValue, 3);

    string nextId = prefix + newNumeric;
    return nextId;
}

isolated function padWithZeros(int number, int width) returns string {
    string numStr = number.toString();
    int numZeros = width - numStr.length();
    if (numZeros <= 0) {
        return numStr;
    }
    string zeros = "";
    foreach int i in 0 ..< numZeros {
        zeros += "0";
    }
    return zeros + numStr;
}

public isolated function toBinaryString(string numStr) returns string|error {
    int originalNum = check int:fromString(numStr);

    if originalNum == 0 {
        return "0";
    }
    int mutableNum = originalNum;
    string binary = "";

    while mutableNum > 0 {
        binary = (mutableNum % 2).toString() + binary;
        mutableNum = mutableNum / 2;
    }
    return binary;
}

public isolated function generatePassword(int length = 12) returns string|error {
    string letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string digits = "0123456789";
    string symbols = "!@#$%&*?";
    string allChars = letters + digits + symbols;
    int totalChars = allChars.length();

    string password = "";

    int letterIndex = check random:createIntInRange(0, letters.length() - 1);
    password += letters[letterIndex].toString();

    int digitIndex = check random:createIntInRange(0, digits.length() - 1);
    password += digits[digitIndex].toString();

    int symbolIndex = check random:createIntInRange(0, symbols.length() - 1);
    password += symbols[symbolIndex].toString();

    foreach int i in 0 ..< (length - 3) {
        int randIndex = check random:createIntInRange(0, totalChars - 1);
        password += allChars[randIndex].toString();
    }
    return randomize(password);
}

isolated function randomize(string text) returns string|error {
    byte[] chars = text.toBytes();
    int n = chars.length();

    foreach int i in 0 ..< n - 1 {
        int j = check random:createIntInRange(i, n - 1);
        byte temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
    }

    return string:fromBytes(chars);
}

public isolated function sendEmail(string toEmail, string subject, string body) returns error? {

    email:SmtpClient smtpClient = check new (
        host = "smtp.gmail.com",
        port = 465,
        username = "thilokyabusness@gmail.com",
        password = "xbcq ajjd gsvr pgag"
    );

    email:Message message = {
        to: [toEmail],
        subject: subject,
        htmlBody:  body
    };
    check smtpClient->sendMessage(message);
}