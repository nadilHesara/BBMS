import ballerina/sql;

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

    @sql:Column {name: "Email"}
    string email?;
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

    string? password;

    @sql:Column {name: "Email"}
    string email;

    int? isCampaign;
};

public type Donates record {
    @sql:Column {name: "DonateID"}
    string donate_id;

    @sql:Column {name: "DonerID"}
    string doner_id;

    @sql:Column {name: "CampaignID"}
    string campaign_id;

    @sql:Column {name: "DonateTime"}
    string? donate_time;

    @sql:Column {name: "Pressure"}
    string pressure;

    @sql:Column {name: "Weight"}
    decimal weight;

    @sql:Column {name: "Sugar"}
    string sugar;

    @sql:Column {name: "BloodQuantity"}
    int? blood_quantity;

    @sql:Column {name: "BloodGroup"}
    string blood_group;
};

public type DonateRecord record {
    @sql:Column {name: "OrganizerName"}
    string org_name;

    @sql:Column {name: "DateofCampaign"}
    string date;

    @sql:Column {name: "District"}
    string district;

    @sql:Column {name: "CampaignName"}
    string CampaignName;

    @sql:Column {name: "Name"}
    string HospitalName;
};

public type Campaign record {
    @sql:Column {name: "CampaignID"}
    string campain_id;

    @sql:Column {name: "CampaignName"}
    string CampaignName;

    @sql:Column {name: "District"}
    string district;

    @sql:Column {name: "DateofCampaign"}
    string? date;

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

    @sql:Column {name: "StartTime"}
    string? start_time;

    @sql:Column {name: "EndTime"}
    string? end_time;

    @sql:Column {name: "HospitalID"}
    string hospital_id;

    @sql:Column {name: "location"}
    string? location;

};

public type DonerID record {
    string? DonerID;
};

public type HospitalID record {
    string? HospitalID;
};

public type CampaignID record {
    string? CampaignID;
};

public type DonationID record {
    string? DonateID;
};

public type SubmissionID record {
    string? submitID;
};

public type LoginRequest record {
    string username;
    string password;
};

public type SearchRequest record {
    string username_email;
    string nic;
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


type passwordData record {|
    string currentPassword;
    string newPassword;
    string userType;
    string userName;

|};

public type HospitalDetails record {|
    string HospitalID;
    string Name;
|};

public type CampaignDetails record {
    @sql:Column {name: "CampaignID"}
    string CampaignID;

    @sql:Column {name: "District"}
    string District;

    @sql:Column {name: "DateofCampaign"}
    string? Date;

    @sql:Column {name: "OrganizerName"}
    string orgName;

    @sql:Column {name: "OrganizerTelephone"}
    string orgTele;

    @sql:Column {name: "OrganizerEmail"}
    string orgEmail;

    @sql:Column {name: "DonerCount"}
    int? DonerCount?;

    @sql:Column {name: "A_plus"}
    string? A_plus;

    @sql:Column {name: "B_plus"}
    string? B_plus;

    @sql:Column {name: "O_plus"}
    string? O_plus;

    @sql:Column {name: "AB_plus"}
    string? AB_plus;

    @sql:Column {name: "A_minus"}
    string? A_minus;

    @sql:Column {name: "B_minus"}
    string? B_minus;

    @sql:Column {name: "O_minus"}
    string? O_minus;

    @sql:Column {name: "AB_minus"}
    string? AB_minus;

    @sql:Column { name: "completed" }
    string? completed;
};

public type CampaignRequest record {|
    string organizerName;
    string email;
    string phone;
    string campaignName;
    string location;
    string date;
    string? details;
|};

public type BloodData record {|
    string bloodType;
    string? campaignId;
    string hospitalId;
    int units;
    string? notes;
|};

public type CampaignIdName record {|
    string CampaignID;
    string CampaignName;
|};

public type BloodStockDetails record {|
    int StockId;
    string CampaignID;
|};

public type Eligible record {
    @sql:Column {name: "submitID"}
    string submitID;

    @sql:Column {name: "foreignTravel"}
    int 'foreignTravel?;

    @sql:Column {name: "risk"}
    string 'risk?;

    @sql:Column {name: "DonerID"}
    string DonerID;

    @sql:Column {name: "eligible"}
    boolean eligible;

    @sql:Column {name: "CampaignID"}
    string CampaignID;

    boolean 'previous_eligibility?;
};

public type DonHistory record {
    @sql:Column {name: "submitID"}
    string submitID;

    @sql:Column {name: "hadIssuesBefore"}
    string hadIssuesBefore;

    @sql:Column {name: "issueDetails"}
    string 'issueDetails?;

    @sql:Column {name: "advisedNotToDonate"}
    string advisedNotToDonate;

    @sql:Column {name: "readInfoLeaflet"}
    string readInfoLeaflet;

    @sql:Column {name: "medicalConditions"}
    string medicalConditions;

};

public type MedRisks record {
    @sql:Column {name: "submitID"}
    string submitID;

    @sql:Column {name: "jaundice"}
    string jaundice;

    @sql:Column {name: "tbTyphoid"}
    string tbTyphoid;

    @sql:Column {name: "vaccinations"}
    string vaccinations;

    @sql:Column {name: "tattoos"}
    string tattoos;

    @sql:Column {name: "imprisoned"}
    string imprisoned;

    @sql:Column {name: "foreignTravel"}
    string foreignTravel;

    @sql:Column {name: "bloodTransfusion"}
    string bloodTransfusion;

    @sql:Column {name: "malaria"}
    string malaria;

    @sql:Column {name: "dengue"}
    string dengue;

    @sql:Column {name: "recentIllness"}
    string recentIllness;

    @sql:Column {name: "dentalWork"}
    string dentalWork;

    @sql:Column {name: "recentMeds"}
    string recentMeds;

    @sql:Column {name: "riskyCategoriesAwareness"}
    string riskyCategoriesAwareness;

    @sql:Column {name: "riskSymptoms"}
    string riskSymptoms;

};

public type Consent record {
    @sql:Column {name: "submitID"}
    string submitID;

    @sql:Column {name: "testConsent"}
    boolean testConsent;

    @sql:Column {name: "instructionConsent"}
    boolean instructionConsent;

    @sql:Column {name: "notifyConsent"}
    boolean notifyConsent;

    @sql:Column {name: "frequency"}
    string 'frequency?;

    @sql:Column {name: "DonerID"}
    string DonerID;

    string campaignId;

};
