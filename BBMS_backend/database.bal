import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable string HOST = ?;
configurable int PORT = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;

public final mysql:Client dbClient = check new (
    host = HOST,
    port = PORT,
    user = USER,
    password = PASSWORD,
    database = DATABASE
);
