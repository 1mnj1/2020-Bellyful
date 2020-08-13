-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2020 at 04:14 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `belly_full`
--
CREATE DATABASE IF NOT EXISTS `belly_full` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `belly_full`;

DELIMITER $$
--
-- Functions
--
DROP FUNCTION IF EXISTS `delivery_type`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `delivery_type` (`rec_person` INT(11)) RETURNS VARCHAR(50) CHARSET utf8mb4 READS SQL DATA
    COMMENT 'If there is more than one delivery, the type is a follow up'
BEGIN
	DECLARE delType varchar(50);
    SELECT IF(del.del_count<=0,'New','Follow Up') INTO delType  from (SELECT count(delivery.delivery_id)  as del_count  from delivery where delivery.recipient_id = rec_person) as del;

    
    
    
    
    
    return delType;



END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `add_id` int(11) NOT NULL AUTO_INCREMENT,
  `add_num` varchar(11) DEFAULT NULL,
  `add_street` varchar(50) DEFAULT NULL,
  `add_suburb` varchar(50) DEFAULT NULL,
  `add_city` varchar(50) NOT NULL,
  `add_postcode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`add_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`add_id`, `add_num`, `add_street`, `add_suburb`, `add_city`, `add_postcode`) VALUES
(1, '21', 'springwater vale', 'unsworth heights', 'auckland', '0632'),
(2, '22', 'springwater vale', 'unsworth heights', 'auckland', '0632'),
(3, '23', 'springwater vale', 'unsworth heights', 'auckland', '0632'),
(4, '24', 'springwater vale', 'unsworth heights', 'auckland', '0632'),
(5, '19', 'springwater vale', 'unsworth heights', 'auckland', '0632'),
(6, '18', 'springwater vale', 'unsworth heights', 'auckland', '0632');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
CREATE TABLE IF NOT EXISTS `branch` (
  `branch_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `branch_name` varchar(50) NOT NULL,
  `add_id` int(11) NOT NULL,
  PRIMARY KEY (`branch_id`),
  KEY `fk_branch_manager` (`person_id`),
  KEY `fk_branch_add` (`add_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`branch_id`, `person_id`, `branch_name`, `add_id`) VALUES
(1, 2, 'North Shore', 5);

--
-- Triggers `branch`
--
DROP TRIGGER IF EXISTS `Branch_level`;
DELIMITER $$
CREATE TRIGGER `Branch_level` BEFORE INSERT ON `branch` FOR EACH ROW update person
set person.person_user_level = 3
where person.person_id IN (select person.person_id from person, branch where person.person_id = branch.person_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
CREATE TABLE IF NOT EXISTS `delivery` (
  `delivery_id` int(11) NOT NULL AUTO_INCREMENT,
  `vol_id` int(11) DEFAULT NULL,
  `ref_id` int(11) DEFAULT NULL,
  `recipient_id` int(11) NOT NULL,
  `delivery_status` int(11) NOT NULL,
  `delivery_est_time` date NOT NULL DEFAULT current_timestamp(),
  `delivery_start` date DEFAULT NULL,
  `delivery_end` date DEFAULT NULL,
  PRIMARY KEY (`delivery_id`),
  KEY `fk_delivery_rec` (`recipient_id`),
  KEY `fk_delivery_ref` (`ref_id`),
  KEY `fk_delivery_vol` (`vol_id`),
  KEY `fk_del_status` (`delivery_status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`delivery_id`, `vol_id`, `ref_id`, `recipient_id`, `delivery_status`, `delivery_est_time`, `delivery_start`, `delivery_end`) VALUES
(1, 2, 3, 1, 2, '0000-00-00', NULL, NULL),
(4, NULL, 3, 1, 1, '0000-00-00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_status`
--

DROP TABLE IF EXISTS `delivery_status`;
CREATE TABLE IF NOT EXISTS `delivery_status` (
  `stat_id` int(11) NOT NULL AUTO_INCREMENT,
  `stat_name` varchar(50) NOT NULL,
  PRIMARY KEY (`stat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery_status`
--

INSERT INTO `delivery_status` (`stat_id`, `stat_name`) VALUES
(1, 'Unassigned'),
(2, 'Assigned'),
(3, 'In Transit'),
(4, 'Done'),
(5, 'Rejected by Branch'),
(6, 'Rejected by Recipient'),
(7, 'To Contact');

-- --------------------------------------------------------

--
-- Table structure for table `freezer`
--

DROP TABLE IF EXISTS `freezer`;
CREATE TABLE IF NOT EXISTS `freezer` (
  `freezer_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `add_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  PRIMARY KEY (`freezer_id`),
  KEY `fk_freezer_add` (`add_id`),
  KEY `fk_freezer_manager` (`person_id`),
  KEY `fk_freezer_branch` (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `freezer`
--

INSERT INTO `freezer` (`freezer_id`, `person_id`, `add_id`, `branch_id`) VALUES
(1, 1, 2, 1);

--
-- Triggers `freezer`
--
DROP TRIGGER IF EXISTS `insertFreezer`;
DELIMITER $$
CREATE TRIGGER `insertFreezer` BEFORE INSERT ON `freezer` FOR EACH ROW update person
set person.person_user_level = 2
where person.person_id IN (select person.person_id from person, freezer where person.person_id = freezer.person_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `meal`
--

DROP TABLE IF EXISTS `meal`;
CREATE TABLE IF NOT EXISTS `meal` (
  `meal_id` int(11) NOT NULL AUTO_INCREMENT,
  `meal_type` int(11) NOT NULL,
  `freezer_id` int(11) NOT NULL,
  `delivery_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`meal_id`),
  KEY `FK_meal_delivery` (`delivery_id`),
  KEY `FK_meal_type` (`meal_type`),
  KEY `fk_meal_freezer` (`freezer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meal`
--

INSERT INTO `meal` (`meal_id`, `meal_type`, `freezer_id`, `delivery_id`) VALUES
(1, 2, 1, 1),
(2, 1, 1, 1),
(3, 2, 1, NULL),
(4, 2, 1, NULL),
(5, 2, 1, NULL),
(6, 2, 1, NULL),
(7, 1, 1, NULL),
(8, 3, 1, NULL),
(9, 4, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `meal_type`
--

DROP TABLE IF EXISTS `meal_type`;
CREATE TABLE IF NOT EXISTS `meal_type` (
  `MT_id` int(11) NOT NULL AUTO_INCREMENT,
  `meal_type` varchar(50) NOT NULL,
  PRIMARY KEY (`MT_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meal_type`
--

INSERT INTO `meal_type` (`MT_id`, `meal_type`) VALUES
(1, 'lasagna'),
(2, 'Mac and Cheese'),
(3, 'Spag Bol'),
(4, 'Tomato and lentil Soup');

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
CREATE TABLE IF NOT EXISTS `person` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_phone` varchar(50) NOT NULL,
  `person_email` varchar(50) NOT NULL,
  `person_fname` varchar(50) NOT NULL,
  `person_lname` varchar(50) NOT NULL,
  `person_pass` varchar(50) NOT NULL DEFAULT 'P@ssword',
  `person_user_level` int(11) NOT NULL DEFAULT 0,
  `add_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  UNIQUE KEY `person_email` (`person_email`),
  UNIQUE KEY `person_phone` (`person_phone`),
  KEY `FK_person_add` (`add_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`person_id`, `person_phone`, `person_email`, `person_fname`, `person_lname`, `person_pass`, `person_user_level`, `add_id`) VALUES
(1, '02102202041', 'bob@gmail.com', 'bob', 'soap', 'qwerty12345', 2, 5),
(2, '021123456789', 'joan@gmail.com', 'Joan', 'Ark', 'qwerty12345', 3, 6),
(3, '02102202042', 'mrsBrown@gmail.com', 'Betty', 'Brown', 'P@ssword', 0, NULL),
(4, '0211471133', 'piyathim@gmail.com', 'Piyathi', 'Munasinghe', 'P@ssword', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `recipient`
--

DROP TABLE IF EXISTS `recipient`;
CREATE TABLE IF NOT EXISTS `recipient` (
  `person_id` int(11) NOT NULL,
  `rec_dogs` tinyint(1) NOT NULL,
  `rec_children_under_5` int(11) NOT NULL,
  `rec_children_between_5_10` int(11) NOT NULL,
  `rec_children_between_11_17` int(11) NOT NULL,
  `rec_adults` int(11) NOT NULL,
  `rec_dietary_req` varchar(50) NOT NULL,
  `rec_allergies` varchar(50) NOT NULL,
  PRIMARY KEY (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipient`
--

INSERT INTO `recipient` (`person_id`, `rec_dogs`, `rec_children_under_5`, `rec_children_between_5_10`, `rec_children_between_11_17`, `rec_adults`, `rec_dietary_req`, `rec_allergies`) VALUES
(1, 1, 0, 0, 0, 1, 'None', 'None');

-- --------------------------------------------------------

--
-- Table structure for table `referrer`
--

DROP TABLE IF EXISTS `referrer`;
CREATE TABLE IF NOT EXISTS `referrer` (
  `person_id` int(11) NOT NULL,
  `RT_type` int(11) NOT NULL,
  `notes` varchar(200) NOT NULL,
  `organisation` varchar(50) NOT NULL,
  PRIMARY KEY (`person_id`),
  KEY `FK_RT_type` (`RT_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `referrer`
--

INSERT INTO `referrer` (`person_id`, `RT_type`, `notes`, `organisation`) VALUES
(3, 5, 'Good Guy', 'Cool Cats');

-- --------------------------------------------------------

--
-- Table structure for table `referrer_type`
--

DROP TABLE IF EXISTS `referrer_type`;
CREATE TABLE IF NOT EXISTS `referrer_type` (
  `RT_id` int(11) NOT NULL AUTO_INCREMENT,
  `RT_type` varchar(50) NOT NULL,
  PRIMARY KEY (`RT_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `referrer_type`
--

INSERT INTO `referrer_type` (`RT_id`, `RT_type`) VALUES
(1, 'Plunket'),
(2, 'Midwife'),
(3, 'NICU'),
(4, 'Social Worker'),
(5, 'Friend'),
(6, 'Family'),
(7, 'Self');

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
CREATE TABLE IF NOT EXISTS `volunteer` (
  `person_id` int(11) NOT NULL,
  `ice_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `vol_status` int(11) NOT NULL,
  PRIMARY KEY (`person_id`),
  KEY `fk_vol_ice` (`ice_id`),
  KEY `fk_branch_id` (`branch_id`),
  KEY `fk_vol_status` (`vol_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`person_id`, `ice_id`, `branch_id`, `vol_status`) VALUES
(2, 3, 1, 1),
(4, 1, 1, 1);

--
-- Triggers `volunteer`
--
DROP TRIGGER IF EXISTS `insertVol`;
DELIMITER $$
CREATE TRIGGER `insertVol` AFTER INSERT ON `volunteer` FOR EACH ROW update person
set person.person_user_level = 1
where person.person_id IN (select person.person_id from person, volunteer where person.person_id = volunteer.person_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `vol_status`
--

DROP TABLE IF EXISTS `vol_status`;
CREATE TABLE IF NOT EXISTS `vol_status` (
  `VS_id` int(11) NOT NULL AUTO_INCREMENT,
  `VS_stat` varchar(50) NOT NULL,
  PRIMARY KEY (`VS_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vol_status`
--

INSERT INTO `vol_status` (`VS_id`, `VS_stat`) VALUES
(1, 'Cookathons only'),
(2, 'Deliveries Only'),
(3, 'Deliveries and Cookathons'),
(4, 'On Leave');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `fk_branch_add` FOREIGN KEY (`add_id`) REFERENCES `address` (`add_id`),
  ADD CONSTRAINT `fk_branch_manager` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`);

--
-- Constraints for table `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `fk_del_status` FOREIGN KEY (`delivery_status`) REFERENCES `delivery_status` (`stat_id`),
  ADD CONSTRAINT `fk_delivery_rec` FOREIGN KEY (`recipient_id`) REFERENCES `recipient` (`person_id`),
  ADD CONSTRAINT `fk_delivery_ref` FOREIGN KEY (`ref_id`) REFERENCES `referrer` (`person_id`),
  ADD CONSTRAINT `fk_delivery_vol` FOREIGN KEY (`vol_id`) REFERENCES `volunteer` (`person_id`);

--
-- Constraints for table `freezer`
--
ALTER TABLE `freezer`
  ADD CONSTRAINT `fk_freezer_add` FOREIGN KEY (`add_id`) REFERENCES `address` (`add_id`),
  ADD CONSTRAINT `fk_freezer_branch` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`),
  ADD CONSTRAINT `fk_freezer_manager` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`);

--
-- Constraints for table `meal`
--
ALTER TABLE `meal`
  ADD CONSTRAINT `FK_meal_delivery` FOREIGN KEY (`delivery_id`) REFERENCES `delivery` (`delivery_id`),
  ADD CONSTRAINT `FK_meal_type` FOREIGN KEY (`meal_type`) REFERENCES `meal_type` (`MT_id`),
  ADD CONSTRAINT `fk_meal_freezer` FOREIGN KEY (`freezer_id`) REFERENCES `freezer` (`freezer_id`);

--
-- Constraints for table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `FK_person_add` FOREIGN KEY (`add_id`) REFERENCES `address` (`add_id`);

--
-- Constraints for table `recipient`
--
ALTER TABLE `recipient`
  ADD CONSTRAINT `FK_rec_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`);

--
-- Constraints for table `referrer`
--
ALTER TABLE `referrer`
  ADD CONSTRAINT `FK_RT_type` FOREIGN KEY (`RT_type`) REFERENCES `referrer_type` (`RT_id`),
  ADD CONSTRAINT `FK_ref_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`);

--
-- Constraints for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `fk_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`),
  ADD CONSTRAINT `fk_vol_ice` FOREIGN KEY (`ice_id`) REFERENCES `person` (`person_id`),
  ADD CONSTRAINT `fk_vol_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`),
  ADD CONSTRAINT `fk_vol_status` FOREIGN KEY (`vol_status`) REFERENCES `vol_status` (`VS_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
