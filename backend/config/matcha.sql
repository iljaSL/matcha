CREATE DATABASE IF NOT EXISTS `matcha` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `matcha`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  -- `gender` enum('man','woman', 'nonbinary') DEFAULT NULL,
  -- `sexual_orientation` enum('bisexual','homosexual','heterosexual') NOT NULL DEFAULT 'bisexual',
  `mail` varchar(255) NOT NULL,
  -- `bio` varchar(255) DEFAULT NULL,
  -- `birthdate` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  -- `city` varchar(255) DEFAULT NULL,
  -- `profile_picture_url` longtext,
  -- `pop_score` int(11) NOT NULL DEFAULT '0',
  -- `geo_lat` float DEFAULT NULL,
  -- `geo_long` float DEFAULT NULL,
  -- `age_min` int(11) NOT NULL DEFAULT '18',
  -- `age_max` int(11) NOT NULL DEFAULT '99',
  -- `distance_max` int(11) NOT NULL DEFAULT '5',
  -- `pop_min` int(11) NOT NULL DEFAULT '0',
  -- `pop_max` int(11) NOT NULL DEFAULT '1000',
  -- `tag_min` int(11) NOT NULL DEFAULT '1',
  -- `tag_max` int(11) NOT NULL DEFAULT '25',
  -- `tags` tinyint(1) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL
  -- `password_key` varchar(255) DEFAULT NULL,
  -- `status` tinyint(1) NOT NULL DEFAULT '0',
  -- `online` tinyint(1) NOT NULL DEFAULT '0',
  -- `last_connection` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `tags` (
`id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
`tag` varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `usertags` (
`id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
`uid` int,
`tagId` int,
FOREIGN KEY (uid) REFERENCES users (id),
FOREIGN KEY (tagId) REFERENCES tags (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `usertags` ADD UNIQUE (`uid` , `tagId`)
