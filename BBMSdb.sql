CREATE DATABASE  IF NOT EXISTS `bbms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bbms`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: bbms
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bloodstocks`
--

DROP TABLE IF EXISTS `bloodstocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bloodstocks` (
  `StockID` int NOT NULL,
  `CampaignID` varchar(255) NOT NULL,
  `HospitalID` varchar(4) NOT NULL,
  `A_plus` float DEFAULT NULL,
  `B_plus` float DEFAULT NULL,
  `O_plus` float DEFAULT NULL,
  `AB_plus` float DEFAULT NULL,
  `A_minus` float DEFAULT NULL,
  `B_minus` float DEFAULT NULL,
  `O_minus` float DEFAULT NULL,
  `AB_minus` float DEFAULT NULL,
  `District` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`StockID`),
  KEY `bloodstocks_ibfk_1` (`CampaignID`),
  KEY `bloodstocks_ibfk_2` (`HospitalID`),
  CONSTRAINT `bloodstocks_ibfk_1` FOREIGN KEY (`CampaignID`) REFERENCES `campaign` (`CampaignID`),
  CONSTRAINT `bloodstocks_ibfk_2` FOREIGN KEY (`HospitalID`) REFERENCES `hospital` (`HospitalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bloodstocks`
--

LOCK TABLES `bloodstocks` WRITE;
/*!40000 ALTER TABLE `bloodstocks` DISABLE KEYS */;
INSERT INTO `bloodstocks` VALUES (1,'C001','H001',120,85,40,150,20,15,10,5,'Gampaha'),(2,'C002','H002',84,32,65,48,45,65,1,54,'Colombo');
/*!40000 ALTER TABLE `bloodstocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `CampaignID` varchar(255) NOT NULL,
  `District` enum('Ampara','Anuradhapura','Badulla','Batticaloa','Colombo','Galle','Gampaha','Hambantota','Jaffna','Kalutara','Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar','Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya','Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya') DEFAULT NULL,
  `DateofCampaign` date DEFAULT NULL,
  `OrganizerName` varchar(100) DEFAULT NULL,
  `OrganizerTelephone` varchar(15) DEFAULT NULL,
  `OrganizerEmail` varchar(50) DEFAULT NULL,
  `AddressLine1` varchar(100) DEFAULT NULL,
  `AddressLine2` varchar(100) DEFAULT NULL,
  `AddressLine3` varchar(100) DEFAULT NULL,
  `DonerCount` int DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `HospitalID` varchar(5) NOT NULL,
  PRIMARY KEY (`CampaignID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES ('C001','Colombo','2025-08-18','UOM CSE','0703371796','thilokyaangeesa@gmail.com','Katubadda','Moratuwa','',23,'07:42:00','16:42:00','H001'),('C002','Colombo','2025-08-20','Japura','0703371796','thilokyaangeesa@gmail.com','Japura Camps','Mount Lavinia','',50,'09:00:00','16:05:00','H002');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donates`
--

DROP TABLE IF EXISTS `donates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donates` (
  `DonateID` varchar(10) NOT NULL,
  `DonerID` varchar(4) NOT NULL,
  `CampaignID` varchar(255) NOT NULL,
  `DonateTime` time DEFAULT NULL,
  `Pressure` varchar(20) DEFAULT NULL,
  `Weight` decimal(5,2) DEFAULT NULL,
  `Sugar` varchar(20) DEFAULT NULL,
  `BloodQuantity` int DEFAULT NULL,
  PRIMARY KEY (`DonateID`),
  KEY `DonerID` (`DonerID`),
  KEY `CampaignID` (`CampaignID`),
  CONSTRAINT `donates_ibfk_1` FOREIGN KEY (`DonerID`) REFERENCES `doner` (`DonerID`),
  CONSTRAINT `donates_ibfk_2` FOREIGN KEY (`CampaignID`) REFERENCES `campaign` (`CampaignID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donates`
--

LOCK TABLES `donates` WRITE;
/*!40000 ALTER TABLE `donates` DISABLE KEYS */;
/*!40000 ALTER TABLE `donates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doner`
--

DROP TABLE IF EXISTS `doner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doner` (
  `DonerID` varchar(4) NOT NULL,
  `DonerName` varchar(100) DEFAULT NULL,
  `Gender` enum('Male','Female') DEFAULT NULL,
  `BloodGroup` enum('A+','B+','O+','AB+','A-','B-','O-','AB-') DEFAULT NULL,
  `NICNo` varchar(20) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Telephone` varchar(10) DEFAULT NULL,
  `AddressLine1` varchar(100) DEFAULT NULL,
  `AddressLine2` varchar(100) DEFAULT NULL,
  `AddressLine3` varchar(100) DEFAULT NULL,
  `District` enum('Ampara','Anuradhapura','Badulla','Batticaloa','Colombo','Galle','Gampaha','Hambantota','Jaffna','Kalutara','Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar','Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya','Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya') DEFAULT NULL,
  `Password` varbinary(100) DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DonerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doner`
--

LOCK TABLES `doner` WRITE;
/*!40000 ALTER TABLE `doner` DISABLE KEYS */;
INSERT INTO `doner` VALUES ('D001','Thilokya Angeesa','Male',NULL,'200324610311','2003-09-02','0703371796','80/5','Siyambalape Watta','Delgoda','Gampaha',_binary 'pgtnD5&v4tbC','Thilokya03','thilokyaangeesa@gmail.com'),('D002','Lahiru Dilshan','Male','O+','200330111405','2003-10-27','0714566635','2/4','Semidal Farm','Akuressa','Matara','','LahiruDilshan','adlahiru65@gmail.com'),('D003','Hesandi Siwmini','Female','B+','200382110104','2024-11-26','0776713212','21/5','Bandarawaththa','Gampaha','Gampaha','','hesandism','hesandism@gmail.com'),('D004','Hesandi Siwmini','Female','O+','200382110104','2025-08-02','0776713212','21/5','Bandarawaththa','Gampaha','Gampaha',_binary 'N@p#5835OgH$','hesandism','hesandism@gmail.com');
/*!40000 ALTER TABLE `doner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital` (
  `HospitalID` varchar(4) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `District` varchar(50) DEFAULT NULL,
  `Contact` varchar(20) DEFAULT NULL,
  `AddressLine1` varchar(255) DEFAULT NULL,
  `AddressLine2` varchar(255) DEFAULT NULL,
  `AddressLine3` varchar(255) DEFAULT NULL,
  `Password` varbinary(100) DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`HospitalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital`
--

LOCK TABLES `hospital` WRITE;
/*!40000 ALTER TABLE `hospital` DISABLE KEYS */;
INSERT INTO `hospital` VALUES ('H001','Gampaha Hospital','Gampaha','0703371796','Yakkala Road','Gampaha','',_binary '12345','GampahaHos','thilokyaangeesa@gmail.com'),('H002','Colombo Hospital','Colombo','0112488881','Colombo 2','Colombo','',_binary 'zDSt#5$H0w&W','ColomboHos','thilokyaangeesa@gmail.com');
/*!40000 ALTER TABLE `hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `UserName` varchar(50) NOT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `DonerID` varchar(4) DEFAULT NULL,
  `HospitalID` varchar(4) DEFAULT NULL,
  `UserType` enum('Doner','Hospital','Admin') NOT NULL,
  PRIMARY KEY (`UserName`),
  KEY `DonerID` (`DonerID`),
  KEY `HospitalID` (`HospitalID`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`DonerID`) REFERENCES `doner` (`DonerID`),
  CONSTRAINT `login_ibfk_2` FOREIGN KEY (`HospitalID`) REFERENCES `hospital` (`HospitalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('Admin','Admin',NULL,NULL,'Admin'),('ColomboHos','zDSt#5$H0w&W',NULL,'H002','Hospital'),('GampahaHos','12345',NULL,'H001','Hospital'),('hesandism','0776713212','D004',NULL,'Doner'),('Thilokya03','pgtnD5&v4tbC','D001',NULL,'Doner');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-16  0:52:28
