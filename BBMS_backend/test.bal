import ballerina/io;
public function main() {
    bloodData|error j = getBloodStockHospital("Ampara");
    io:println(j);
}