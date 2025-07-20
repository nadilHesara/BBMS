-- MySQL dump 10.13  Distrib 9.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: bbms
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `CampaignID` int NOT NULL,
  `District` enum('Ampara','Anuradhapura','Badulla','Batticaloa','Colombo','Galle','Gampaha','Hambantota','Jaffna','Kalutara','Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar','Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya','Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya') DEFAULT NULL,
  `DateofCampaign` date DEFAULT NULL,
  `OrganizerName` varchar(100) DEFAULT NULL,
  `OrganizerTelephone` varchar(15) DEFAULT NULL,
  `OrganizerEmail` varchar(50) DEFAULT NULL,
  `AddressLine1` varchar(100) DEFAULT NULL,
  `AddressLine2` varchar(100) DEFAULT NULL,
  `AddressLine3` varchar(100) DEFAULT NULL,
  `DonerCount` int DEFAULT NULL,
  `BloodQuantity` int DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  PRIMARY KEY (`CampaignID`)
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
-- Table structure for table `donates`
--

DROP TABLE IF EXISTS `donates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donates` (
  `DonateID` int NOT NULL,
  `DonerID` varchar(4) DEFAULT NULL,
  `CampaignID` int DEFAULT NULL,
  `DonateTime` time DEFAULT NULL,
  `Pressure` varchar(20) DEFAULT NULL,
  `Weight` decimal(3,2) DEFAULT NULL,
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
  PRIMARY KEY (`DonerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doner`
--

LOCK TABLES `doner` WRITE;
/*!40000 ALTER TABLE `doner` DISABLE KEYS */;
INSERT INTO `doner` VALUES ('D001','Thilokya Angeesa','Male','B+','200324610311','2025-07-09','0703371796','80/5','Siyambalape Watta','Delgoda','Gampaha'),('D002','Nadil Kulathunge','Male','B+','200316510320','2025-06-11','0712726851','80/5','Siyambalape Watta','Delgoda','Gampaha'),('D003','Senuth Abewardhana','Male','O+','200416510456','2025-02-12','0718204533','80/5','Siyambalape Watta','Delgoda','Gampaha'),('D004','Dulaj Sathsara','Male','B+','200315610339','2024-07-04','0768626723','80/5','Siyambalape Watta','Delgoda','Gampaha'),('D005','Nethsith Gunaweera','Male','O+','200329700821','2023-11-14','0771833558','80/5','Siyambalape Watta','Delgoda','Gampaha'),('D006','Isuru Indunil','Male','B+','200329707892','2023-06-14','0771833888','80/5','Siyambalape Watta','Delgoda','Gampaha');
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
  `Address` varchar(150) DEFAULT NULL,
  `District` varchar(50) DEFAULT NULL,
  `Contact` varchar(20) DEFAULT NULL,
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
  `UserType` enum('Doner','Hospital') NOT NULL,
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

-- Dump completed on 2025-07-17 23:28:46
