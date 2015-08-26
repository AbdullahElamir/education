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
(2, 'الحاسب الآلي', 'Computer Science', 1, '2015-08-23 19:20:11', '2015-08-23 19:20:11', 1),
(3, 'الفيزياء', 'Physics', 1, '2015-08-23 19:20:44', '2015-08-23 19:20:44', 1),
(4, 'الكيمياء', 'Chemistry', 1, '2015-08-23 19:21:18', '2015-08-23 19:55:24', 1);

--
-- Dumping data for table `Divisions`
--

INSERT INTO `Divisions` (`id`, `name`, `name_en`, `status`, `createdAt`, `updatedAt`, `UserId`, `DepartmentId`) VALUES
(1, 'العام', 'General', 1, '2015-08-23 19:52:52', '2015-08-23 19:53:04', 1, 1),
(7, 'برمجة الشبكات', 'Network Programming', 1, '2015-08-23 19:53:28', '2015-08-23 19:53:28', 1, 2),
(8, 'الفيزياء الفضائية', 'Space Physics', 1, '2015-08-23 19:53:50', '2015-08-23 19:53:50', 1, 3),
(9, 'حماية الشبكات', 'Network Security', 1, '2015-08-23 19:54:18', '2015-08-23 19:54:18', 1, 2),
(10, 'تقنية المعلومات', 'IT', 1, '2015-08-23 19:54:34', '2015-08-23 19:54:34', 1, 2),
(11, 'الكيمياء العضوية', 'Generic Chemistry', 1, '2015-08-23 19:55:11', '2015-08-23 19:55:11', 1, 4);

--
-- Dumping data for table `DivisionSubjects`
--

INSERT INTO `DivisionSubjects` (`status`, `createdAt`, `updatedAt`, `SubjectId`, `DivisionId`) VALUES
(1, '2015-08-23 20:18:45', '2015-08-23 20:18:45', 1, 7),
(1, '2015-08-23 20:19:34', '2015-08-23 20:19:34', 1, 9),
(1, '2015-08-23 20:57:19', '2015-08-23 20:57:19', 1, 10),
(1, '2015-08-23 20:18:49', '2015-08-23 20:18:49', 3, 7),
(1, '2015-08-23 20:22:05', '2015-08-23 20:22:05', 3, 9),
(1, '2015-08-23 20:57:23', '2015-08-23 20:57:23', 3, 10),
(1, '2015-08-23 20:18:53', '2015-08-23 20:18:53', 4, 7),
(1, '2015-08-23 20:22:17', '2015-08-23 20:22:17', 4, 9),
(1, '2015-08-23 21:24:51', '2015-08-23 21:24:51', 4, 10),
(1, '2015-08-23 20:18:58', '2015-08-23 20:18:58', 5, 7),
(1, '2015-08-23 21:24:56', '2015-08-23 21:24:56', 5, 10),
(1, '2015-08-23 20:18:13', '2015-08-23 20:18:13', 6, 6);

--
-- Dumping data for table `Faculty_members`
--

INSERT INTO `Faculty_members` (`id`, `name`, `qualification`, `birth_date`, `specialization`, `gender`, `physical_address`, `phone`, `place_birth`, `nationality`, `status`, `createdAt`, `updatedAt`, `DepartmentId`, `UserId`) VALUES
(1, 'محمد', 'ماجستير', '2012-03-07 00:00:00', 'انجليزي', 0, 'مرسا', '0925032654', '1', 2, 1, '2015-08-23 21:18:14', '2015-08-23 21:18:14', 1, 1),
(2, 'سالم', 'ماجستير', '2012-02-29 00:00:00', 'برمجة', 0, 'طرابلس', '092505555', '1', 2, 1, '2015-08-23 21:22:36', '2015-08-23 21:22:36', 2, 1);

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (`id`, `name`, `quantity`, `status`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, ' الشهيد نادر', 50, 1, '2015-08-23 19:56:20', '2015-08-23 19:56:20', 1),
(2, 'القاعة الاولى', 30, 1, '2015-08-23 19:56:37', '2015-08-23 19:56:37', 1),
(3, 'القاعة الثانية', 20, 1, '2015-08-23 19:56:56', '2015-08-23 19:56:56', 1);

--
-- Dumping data for table `Semesters`
--

INSERT INTO `Semesters` (`id`, `sem_type`, `system_type`, `year`, `current`, `starting_date`, `ending_date`, `status`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 1, 1, '2010-01-01 00:00:00', 2, '2010-01-01 00:00:00', '2010-04-30 00:00:00', 1, '2015-08-23 19:31:17', '2015-08-23 19:31:17', 1),
(2, 2, 1, '2010-01-01 00:00:00', 2, '2010-05-01 00:00:00', '2010-10-01 00:00:00', 1, '2015-08-23 19:31:56', '2015-08-23 19:31:56', 1),
(3, 0, 2, '2011-01-01 00:00:00', 2, '2011-01-01 00:00:00', '2011-12-31 00:00:00', 1, '2015-08-23 19:32:21', '2015-08-23 19:32:21', 1);

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`id`, `first_name`, `first_name_en`, `father_name`, `father_name_en`, `grand_name`, `grand_name_en`, `last_name`, `last_name_en`, `mother_name`, `mother_name_en`, `birth_date`, `place_birth`, `nationality`, `gender`, `no_paper_family`, `no_reg_family`, `physical_address`, `civil_reg`, `phone`, `father_work_place`, `last_cert`, `cust_last_cert`, `date_cert`, `place_cert`, `set_number`, `student_rate`, `nid`, `status`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'احمد', 'Fituri', 'محمد', 'Ali', 'مفتاح', 'Mohamed', 'الفيتوري', 'Ahmed', 'سالمة', 'Salma', '2015-01-01 00:00:00', 1, 14, 0, 21342342, 2147483647, 'باب بن غشير', 'طرابلس', '925032654', 'الماين', 'دبلوم', 'كمبيوتر', '2016-07-20 00:00:00', 'طرابلس', 23423423, 75, '4234234234', 1, '2015-08-23 21:15:21', '2015-08-23 21:15:21', 1),
(2, 'حماد', 'Fituri', 'محمد', 'Ali', 'مفتاح', 'Mohamed', 'الفيتوري', 'Ahmed', 'سالمة', 'Salma', '2015-01-01 00:00:00', 1, 14, 0, 21342342, 2147483647, 'باب بن غشير', 'طرابلس', '925032654', 'الماين', 'دبلوم', 'كمبيوتر', '2016-07-20 00:00:00', 'طرابلس', 23423423, 75, '4234234234', 1, '2015-08-23 21:15:21', '2015-08-23 21:15:21', 1),
(3, 'ابلبد', 'Fituri', 'محمد', 'Ali', 'مفتاح', 'Mohamed', 'الفيتوري', 'Ahmed', 'سالمة', 'Salma', '2015-01-01 00:00:00', 1, 14, 0, 21342342, 2147483647, 'باب بن غشير', 'طرابلس', '925032654', 'الماين', 'دبلوم', 'كمبيوتر', '2016-07-20 00:00:00', 'طرابلس', 23423423, 75, '4234234234', 1, '2015-08-23 21:15:21', '2015-08-23 21:15:21', 1),
(4, 'ابسيبد', 'Fituri', 'محمد', 'Ali', 'مفتاح', 'Mohamed', 'الفيتوري', 'Ahmed', 'سالمة', 'Salma', '2015-01-01 00:00:00', 1, 14, 0, 21342342, 2147483647, 'باب بن غشير', 'طرابلس', '925032654', 'الماين', 'دبلوم', 'كمبيوتر', '2016-07-20 00:00:00', 'طرابلس', 23423423, 75, '4234234234', 1, '2015-08-23 21:15:21', '2015-08-23 21:15:21', 1),
(5, 'احمدثقل', 'Fituri', 'محمد', 'Ali', 'مفتاح', 'Mohamed', 'الفيتوري', 'Ahmed', 'سالمة', 'Salma', '2015-01-01 00:00:00', 1, 14, 0, 21342342, 2147483647, 'باب بن غشير', 'طرابلس', '925032654', 'الماين', 'دبلوم', 'كمبيوتر', '2016-07-20 00:00:00', 'طرابلس', 23423423, 75, '4234234234', 1, '2015-08-23 21:15:21', '2015-08-23 21:15:21', 1);

--
-- Dumping data for table `SubjectHasPrerequisites`
--

INSERT INTO `SubjectHasPrerequisites` (`createdAt`, `updatedAt`, `SubjectId`, `PrerequisiteId`) VALUES
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 4, 1),
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 4, 3);

--
-- Dumping data for table `Subjects`
--

INSERT INTO `Subjects` (`id`, `name`, `name_en`, `code`, `no_th_unit`, `no_th_hour`, `no_pr_unit`, `no_pr_hour`, `chapter_degree`, `final_theor`, `final_practical`, `subject_type`, `system_type`, `status`, `createdAt`, `updatedAt`, `DepartmentId`, `UserId`) VALUES
(1, 'مبادئ الحاسب الآلي', 'Computer Starter', 'cs100', 4, 4, 4, 4, 50, 50, 0, 2, 1, 1, '2015-08-23 19:58:43', '2015-08-23 19:58:43', 2, 1),
(3, 'البرمجة الشيئية', 'Object Oriented', 'cs300', 4, 4, 4, 4, 50, 50, 0, 2, 2, 1, '2015-08-23 19:59:57', '2015-08-23 19:59:57', 2, 1),
(4, 'لغة السي', 'C language', 'CS200', 4, 4, 4, 4, 50, 50, 0, 2, 1, 0, '2015-08-23 20:03:02', '2015-08-23 20:07:16', 2, 1),
(5, 'تراكيب بيانات', 'Data Structures', 'cs302', 4, 4, 4, 4, 40, 60, 0, 2, 2, 1, '2015-08-23 20:10:15', '2015-08-23 20:10:15', 2, 1),
(6, 'رياضة 1', 'Math 1', 'ma200', 4, 4, 4, 4, 50, 50, 0, 1, 1, 1, '2015-08-23 20:13:17', '2015-08-23 20:13:17', 1, 1),
(7, 'انجليزي', ' English', 'en100', 4, 4, 4, 4, 40, 60, 0, 1, 1, 1, '2015-08-23 20:14:42', '2015-08-23 20:14:42', 1, 1),
(8, 'فيزياء جادبية', 'Gravity Physics', 'Ph100', 4, 4, 4, 4, 50, 50, 0, 3, 1, 1, '2015-08-23 20:15:39', '2015-08-23 20:15:39', 3, 1);

--
-- Dumping data for table `Sub_groups`
--

INSERT INTO `Sub_groups` (`id`, `sub_group_name`, `quantity`, `status`, `createdAt`, `updatedAt`, `DivisionId`, `SubjectId`, `LocationId`, `UserId`, `SemesterId`, `FacultyMemberId`) VALUES
(1, 1, 20, 1, '2015-08-23 21:23:02', '2015-08-23 21:23:02', 6, 6, 1, 1, 1, 2);

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `salt`, `phone`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'احمد الفيتوري', 'ahmed.elfituri@gmail.com', 'JA+dUSkF9SqvovwTkas2fB79d5cYRJhrv2NfKndQXxQn2nCH+ElXTiZKOuUKP0N6qTA9kRdqIdyu/McmX5t/Kxtb70Qpz8x6XqPYmV1vOaSwaVj62fH44zNQDQ7RTe4xfuTphSlYkdqMns3zxP+Nwlf86+/HP8NwAkCsIk+wZKQb5tQFMY0wA6SZHkcNcqgQf4v/EgvEFKhX4qzlR8tI3Mzrl2PppxPlpuwK3yNtT6YCRLTgKTWfLL0haQtBOM0Bgq8SA4F68Q2yvjhzHmDJccM/IzPDtYtJ5eXyXy6qIt8XbZcQ2ZtYNaIvCwr5vkDN0eKvOop83SzJL+CNZDSSqA==', '200.R9+bVO7LHvjm9U+moDxu55lIjMgE86SHS/IfLQAcTlk=', '0925032654', 1, '2015-08-23 19:15:03', '2015-08-23 19:15:03'),
(2, 'Ali', 'ahmed.elfituri@gmail.com', '2BqCkz8T8+bObv0v9fy2TqNoHz9peGOSa0Nop9EOo+YIn5sMTSyPOvVrMQKfWVYvTd9z6AAHPJgA2xqA4F8AOGYRtdjt+pye5S7885vuytU9UvsknzRMNCw0LT73EiDozkto304/VMrQhZsOUUS8y19dMkg2Va3hcCw5LrZF4dzrYBereAOHdmfjIlU7ai4/ZteG9EOyArD4ULRYc60xVN4f53fCYbXIOXNDFb/Pi1x97EqR+5eqWp2zwT6+coBlkiaOkz3AWzedwTFgPtWnpd4lb2TXG05iSNIjOUERrHJ+p1MfD4cRP7b5IcelmGHvNzu+zONEem7+y0rGJA5HJA==', '200.PRB6HpPpHyBYZ5+H1hEyaCAaE7NWBIIye0d8c1SE9Ls=', '02552015525', 1, '2015-08-23 19:15:56', '2015-08-23 19:15:56');
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
