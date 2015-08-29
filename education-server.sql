-- phpMyAdmin SQL Dump
-- version 4.2.12deb2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 24, 2015 at 12:32 AM
-- Server version: 5.6.24-0ubuntu2
-- PHP Version: 5.6.4-4ubuntu6

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `education`
--

--
-- Dumping data for table `Departments`
--

INSERT INTO `Departments` (`id`, `name`, `name_en`, `status`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'العام', 'General', 1, '2015-08-23 00:00:00', '2015-08-23 00:00:00', 1),
-- (2, 'الحاسب الآلي', 'Computer Science', 1, '2015-08-23 19:20:11', '2015-08-23 19:20:11', 1),
-- (3, 'الفيزياء', 'Physics', 1, '2015-08-23 19:20:44', '2015-08-23 19:20:44', 1),
-- (4, 'الكيمياء', 'Chemistry', 1, '2015-08-23 19:21:18', '2015-08-23 19:55:24', 1);

--
-- Dumping data for table `Divisions`
--

INSERT INTO `Divisions` (`id`, `name`, `name_en`, `status`, `createdAt`, `updatedAt`, `UserId`, `DepartmentId`) VALUES
(1, 'العام', 'General', 1, '2015-08-23 19:52:52', '2015-08-23 19:53:04', 1, 1),
-- (7, 'برمجة الشبكات', 'Network Programming', 1, '2015-08-23 19:53:28', '2015-08-23 19:53:28', 1, 2),
-- (8, 'الفيزياء الفضائية', 'Space Physics', 1, '2015-08-23 19:53:50', '2015-08-23 19:53:50', 1, 3),
-- (9, 'حماية الشبكات', 'Network Security', 1, '2015-08-23 19:54:18', '2015-08-23 19:54:18', 1, 2),
-- (10, 'تقنية المعلومات', 'IT', 1, '2015-08-23 19:54:34', '2015-08-23 19:54:34', 1, 2),
-- (11, 'الكيمياء العضوية', 'Generic Chemistry', 1, '2015-08-23 19:55:11', '2015-08-23 19:55:11', 1, 4);

--
-- Dumping data for table `DivisionSubjects`
--

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `salt`, `phone`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'احمد الفيتوري', 'ahmed.elfituri@gmail.com', 'JA+dUSkF9SqvovwTkas2fB79d5cYRJhrv2NfKndQXxQn2nCH+ElXTiZKOuUKP0N6qTA9kRdqIdyu/McmX5t/Kxtb70Qpz8x6XqPYmV1vOaSwaVj62fH44zNQDQ7RTe4xfuTphSlYkdqMns3zxP+Nwlf86+/HP8NwAkCsIk+wZKQb5tQFMY0wA6SZHkcNcqgQf4v/EgvEFKhX4qzlR8tI3Mzrl2PppxPlpuwK3yNtT6YCRLTgKTWfLL0haQtBOM0Bgq8SA4F68Q2yvjhzHmDJccM/IzPDtYtJ5eXyXy6qIt8XbZcQ2ZtYNaIvCwr5vkDN0eKvOop83SzJL+CNZDSSqA==', '200.R9+bVO7LHvjm9U+moDxu55lIjMgE86SHS/IfLQAcTlk=', '0925032654', 1, '2015-08-23 19:15:03', '2015-08-23 19:15:03'),
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
