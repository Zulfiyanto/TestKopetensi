-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: db_collections
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `collections_tb`
--

DROP TABLE IF EXISTS `collections_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collections_tb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collections_tb`
--

LOCK TABLES `collections_tb` WRITE;
/*!40000 ALTER TABLE `collections_tb` DISABLE KEYS */;
INSERT INTO `collections_tb` VALUES (1,'School',2),(3,'School',1),(4,'Hobbies',2),(5,'Coding',3);
/*!40000 ALTER TABLE `collections_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_tb`
--

DROP TABLE IF EXISTS `task_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_tb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `is_done` int NOT NULL,
  `collections_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_tb`
--

LOCK TABLES `task_tb` WRITE;
/*!40000 ALTER TABLE `task_tb` DISABLE KEYS */;
INSERT INTO `task_tb` VALUES (3,'Game',0,4),(4,'meeting',1,3),(5,'belajar',0,4),(6,'belajar',0,1),(7,'pulang',0,1),(8,'makan',0,3),(9,'Debugging',0,5);
/*!40000 ALTER TABLE `task_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_tb`
--

DROP TABLE IF EXISTS `users_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_tb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_tb`
--

LOCK TABLES `users_tb` WRITE;
/*!40000 ALTER TABLE `users_tb` DISABLE KEYS */;
INSERT INTO `users_tb` VALUES (1,'user@mail.com','user','12345'),(2,'fikar@mail.com','fikar','12345'),(3,'anto@mail.com','anto','12345');
/*!40000 ALTER TABLE `users_tb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-09 22:49:33
