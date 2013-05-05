CREATE DATABASE  IF NOT EXISTS `ma_erp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ma_erp`;
-- MySQL dump 10.13  Distrib 5.6.10, for Win64 (x86_64)
--
-- Host: localhost    Database: ma_erp
-- ------------------------------------------------------
-- Server version	5.6.10-log

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
-- Table structure for table `customerbase`
--

DROP TABLE IF EXISTS `customerbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customerbase` (
  `cId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dispOrder` int(11) DEFAULT '0',
  `cName` varchar(45) NOT NULL,
  `cFullName` varchar(50) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerbase`
--

LOCK TABLES `customerbase` WRITE;
/*!40000 ALTER TABLE `customerbase` DISABLE KEYS */;
INSERT INTO `customerbase` VALUES (1,1,'生笙','广州生笙','广州'),(2,2,'思奥','广州思奥','广州'),(3,7,'先锋','广州先锋','广州'),(4,8,'海威','广州海威','广州'),(5,3,'中大','高科中大','广州'),(6,5,'海晨','广州海晨','广州'),(7,9,'同迪','广州同迪','广州'),(8,4,'宇欣','广州宇欣','广州'),(9,10,'中山 A','中山代理A','中山'),(10,6,'中山 B','中山代理B','中山'),(11,0,'东莞A','东莞代理A','东莞');
/*!40000 ALTER TABLE `customerbase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dailyreport`
--

DROP TABLE IF EXISTS `dailyreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dailyreport` (
  `cId` int(10) unsigned DEFAULT NULL,
  `pId` int(10) unsigned DEFAULT NULL,
  `rDate` date DEFAULT NULL,
  `pSellIn` int(11) DEFAULT '0',
  `pSellOut` int(11) DEFAULT '0',
  `pStock` int(11) DEFAULT '0',
  `subTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dailyreport`
--

LOCK TABLES `dailyreport` WRITE;
/*!40000 ALTER TABLE `dailyreport` DISABLE KEYS */;
INSERT INTO `dailyreport` VALUES (1,1,'2013-03-29',0,3,74,'2013-03-30 17:13:11'),(1,2,'2013-03-29',50,10,40,'2013-03-30 17:13:11'),(1,33,'2013-04-06',0,3,74,'2013-04-06 13:31:46'),(1,12,'2013-04-06',50,10,40,'2013-04-06 13:31:46'),(1,13,'2013-04-06',0,0,18,'2013-04-06 13:31:46'),(1,17,'2013-04-06',50,0,50,'2013-04-06 13:31:46'),(1,18,'2013-04-06',2,8,42,'2013-04-06 13:31:46'),(1,19,'2013-04-06',0,2,35,'2013-04-06 13:31:46'),(1,20,'2013-04-06',0,2,14,'2013-04-06 13:31:46'),(1,22,'2013-04-06',0,0,17,'2013-04-06 13:31:46'),(1,1,'2013-04-06',0,2,38,'2013-04-06 13:31:46'),(1,11,'2013-04-06',0,1,0,'2013-04-06 13:31:46'),(1,25,'2013-04-06',0,0,9,'2013-04-06 13:31:46'),(1,32,'2013-04-06',0,0,1,'2013-04-06 13:31:46'),(2,11,'2013-04-04',0,1,0,'2013-04-06 13:46:42'),(2,25,'2013-04-04',0,0,9,'2013-04-06 13:46:42'),(2,32,'2013-04-04',0,0,1,'2013-04-06 13:46:42'),(2,11,'2013-04-06',0,1,0,'2013-04-06 13:48:57'),(2,25,'2013-04-06',0,0,9,'2013-04-06 13:48:57'),(2,32,'2013-04-06',0,0,1,'2013-04-06 13:48:57'),(1,5,'2013-04-09',30,4,33,'2013-04-09 13:36:34'),(1,48,'2013-04-15',3,4,5,'2013-04-15 15:55:33'),(2,48,'2013-04-15',4,5,6,'2013-04-15 15:56:16'),(2,5,'2013-04-15',1,2,3,'2013-04-15 15:56:16');
/*!40000 ALTER TABLE `dailyreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodbase`
--

DROP TABLE IF EXISTS `prodbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodbase` (
  `pId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pName` varchar(45) NOT NULL,
  `pFeature` varchar(45) DEFAULT NULL,
  `pSize` decimal(5,2) NOT NULL DEFAULT '18.50',
  `pLED` varchar(10) DEFAULT '0',
  `pPanalType` varchar(10) DEFAULT 'TN',
  `ppID` int(10) DEFAULT NULL,
  `pOrder` int(11) DEFAULT '0',
  PRIMARY KEY (`pId`,`pName`),
  KEY `index3` (`pOrder`),
  KEY `index2` (`pSize`,`pLED`,`pPanalType`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COMMENT='Marketing analysis';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodbase`
--

LOCK TABLES `prodbase` WRITE;
/*!40000 ALTER TABLE `prodbase` DISABLE KEYS */;
INSERT INTO `prodbase` VALUES (1,'B226HQLAymdr','',21.50,'LED','VA',0,0),(2,'DA220HQLbmiacg','',21.50,'LED','VA',0,0),(3,'G193WLb','',19.00,'LED','TN',0,8),(4,'G195HQLEb','',18.50,'LED','TN',0,2),(5,'G195HQLFb','',18.50,'LED','TN',0,3),(6,'G195HQVBb','',18.50,'LCD','TN',0,1),(7,'G195HQVqb','',18.50,'LCD','TN',0,0),(8,'G195WVAb','',19.00,'LED','TN',0,5),(9,'G205HVBb','',20.00,'LED','TN',0,0),(10,'G206HLb','',20.00,'LED','TN',0,0),(11,'G223HQLbd','',21.50,'LED','TN',0,0),(12,'G225HQVb','',21.50,'LED','TN',0,0),(13,'G226HQLbd','',21.50,'LED','TN',0,0),(14,'G226HQLHbd','',21.50,'LED','TN',0,0),(15,'G233HLbd','',23.00,'LED','TN',0,14),(16,'G236HLbd','',23.00,'LED','TN',0,15),(17,'G246HYLbd','',23.80,'LED','IPS',0,0),(18,'G276HLDbid','',27.00,'LED','VA',0,17),(19,'H226HQLbd','高亮 丽镜 无边框',21.50,'LED','IPS',0,18),(20,'H236HLbd','高亮 丽镜 无边框',23.00,'LED','IPS',0,19),(21,'HS244HQbmii','',23.60,'LED','TN',0,0),(22,'K191WVb','',19.00,'LCD','TN',0,-1),(23,'P166HQLb','',15.60,'LED','TN',0,0),(24,'P199HQLb','',18.50,'LED','TN',0,4),(25,'P199WLb','',19.00,'LED','TN',0,0),(26,'P209HQLAb','',19.50,'LED','TN',0,10),(27,'P209HQLb','',19.50,'LED','TN',0,0),(28,'P229HQLAbd','',21.50,'LED','VA',0,12),(29,'P229HQLb','',21.50,'LED','TN',0,11),(30,'P238HLbd','',23.00,'LED','TN',0,0),(31,'P239HLbd','',23.00,'LED','TN',0,0),(32,'P246HAbd','',24.00,'LED','TN',0,16),(33,'P246HLAbd','',24.00,'LED','TN',0,0),(34,'P249HLAbd','',24.00,'LED','VA',0,0),(35,'P249HLbd','',24.00,'LED','TN',0,0),(36,'P279HLAbd','',27.00,'LED','TN',0,0),(37,'P279HLbd','',27.00,'LED','VA',0,0),(38,'S190WLAb','',19.00,'LED','TN',0,6),(39,'S190WLBb','',19.00,'LED','TN',0,7),(40,'S191WLb','',19.00,'LED','TN',0,9),(41,'S200HLBb','',20.00,'LED','TN',0,0),(42,'S200HLDb','',20.00,'LED','TN',0,0),(43,'S200HQLCb','',19.50,'LED','TN',0,0),(44,'S220HQLBbd','',21.50,'LED','TN',0,0),(45,'S220HQLDbd','',21.50,'LED','TN',0,0),(46,'S230HLBbd','',23.00,'LED','TN',0,13),(47,'S230HLEbd','',23.00,'LED','TN',0,0),(48,'S235HLBbd','高亮 丽镜 无边框',23.00,'LED','IPS',0,20),(49,'S236HLtmjj','',23.00,'LED','IPS',0,0),(50,'S240HLbd','',24.00,'LED','TN',0,0),(51,'S240HLwd','',24.00,'LED','TN',0,0),(52,'S242HLBwd','',24.00,'LED','TN',0,0),(53,'S271HLCbd','',27.00,'LED','VA',0,21),(54,'S275HLbmii','高亮 丽镜 无边框 HDMI 音箱',27.00,'LED','IPS',0,0),(55,'S276HLtmjj','',27.00,'LED','IPS',0,0),(56,'T232HLbmidz','触摸 HDMI 音箱',23.00,'LED','IPS',0,0),(57,'T272HLbmidz','触摸 HDMI 音箱',27.00,'LED','VA',0,0),(58,'V173DOb','',17.00,'LCD','TN',0,22),(59,'S235HL',NULL,23.00,'LED','IPS',48,0),(60,'G195HQV','',18.50,'LCD','TN',6,0);
/*!40000 ALTER TABLE `prodbase` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-04-16  0:06:16
