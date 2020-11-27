DROP DATABASE matcha;
CREATE DATABASE matcha;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  lastname varchar(255) NOT NULL,
  firstname varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  -- `gender` enum('man','woman', 'nonbinary') DEFAULT NULL,
  -- `sexual_orientation` enum('bisexual','homosexual','heterosexual') NOT NULL DEFAULT 'bisexual',
  mail varchar(255) NOT NULL,
  -- `bio` varchar(255) DEFAULT NULL,
  -- `birthdate` date DEFAULT NULL,
  password varchar(255) NOT NULL,
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
  key varchar(255) DEFAULT NULL,
  reset_password_key varchar(255) DEFAULT NULL,
   status smallint NOT NULL DEFAULT '0'
  -- `online` tinyint(1) NOT NULL DEFAULT '0',
  -- `last_connection` datetime DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS report (
id SERIAL,
user_id int NOT NULL,
reported_user_id int NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
id SERIAL,
tag varchar(50)
);

CREATE TABLE IF NOT EXISTS usertags (
id SERIAL,
uid int,
tagId int,
FOREIGN KEY (uid) REFERENCES users (id),
FOREIGN KEY (tagId) REFERENCES tags (id)
);

CREATE TABLE IF NOT EXISTS user_photo (
id SERIAL,
uid int,
link text,
details text,
time_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (uid) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS block (
id SERIAL,
user_id int NOT NULL,
blocked_user_id int NOT NULL
);


ALTER TABLE usertags ADD UNIQUE (uid , tagId);-- TO ENSURE UNIQUENESS OF ALL TAGS PER USER, NO DUPLICATES
ALTER TABLE report ADD UNIQUE (user_id , reported_user_id);
ALTER TABLE block ADD UNIQUE (user_id , blocked_user_id);
