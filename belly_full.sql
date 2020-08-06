-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2020 at 03:50 AM
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
-- Database: `bully_full`
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

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`add_id`, `add_num`, `add_street`, `add_suburb`, `add_city`, `add_postcode`) VALUES
(1, 21, 'springwater vale', 'unsworth heights', 'auckland', '0632'),
(2, 16, 'aberdeen rd', 'suburbia', 'wellington', '0928'),
(3, 19, 'springwater vale', 'unsworth heights', 'auckland', '0632'),
(4, 15, 'aberdeen rd', 'suburbia', 'wellington', '0928');

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
CREATE TABLE `delivery` (
  `delivery_id` int(11) NOT NULL,
  `vol_phone` varchar(50) NOT NULL,
  `ref_phone` varchar(50) NOT NULL,
  `delivery_status` int(11) NOT NULL,
  `delivery_est_time` date NOT NULL DEFAULT current_timestamp(),
  `delivery_start` date DEFAULT NULL,
  `delivery_end` date DEFAULT NULL,
  `recipient_phone` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `delivery`:
--   `delivery_status`
--       `delivery_status` -> `stat_id`
--   `recipient_phone`
--       `recipient` -> `person_phone`
--   `ref_phone`
--       `referrer` -> `person_phone`
--   `vol_phone`
--       `volunteer` -> `person_phone`
--

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`delivery_id`, `vol_phone`, `ref_phone`, `delivery_status`, `delivery_est_time`, `delivery_start`, `delivery_end`, `recipient_phone`) VALUES
(1, '021123456', '021123456', 2, '0000-00-00', NULL, NULL, '02102202041');

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

--
-- Dumping data for table `delivery_status`
--

INSERT INTO `delivery_status` (`stat_id`, `stat_name`) VALUES
(1, 'unassigned'),
(2, 'assigned'),
(3, 'delivering'),
(4, 'done');

-- --------------------------------------------------------

--
-- Table structure for table `freezer`
--

DROP TABLE IF EXISTS `freezer`;
CREATE TABLE `freezer` (
  `freezer_id` int(11) NOT NULL,
  `person_phone` varchar(50) NOT NULL,
  `add_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `freezer`:
--   `add_id`
--       `address` -> `add_id`
--   `person_phone`
--       `person` -> `person_phone`
--

--
-- Dumping data for table `freezer`
--

INSERT INTO `freezer` (`freezer_id`, `person_phone`, `add_id`) VALUES
(1, '023123456', 4);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `login_id` varchar(50) NOT NULL,
  `login_password` varchar(50) NOT NULL,
  `user_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `login`:
--   `login_id`
--       `person` -> `person_phone`
--

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_id`, `login_password`, `user_level`) VALUES
('021123456', 'dogsBetweendogs', 1);

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

--
-- Dumping data for table `meal`
--

INSERT INTO `meal` (`meal_id`, `meal_type`, `freezer_id`, `delivery_id`) VALUES
(1, 1, 1, NULL),
(2, 1, 1, NULL),
(3, 1, 1, NULL),
(4, 1, 1, NULL),
(5, 1, 1, NULL),
(6, 1, 1, NULL),
(7, 1, 1, NULL),
(8, 1, 1, NULL),
(10, 1, 1, NULL),
(11, 2, 1, NULL),
(12, 2, 1, NULL),
(13, 2, 1, NULL),
(14, 2, 1, NULL);

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

--
-- Dumping data for table `meal_type`
--

INSERT INTO `meal_type` (`MT_id`, `meal_type`) VALUES
(1, 'Lasagne'),
(2, 'Veggie Sandwich');

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `person_phone` varchar(50) NOT NULL,
  `person_email` varchar(50) NOT NULL,
  `person_fname` varchar(50) NOT NULL,
  `person_lname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `person`:
--

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`person_phone`, `person_email`, `person_fname`, `person_lname`) VALUES
('02102202041', 'Brian@example.com', 'Brian', 'Jackbox'),
('021123456', 'bobsoap@soap.com', 'bob', 'soap'),
('022123456', 'meganC@dogs.com', 'megan', 'cartel'),
('023123456', 'Bobs@aunty.com', 'Bobs your', 'Aunty');

-- --------------------------------------------------------

--
-- Table structure for table `recipient`
--

DROP TABLE IF EXISTS `recipient`;
CREATE TABLE `recipient` (
  `person_phone` varchar(50) NOT NULL,
  `rec_dogs` tinyint(1) NOT NULL,
  `rec_children_under_5` int(11) NOT NULL,
  `rec_children_between_5_10` int(11) NOT NULL,
  `rec_children_between_11_17` int(11) NOT NULL,
  `rec_adults` int(11) NOT NULL,
  `rec_dietary_req` varchar(50) NOT NULL,
  `rec_allergies` varchar(50) NOT NULL,
  `add_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `recipient`:
--   `add_id`
--       `address` -> `add_id`
--   `person_phone`
--       `person` -> `person_phone`
--

--
-- Dumping data for table `recipient`
--

INSERT INTO `recipient` (`person_phone`, `rec_dogs`, `rec_children_under_5`, `rec_children_between_5_10`, `rec_children_between_11_17`, `rec_adults`, `rec_dietary_req`, `rec_allergies`, `add_id`) VALUES
('02102202041', 1, 12, 2, 1, 1, 'None', 'None', 3);

-- --------------------------------------------------------

--
-- Table structure for table `referrer`
--

DROP TABLE IF EXISTS `referrer`;
CREATE TABLE `referrer` (
  `person_phone` varchar(50) NOT NULL,
  `RT_type` int(11) NOT NULL,
  `add_id` int(11) NOT NULL,
  `notes` varchar(200) NOT NULL,
  `organisation` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `referrer`:
--   `RT_type`
--       `referrer_type` -> `RT_id`
--   `add_id`
--       `address` -> `add_id`
--   `person_phone`
--       `person` -> `person_phone`
--

--
-- Dumping data for table `referrer`
--

INSERT INTO `referrer` (`person_phone`, `RT_type`, `add_id`, `notes`, `organisation`) VALUES
('021123456', 1, 3, 'This guy is real cool\r\n', 'Cool Cats');

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

--
-- Dumping data for table `referrer_type`
--

INSERT INTO `referrer_type` (`RT_id`, `RT_type`) VALUES
(1, 'midwife'),
(2, 'Plunket');

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
CREATE TABLE `volunteer` (
  `person_phone` varchar(50) NOT NULL,
  `ice_phone` varchar(50) NOT NULL,
  `add_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `volunteer`:
--   `add_id`
--       `address` -> `add_id`
--   `ice_phone`
--       `person` -> `person_phone`
--   `person_phone`
--       `person` -> `person_phone`
--

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`person_phone`, `ice_phone`, `add_id`) VALUES
('021123456', '022123456', 1),
('022123456', '023123456', 4);

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
  ADD KEY `fk_delivery_rec` (`recipient_phone`),
  ADD KEY `fk_delivery_ref` (`ref_phone`),
  ADD KEY `fk_delivery_vol` (`vol_phone`),
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
  ADD KEY `fk_freezer_manager` (`person_phone`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`);

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
  ADD PRIMARY KEY (`person_phone`),
  ADD UNIQUE KEY `person_email` (`person_email`);

--
-- Indexes for table `recipient`
--
ALTER TABLE `recipient`
  ADD PRIMARY KEY (`person_phone`),
  ADD KEY `FK_rec_add` (`add_id`);

--
-- Indexes for table `referrer`
--
ALTER TABLE `referrer`
  ADD PRIMARY KEY (`person_phone`),
  ADD KEY `FK_RT_type` (`RT_type`),
  ADD KEY `FK_ref_add` (`add_id`);

--
-- Indexes for table `referrer_type`
--
ALTER TABLE `referrer_type`
  ADD PRIMARY KEY (`RT_id`);

--
-- Indexes for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD PRIMARY KEY (`person_phone`),
  ADD KEY `fk_vol_add` (`add_id`),
  ADD KEY `fk_vol_ice` (`ice_phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `add_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `delivery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `delivery_status`
--
ALTER TABLE `delivery_status`
  MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `freezer`
--
ALTER TABLE `freezer`
  MODIFY `freezer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `meal`
--
ALTER TABLE `meal`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `meal_type`
--
ALTER TABLE `meal_type`
  MODIFY `MT_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `referrer_type`
--
ALTER TABLE `referrer_type`
  MODIFY `RT_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `fk_del_status` FOREIGN KEY (`delivery_status`) REFERENCES `delivery_status` (`stat_id`),
  ADD CONSTRAINT `fk_delivery_rec` FOREIGN KEY (`recipient_phone`) REFERENCES `recipient` (`person_phone`),
  ADD CONSTRAINT `fk_delivery_ref` FOREIGN KEY (`ref_phone`) REFERENCES `referrer` (`person_phone`),
  ADD CONSTRAINT `fk_delivery_vol` FOREIGN KEY (`vol_phone`) REFERENCES `volunteer` (`person_phone`);

--
-- Constraints for table `freezer`
--
ALTER TABLE `freezer`
  ADD CONSTRAINT `fk_freezer_add` FOREIGN KEY (`add_id`) REFERENCES `address` (`add_id`),
  ADD CONSTRAINT `fk_freezer_manager` FOREIGN KEY (`person_phone`) REFERENCES `person` (`person_phone`);

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `fk_login_id` FOREIGN KEY (`login_id`) REFERENCES `person` (`person_phone`);

--
-- Constraints for table `meal`
--
ALTER TABLE `meal`
  ADD CONSTRAINT `FK_meal_delivery` FOREIGN KEY (`delivery_id`) REFERENCES `delivery` (`delivery_id`),
  ADD CONSTRAINT `FK_meal_type` FOREIGN KEY (`meal_type`) REFERENCES `meal_type` (`MT_id`),
  ADD CONSTRAINT `fk_meal_freezer` FOREIGN KEY (`freezer_id`) REFERENCES `freezer` (`freezer_id`);

--
-- Constraints for table `recipient`
--
ALTER TABLE `recipient`
  ADD CONSTRAINT `FK_rec_add` FOREIGN KEY (`add_id`) REFERENCES `address` (`add_id`),
  ADD CONSTRAINT `FK_rec_phone` FOREIGN KEY (`person_phone`) REFERENCES `person` (`person_phone`);

--
-- Constraints for table `referrer`
--
ALTER TABLE `referrer`
  ADD CONSTRAINT `FK_RT_type` FOREIGN KEY (`RT_type`) REFERENCES `referrer_type` (`RT_id`),
  ADD CONSTRAINT `FK_ref_add` FOREIGN KEY (`add_id`) REFERENCES `address` (`add_id`),
  ADD CONSTRAINT `FK_ref_phone` FOREIGN KEY (`person_phone`) REFERENCES `person` (`person_phone`);

--
-- Constraints for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `fk_vol_add` FOREIGN KEY (`add_id`) REFERENCES `address` (`add_id`),
  ADD CONSTRAINT `fk_vol_ice` FOREIGN KEY (`ice_phone`) REFERENCES `person` (`person_phone`),
  ADD CONSTRAINT `fk_vol_phone` FOREIGN KEY (`person_phone`) REFERENCES `person` (`person_phone`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
