-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ocene`
--

DROP TABLE IF EXISTS `ocene`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ocene` (
  `ocena_id` int(11) NOT NULL,
  `ocena` int(11) DEFAULT NULL,
  `students_student_id` int(11) NOT NULL,
  `predmet_id` int(11) NOT NULL,
  PRIMARY KEY (`ocena_id`,`students_student_id`),
  KEY `fk_ocene_students1_idx` (`students_student_id`),
  KEY `fk_ocene_predmeti1_idx` (`predmet_id`),
  CONSTRAINT `fk_ocene_predmeti1` FOREIGN KEY (`predmet_id`) REFERENCES `predmeti` (`predmet_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ocene_students1` FOREIGN KEY (`students_student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocene`
--

LOCK TABLES `ocene` WRITE;
/*!40000 ALTER TABLE `ocene` DISABLE KEYS */;
INSERT INTO `ocene` VALUES (1,5,5,1),(2,1,1,2),(3,2,2,3),(4,3,5,1),(5,4,5,1),(6,5,5,2),(7,1,8,1),(8,2,1,1),(9,5,17,1),(10,5,17,1),(11,5,17,1),(12,5,17,1),(13,2,10,1),(14,2,1,1),(15,2,17,1),(16,1,10,1),(17,1,10,1);
/*!40000 ALTER TABLE `ocene` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-15  9:14:32
