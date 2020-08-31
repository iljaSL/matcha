SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `matcha` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `matcha`;

CREATE TABLE `block` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `blocking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `matches` (
  `id` int(5) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `user_1` int(11) NOT NULL,
  `user_2` int(11) NOT NULL,
  `username_1` varchar(255) NOT NULL,
  `username_2` varchar(255) NOT NULL,
  `last_message` timestamp NULL DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `messages` (
  `id` int(5) NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 NOT NULL,
  `user_id` int(11) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_username` varchar(255) DEFAULT NULL,
  `type` enum('like','message','visit','dislike','like_back') NOT NULL,
  `data` varchar(255) NOT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `isRead` tinyint(4) NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `pictures` (
  `id` int(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `url` longtext NOT NULL,
  `pic_index` int(11) NOT NULL,
  `profile_picture` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reporting_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `value` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `gender` enum('man','woman') DEFAULT NULL,
  `sexual_orientation` enum('bi','homo','hetero') NOT NULL DEFAULT 'bi',
  `mail` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `profile_picture_url` longtext,
  `pop_score` int(11) NOT NULL DEFAULT '0',
  `geo_lat` float DEFAULT NULL,
  `geo_long` float DEFAULT NULL,
  `age_min` int(11) NOT NULL DEFAULT '18',
  `age_max` int(11) NOT NULL DEFAULT '99',
  `distance_max` int(11) NOT NULL DEFAULT '5',
  `pop_min` int(11) NOT NULL DEFAULT '0',
  `pop_max` int(11) NOT NULL DEFAULT '1000',
  `tag_min` int(11) NOT NULL DEFAULT '1',
  `tag_max` int(11) NOT NULL DEFAULT '25',
  `tags` tinyint(1) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `password_key` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `online` tinyint(1) NOT NULL DEFAULT '0',
  `last_connexion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user_tags` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;