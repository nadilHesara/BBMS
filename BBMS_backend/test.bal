import ballerina/io;

public function main() returns error? {
    Hospital[]|error hospitals = getAllHospitals("Gampaha");
    
    if hospitals is Hospital[] {
        io:println("Hospitals in Gampaha district:");
        foreach Hospital hospital in hospitals {
            io:println(hospital);
        }
    } else {
        io:println("Error retrieving hospitals: ", hospitals.message());
    }
}