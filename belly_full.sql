-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2020 at 01:55 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `add_id` int(11) NOT NULL,
  `add_num` int(11) DEFAULT NULL,
  `add_street` varchar(50) DEFAULT NULL,
  `add_suburb` varchar(50) DEFAULT NULL,
  `add_city` varchar(50) NOT NULL,
  `add_postcode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `address`:
--

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
CREATE TABLE `delivery` (
  `delivery_id` int(11) NOT NULL,
  `vol_id` int(11) NOT NULL,
  `ref_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `delivery_status` int(11) NOT NULL,
  `delivery_est_time` date NOT NULL DEFAULT current_timestamp(),
  `delivery_start` date DEFAULT NULL,
  `delivery_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `delivery`:
--   `delivery_status`
--       `delivery_status` -> `stat_id`
--   `recipient_id`
--       `recipient` -> `person_id`
--   `ref_id`
--       `referrer` -> `person_id`
--   `vol_id`
--       `volunteer` -> `person_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `delivery_status`
--

DROP TABLE IF EXISTS `delivery_status`;
CREATE TABLE `delivery_status` (
  `stat_id` int(11) NOT NULL,
  `stat_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `delivery_status`:
--

-- --------------------------------------------------------

--
-- Table structure for table `freezer`
--

DROP TABLE IF EXISTS `freezer`;
CREATE TABLE `freezer` (
  `freezer_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `add_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `freezer`:
--   `add_id`
--       `address` -> `add_id`
--   `person_id`
--       `person` -> `person_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `meal`
--

DROP TABLE IF EXISTS `meal`;
CREATE TABLE `meal` (
  `meal_id` int(11) NOT NULL,
  `meal_type` int(11) NOT NULL,
  `freezer_id` int(11) NOT NULL,
  `delivery_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `meal`:
--   `delivery_id`
--       `delivery` -> `delivery_id`
--   `meal_type`
--       `meal_type` -> `MT_id`
--   `freezer_id`
--       `freezer` -> `freezer_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `meal_type`
--

DROP TABLE IF EXISTS `meal_type`;
CREATE TABLE `meal_type` (
  `MT_id` int(11) NOT NULL,
  `meal_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `meal_type`:
--

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `person_id` int(11) NOT NULL,
  `person_phone` varchar(50) NOT NULL,
  `person_email` varchar(50) NOT NULL,
  `person_fname` varchar(50) NOT NULL,
  `person_lname` varchar(50) NOT NULL,
  `person_pass` varchar(50) NOT NULL,
  `person_user_level` int(11) NOT NULL DEFAULT 0,
  `add_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `person`:
--   `add_id`
--       `address` -> `add_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipient`
--

DROP TABLE IF EXISTS `recipient`;
CREATE TABLE `recipient` (
  `person_id` int(11) NOT NULL,
  `rec_dogs` tinyint(1) NOT NULL,
  `rec_children_under_5` int(11) NOT NULL,
  `rec_children_between_5_10` int(11) NOT NULL,
  `rec_children_between_11_17` int(11) NOT NULL,
  `rec_adults` int(11) NOT NULL,
  `rec_dietary_req` varchar(50) NOT NULL,
  `rec_allergies` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `recipient`:
--   `person_id`
--       `person` -> `person_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `referrer`
--

DROP TABLE IF EXISTS `referrer`;
CREATE TABLE `referrer` (
  `person_id` int(11) NOT NULL,
  `RT_type` int(11) NOT NULL,
  `notes` varchar(200) NOT NULL,
  `organisation` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `referrer`:
--   `RT_type`
--       `referrer_type` -> `RT_id`
--   `person_id`
--       `person` -> `person_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `referrer_type`
--

DROP TABLE IF EXISTS `referrer_type`;
CREATE TABLE `referrer_type` (
  `RT_id` int(11) NOT NULL,
  `RT_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `referrer_type`:
--

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
CREATE TABLE `volunteer` (
  `person_id` int(11) NOT NULL,
  `ice_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `volunteer`:
--   `ice_id`
--       `person` -> `person_id`
--   `person_id`
--       `person` -> `person_id`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`add_id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`delivery_id`),
  ADD KEY `fk_delivery_rec` (`recipient_id`),
  ADD KEY `fk_delivery_ref` (`ref_id`),
  ADD KEY `fk_delivery_vol` (`vol_id`),
  ADD KEY `fk_del_status` (`delivery_status`);

--
-- Indexes for table `delivery_status`
--
ALTER TABLE `delivery_status`
  ADD PRIMARY KEY (`stat_id`);

--
-- Indexes for table `freezer`
--
ALTER TABLE `freezer`
  ADD PRIMARY KEY (`freezer_id`),
  ADD KEY `fk_freezer_add` (`add_id`),
  ADD KEY `fk_freezer_manager` (`person_id`);

--
-- Indexes for table `meal`
--
ALTER TABLE `meal`
  ADD PRIMARY KEY (`meal_id`),
  ADD KEY `FK_meal_delivery` (`delivery_id`),
  ADD KEY `FK_meal_type` (`meal_type`),
  ADD KEY `fk_meal_freezer` (`freezer_id`);

--
-- Indexes for table `meal_type`
--
ALTER TABLE `meal_type`
  ADD PRIMARY KEY (`MT_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`person_id`),
  ADD UNIQUE KEY `person_email` (`person_email`),
  ADD UNIQUE KEY `person_phone` (`person_phone`),
  ADD KEY `FK_person_add` (`add_id`);

--
-- Indexes for table `recipient`
--
ALTER TABLE `recipient`
  ADD PRIMARY KEY (`person_id`);

--
-- Indexes for table `referrer`
--
ALTER TABLE `referrer`
  ADD PRIMARY KEY (`person_id`),
  ADD KEY `FK_RT_type` (`RT_type`);

--
-- Indexes for table `referrer_type`
--
ALTER TABLE `referrer_type`
  ADD PRIMARY KEY (`RT_id`);

--
-- Indexes for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD PRIMARY KEY (`person_id`),
  ADD KEY `fk_vol_ice` (`ice_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `add_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `delivery_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery_status`
--
ALTER TABLE `delivery_status`
  MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `freezer`
--
ALTER TABLE `freezer`
  MODIFY `freezer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meal`
--
ALTER TABLE `meal`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meal_type`
--
ALTER TABLE `meal_type`
  MODIFY `MT_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referrer_type`
--
ALTER TABLE `referrer_type`
  MODIFY `RT_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

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
  ADD CONSTRAINT `fk_vol_ice` FOREIGN KEY (`ice_id`) REFERENCES `person` (`person_id`),
  ADD CONSTRAINT `fk_vol_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
