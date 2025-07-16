import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

public type Doner record {
    string doner_id;
    string name;
    string gender;
    string? blood_group;
    string nic_no;
    int tele;
    string address_line1;
    string? address_line2;
    string? address_line3;
    string District;
};

public type Login record {
    string user_name;
    string password;
    string? doner_id;
    string? hospital_id;
    string user_type;
};

public type Hospital record {
    string hospital_id;
    string name;
    string address;
    string District;
    int contact_no;
};

public type Donates record {
    int donate_id;
    string doner_id;
    int campain_id;
    time:Utc donate_time;
    string pressure;
    float weight;
    string sugar;
    int blood_quantity;
};

public type Campaign record {
    int campain_id;
    string district;
    time:Date date;
    string org_name;
    string org_tele;
    string org_email;
    string add_line1;
    string? add_line2;
    string? add_line3;
    int? doner_count;
    int? blood_quantity;
    time:Utc start_time;
    time:Utc end_time;
};

final mysql:Client dbClient = check new (
    host = "localhost",
    port = 3306,
    user = "root",
    password = "316497",
    database = "bbms"
);
