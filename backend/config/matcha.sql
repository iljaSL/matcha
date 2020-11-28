DROP DATABASE matcha;
CREATE DATABASE matcha;

CREATE TABLE IF NOT EXISTS users (
  id bigserial PRIMARY KEY NOT NULL,
  lastname varchar(32) NOT NULL,
  firstname varchar(32) NOT NULL,
  username varchar(32) UNIQUE NULL,
  -- `gender` enum('man','woman', 'nonbinary') DEFAULT NULL,
  -- `sexual_orientation` enum('bisexual','homosexual','heterosexual') NOT NULL DEFAULT 'bisexual',
  mail varchar(64) UNIQUE NOT NULL,
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
  key varchar(255) DEFAULT 0,
  reset_password_key varchar(255) DEFAULT 0,
  status smallint DEFAULT 0
  -- `online` tinyint(1) NOT NULL DEFAULT '0',
  -- `last_connection` datetime DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS report (
id bigserial NOT NULL PRIMARY KEY,
user_id bigint NOT NULL,
reported_user_id bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
id bigserial NOT NULL PRIMARY KEY,
tag varchar(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS usertags (
id bigserial NOT NULL PRIMARY KEY,
uid bigint NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
tagId bigint NOT NULL REFERENCES tags ( id ) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_photo (
id bigserial NOT NULL PRIMARY KEY,
uid bigint NULL REFERENCES users ( id ) ON DELETE CASCADE,
link text,
details text,
time_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS block (
id  bigserial NOT NULL PRIMARY KEY,
user_id  bigint NULL REFERENCES users (id) ON DELETE CASCADE,
blocked_user_id bigint NULL REFERENCES users (id) ON DELETE CASCADE
);

ALTER TABLE report ADD UNIQUE (user_id , reported_user_id);
ALTER TABLE block ADD UNIQUE (user_id , blocked_user_id);
