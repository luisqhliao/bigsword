-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bigsword
-- ------------------------------------------------------
-- Server version	5.7.11

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
-- Table structure for table `bs_user`
--

DROP TABLE IF EXISTS `bs_user`;

CREATE TABLE `bs_user` (
  `USER_ID` varchar(20) NOT NULL,
  `NAME` varchar(120) DEFAULT NULL,
  `GENDER` char(1) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `USER_TYPE` varchar(2) DEFAULT NULL,
  `STATUS` varchar(2) DEFAULT NULL,
  `JOIN_DATE` timestamp NULL DEFAULT NULL,
  `RESIGN_DATE` timestamp NULL DEFAULT NULL,
  `MANAGER_ID` varchar(20) DEFAULT NULL,
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  `CREATE_BY` varchar(20) DEFAULT NULL,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `UPDATE_BY` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `bs_leave_management`
--

DROP TABLE IF EXISTS `bs_leave_management`;

CREATE TABLE `bs_leave_management` (
  `ID` varchar(40) not null,
  `USER_ID` varchar(20) NOT NULL,
  `YEAR_OF` char(4) NOT NULL,
  `LEAVE_TYPE` varchar(2) DEFAULT NULL,
  `LEAVE_E` decimal(10,1) NOT NULL DEFAULT '0',
  `LEAVE_O` decimal(10,1) NOT NULL DEFAULT '0',
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  `CREATE_BY` varchar(20) DEFAULT NULL,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `UPDATE_BY` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `bs_leave_request`
--

DROP TABLE IF EXISTS `bs_leave_request`;

CREATE TABLE `bs_leave_request` (
  `REQUEST_ID` varchar(40) NOT NULL,
  `USER_ID` varchar(20) NOT NULL,
  `LEAVE_TYPE` varchar(3) NOT NULL,
  `START_DATE` date NOT NULL,
  `TO_DATE` date NOT NULL,
  `LEAVE_days` decimal(10,1) NOT NULL,
  `REQUEST_STATUS` varchar(5) NOT NULL,
  `REASON` varchar(2000) DEFAULT NULL,
  `COMMENT` varchar(2000) DEFAULT NULL,
  `task_ID` varchar(40),
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  `CREATE_BY` varchar(20) DEFAULT NULL,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `UPDATE_BY` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`REQUEST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `bs_user_attribute`
--

DROP TABLE IF EXISTS `bs_user_attribute`;

CREATE TABLE `bs_user_attribute` (
 `ID` varchar(40) NOT NULL,
  `USER_ID` varchar(20) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `VALUE` varchar(200) DEFAULT NULL,
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  `CREATE_BY` varchar(20) DEFAULT NULL,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `UPDATE_BY` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `category_lookup`
--

DROP TABLE IF EXISTS `category_lookup`;

CREATE TABLE `category_lookup` (
  `ID` varchar(40) NOT NULL,
  `CATEGORY` varchar(100) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `VALUE` varchar(200) DEFAULT NULL,
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  `CREATE_BY` varchar(20) DEFAULT NULL,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `UPDATE_BY` varchar(20) DEFAULT NULL,
   PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `DEPT_ID` varchar(5) NOT NULL,
  `DEPT_NAME` varchar(50) DEFAULT NULL,
  `DEPT_HEAD_ID` varchar(20) DEFAULT NULL,
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  `CREATE_BY` varchar(20) DEFAULT NULL,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `UPDATE_BY` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`DEPT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;

CREATE TABLE `grade` (
  `ID` varchar(40) NOT NULL,
  `GRADE_ID` varchar(15) NOT NULL,
  `WORKING_YEARS` int(11) NOT NULL,
  `ANNUAL_LEAVE` decimal(10,1) DEFAULT NULL,
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  `CREATE_BY` varchar(20) DEFAULT NULL,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `UPDATE_BY` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `special_date`
--

DROP TABLE IF EXISTS `special_date`;

CREATE TABLE `special_date` (
  `SP_DATE` date NOT NULL,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `TYPE` varchar(2) NOT NULL DEFAULT 'P',
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  `CREATE_BY` varchar(20) DEFAULT NULL,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `UPDATE_BY` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`SP_DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump completed on 2016-02-29 21:49:06
