DROP DATABASE matcha_test;
CREATE DATABASE matcha_test;

create extension if not exists cube;
create extension if not exists earthdistance;

CREATE TYPE gender AS ENUM ('man','woman','other');
CREATE TYPE sexual_orientation AS ENUM ('bisexual', 'homosexual', 'heterosexual');

CREATE TABLE IF NOT EXISTS users (
  id bigserial PRIMARY KEY NOT NULL,
  lastname varchar(32) NOT NULL,
  firstname varchar(32) NOT NULL,
  username varchar(32) NOT NULL,
  gender gender DEFAULT NULL,
  sexual_orientation sexual_orientation NOT NULL DEFAULT 'bisexual',
  mail varchar(255) NOT NULL,
  bio varchar(255) DEFAULT NULL,
  password varchar(255) NOT NULL,
  profile_picture_id int,
  geo_lat float DEFAULT NULL,
  geo_long float DEFAULT NULL,
  key varchar(255) DEFAULT 0,
  reset_password_key varchar(255) DEFAULT 0,
  status smallint DEFAULT 0
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

CREATE TABLE IF NOT EXISTS conversations (
id bigserial NOT NULL PRIMARY KEY,
user1 bigint NULL REFERENCES users (id) ON DELETE CASCADE,
user2 bigint NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
id bigserial NOT NULL PRIMARY KEY,
conversation_id bigserial NOT NULL references conversations (id) ON DELETE CASCADE,
sender bigint NOT NULL REFERENCES users (id) ON DELETE CASCADE,
receiver bigint NULL REFERENCES users (id) ON DELETE CASCADE
);

ALTER TABLE users ADD FOREIGN KEY (profile_picture_id) REFERENCES user_photo (id);
ALTER TABLE usertags ADD UNIQUE (uid , tagId); -- TO ENSURE UNIQUENESS OF ALL TAGS PER USER, NO DUPLICATES
ALTER TABLE report ADD UNIQUE (user_id, reported_user_id);
ALTER TABLE block ADD UNIQUE (user_id , blocked_user_id);