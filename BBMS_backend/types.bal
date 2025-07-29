import ballerina/sql;
import ballerina/time;

public type Doner record {
    @sql:Column {name: "DonerID"}
    string doner_id;

    @sql:Column {name: "DonerName"}
    string name;

    @sql:Column {name: "Gender"}
    string gender;

    @sql:Column {name: "BloodGroup"}
    string? blood_group;

    @sql:Column {name: "NICNo"}
    string nic_no;

    @sql:Column {name: "DoB"}
    string dob;

    @sql:Column {name: "Telephone"}
    string tele;

    @sql:Column {name: "AddressLine1"}
    string address_line1;

    @sql:Column {name: "AddressLine2"}
    string address_line2;

    @sql:Column {name: "AddressLine3"}
    string? address_line3;

    @sql:Column {name: "District"}
    string District;

    @sql:Column {name: "Username"}
    string username;

    @sql:Column {name: "Password"}
    string? password = ();

    @sql:Column {name: "Email"}
    string email;

    @sql:Column {name: "ProfileImage"}
    string profileImage?;
};

public type Login record {
    @sql:Column {name: "UserName"}
    string user_name;

    @sql:Column {name: "Password"}
    string password;

    @sql:Column {name: "DonerID"}
    string? doner_id;

    @sql:Column {name: "HospitalID"}
    string? hospital_id;

    @sql:Column {name: "UserType"}
    string user_type;
};

public type Hospital record {
    @sql:Column {name: "HospitalID"}
    string hospital_id;

    @sql:Column {name: "Name"}
    string name;

    @sql:Column {name: "District"}
    string District;

    @sql:Column {name: "Contact"}
    string contact_no;

    @sql:Column {name: "AddressLine1"}
    string address_line1;

    @sql:Column {name: "AddressLine2"}
    string address_line2;

    @sql:Column {name: "AddressLine2"}
    string? address_line3;

    @sql:Column {name: "Username"}
    string username;

    @sql:Column {name: "Password"}
    string password;

    @sql:Column {name: "Email"}
    string email;

    @sql:Column {name: "ProfileImage"}
    string profileImage?;
};

public type Donates record {
    string donate_id;
    string doner_id;
    int campain_id;
    time:Utc donate_time;
    string pressure;
    float weight;
    string sugar;
    int blood_quantity;
};

public type Campaign record {
    @sql:Column {name: "CampaignID"}
    string campain_id;

    @sql:Column {name: "District"}
    string district;

    @sql:Column {name: "DateofCampaign"}
    string date;

    @sql:Column {name: "OrganizerName"}
    string org_name;

    @sql:Column {name: "OrganizerTelephone"}
    string org_tele;

    @sql:Column {name: "OrganizerEmail"}
    string org_email;

    @sql:Column {name: "AddressLine1"}
    string add_line1;

    @sql:Column {name: "AddressLine2"}
    string? add_line2;

    @sql:Column {name: "AddressLine3"}
    string? add_line3;

    @sql:Column {name: "DonerCount"}
    int? doner_count;

    @sql:Column {name: "BloodQuantity"}
    int? blood_quantity;

    @sql:Column {name: "StartTime"}
    string start_time;

    @sql:Column {name: "EndTime"}
    string end_time;
};

public type DonerID record {
    string? DonerID;
};

public type HospitalID record {
    string? HospitalID;
};

public type LoginRequest record {
    string username;
    string password;
};

public type bloodData record {
    string? A_plus;
    string? B_plus;
    string? O_plus;
    string? AB_plus;
    string? A_minus;
    string? B_minus;
    string? O_minus;
    string? AB_minus;
};

public type ForgotPasswordRequest record {|
    string userType;
    string userInfo;
|};