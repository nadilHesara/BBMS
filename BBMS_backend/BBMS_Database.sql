CREATE DATABASE  IF NOT EXISTS `bloodbank` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bloodbank`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: bloodbank
-- ------------------------------------------------------
-- Server version	9.3.0

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
  `StockID` int NOT NULL AUTO_INCREMENT,
  `CampaignID` varchar(255) DEFAULT NULL,
  `HospitalID` varchar(5) NOT NULL,
  `A_plus` float DEFAULT NULL,
  `B_plus` float DEFAULT NULL,
  `O_plus` float DEFAULT NULL,
  `AB_plus` float DEFAULT NULL,
  `A_minus` float DEFAULT NULL,
  `B_minus` float DEFAULT NULL,
  `O_minus` float DEFAULT NULL,
  `AB_minus` float DEFAULT NULL,
  `note` mediumtext,
  PRIMARY KEY (`StockID`),
  KEY `bloodstocks_ibfk_1` (`CampaignID`),
  KEY `bloodstocks_ibfk_2` (`HospitalID`),
  CONSTRAINT `bloodstocks_ibfk_1` FOREIGN KEY (`CampaignID`) REFERENCES `campaign` (`CampaignID`),
  CONSTRAINT `bloodstocks_ibfk_2` FOREIGN KEY (`HospitalID`) REFERENCES `hospital` (`HospitalID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bloodstocks`
--

LOCK TABLES `bloodstocks` WRITE;
/*!40000 ALTER TABLE `bloodstocks` DISABLE KEYS */;
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
  `HospitalID` varchar(5) DEFAULT NULL,
  `CampaignName` varchar(255) DEFAULT NULL,
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
  `completed` tinyint NOT NULL DEFAULT '0',
  `location` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`CampaignID`),
  UNIQUE KEY `CampaignID_UNIQUE` (`CampaignID`),
  KEY `fk_campaign_hospital` (`HospitalID`),
  CONSTRAINT `fk_campaign_hospital` FOREIGN KEY (`HospitalID`) REFERENCES `hospital` (`HospitalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consent`
--

DROP TABLE IF EXISTS `consent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consent` (
  `submitID` varchar(4) DEFAULT NULL,
  `testConsent` tinyint(1) DEFAULT NULL,
  `instructionConsent` tinyint(1) DEFAULT NULL,
  `notifyConsent` tinyint(1) DEFAULT NULL,
  `frequency` varchar(50) DEFAULT NULL,
  `DonerID` varchar(4) DEFAULT NULL,
  KEY `fk_consent` (`submitID`),
  KEY `fk_donor` (`DonerID`),
  CONSTRAINT `fk_consent` FOREIGN KEY (`submitID`) REFERENCES `eligibility` (`submitID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_donor` FOREIGN KEY (`DonerID`) REFERENCES `doner` (`DonerID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consent`
--

LOCK TABLES `consent` WRITE;
/*!40000 ALTER TABLE `consent` DISABLE KEYS */;
/*!40000 ALTER TABLE `consent` ENABLE KEYS */;
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
  `CampaignID` varchar(255) DEFAULT NULL,
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
-- Table structure for table `donationhistory`
--

DROP TABLE IF EXISTS `donationhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donationhistory` (
  `submitID` varchar(4) NOT NULL,
  `hadIssuesBefore` enum('Yes','No') DEFAULT NULL,
  `issueDetails` varchar(200) DEFAULT NULL,
  `advisedNotToDonate` enum('Yes','No') DEFAULT NULL,
  `readInfoLeaflet` enum('Yes','No') DEFAULT NULL,
  `medicalConditions` set('Heart Disease','Diabetes','Fits','Stroke','Asthma/Lung','Liver Disease','Kidney Disease','Blood Disorder','') DEFAULT NULL,
  KEY `fk_history` (`submitID`),
  CONSTRAINT `fk_history` FOREIGN KEY (`submitID`) REFERENCES `eligibility` (`submitID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donationhistory`
--

LOCK TABLES `donationhistory` WRITE;
/*!40000 ALTER TABLE `donationhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `donationhistory` ENABLE KEYS */;
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
  `Username` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Telephone` varchar(10) DEFAULT NULL,
  `AddressLine1` varchar(100) DEFAULT NULL,
  `AddressLine2` varchar(100) DEFAULT NULL,
  `AddressLine3` varchar(100) DEFAULT NULL,
  `District` enum('Ampara','Anuradhapura','Badulla','Batticaloa','Colombo','Galle','Gampaha','Hambantota','Jaffna','Kalutara','Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar','Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya','Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya') DEFAULT NULL,
  PRIMARY KEY (`DonerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doner`
--

LOCK TABLES `doner` WRITE;
/*!40000 ALTER TABLE `doner` DISABLE KEYS */;
/*!40000 ALTER TABLE `doner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eligibility`
--

DROP TABLE IF EXISTS `eligibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eligibility` (
  `submitID` varchar(4) NOT NULL,
  `foreignTravel` int DEFAULT NULL,
  `risk` enum('Yes','No') DEFAULT NULL,
  `DonerID` varchar(4) NOT NULL,
  `eligible` tinyint(1) NOT NULL,
  `CampaignID` varchar(4) DEFAULT NULL,
  `filled` enum('Yes','No') DEFAULT NULL,
  PRIMARY KEY (`submitID`),
  UNIQUE KEY `one_time` (`DonerID`,`CampaignID`),
  KEY `fk_campaign` (`CampaignID`),
  CONSTRAINT `fk_campaign` FOREIGN KEY (`CampaignID`) REFERENCES `campaign` (`CampaignID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_eligibility` FOREIGN KEY (`DonerID`) REFERENCES `doner` (`DonerID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eligibility`
--

LOCK TABLES `eligibility` WRITE;
/*!40000 ALTER TABLE `eligibility` DISABLE KEYS */;
/*!40000 ALTER TABLE `eligibility` ENABLE KEYS */;
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
INSERT INTO `login` VALUES ('Admin','df8793259c1d92e044424e08ed7abcd19f1df5b0e1cd6ab3d7709857ed73863de1df159bec17a6abf75480a601b24218',NULL,NULL,'Admin');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalrisk`
--

DROP TABLE IF EXISTS `medicalrisk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicalrisk` (
  `submitID` varchar(4) NOT NULL,
  `jaundice` enum('Yes','No') DEFAULT NULL,
  `tbTyphoid` enum('Yes','No') DEFAULT NULL,
  `vaccinations` enum('Yes','No') DEFAULT NULL,
  `tattoos` enum('Yes','No') DEFAULT NULL,
  `imprisoned` enum('Yes','No') DEFAULT NULL,
  `foreignTravel` enum('Yes','No') DEFAULT NULL,
  `bloodTransfusion` enum('Yes','No') DEFAULT NULL,
  `malaria` enum('Yes','No') DEFAULT NULL,
  `dengue` enum('Yes','No') DEFAULT NULL,
  `recentIllness` enum('Yes','No') DEFAULT NULL,
  `dentalWork` enum('Yes','No') DEFAULT NULL,
  `recentMeds` enum('Yes','No') DEFAULT NULL,
  `riskyCategoriesAwareness` enum('Yes','No') DEFAULT NULL,
  `riskSymptoms` enum('Yes','No') DEFAULT NULL,
  KEY `fk_medicalrisk` (`submitID`),
  CONSTRAINT `fk_medicalrisk` FOREIGN KEY (`submitID`) REFERENCES `eligibility` (`submitID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalrisk`
--

LOCK TABLES `medicalrisk` WRITE;
/*!40000 ALTER TABLE `medicalrisk` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicalrisk` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-19 19:01:47
