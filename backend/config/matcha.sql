DROP DATABASE matcha;
CREATE DATABASE matcha;

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
  -- `birthdate` date DEFAULT NULL,
  password varchar(255) NOT NULL,
  -- `city` varchar(255) DEFAULT NULL,
  profile_picture_id int,
  -- `pop_score` int(11) NOT NULL DEFAULT '0',
  geo_lat float DEFAULT NULL,
  geo_long float DEFAULT NULL,
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

CREATE TABLE IF NOT EXISTS conversations (
id bigserial NOT NULL PRIMARY KEY,
time_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
user1 bigint NULL REFERENCES users (id) ON DELETE CASCADE,
user2 bigint NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
id bigserial NOT NULL PRIMARY KEY,
conversation_id bigserial NOT NULL references conversations (id) ON DELETE CASCADE,
time_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
sender bigint NOT NULL REFERENCES users (id) ON DELETE CASCADE,
message text NOT NULL
);

CREATE TABLE IF NOT EXISTS likes (
id bigserial NOT NULL PRIMARY KEY,
time_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
user1 bigint NULL REFERENCES users (id) ON DELETE CASCADE,
user2 bigint NULL REFERENCES users (id) ON DELETE CASCADE
);

ALTER TABLE users ADD FOREIGN KEY (profile_picture_id) REFERENCES user_photo (id);
ALTER TABLE usertags ADD UNIQUE (uid , tagId); -- TO ENSURE UNIQUENESS OF ALL TAGS PER USER, NO DUPLICATES
ALTER TABLE report ADD UNIQUE (user_id, reported_user_id);
ALTER TABLE block ADD UNIQUE (user_id , blocked_user_id);
ALTER TABLE conversations ADD UNIQUE (user1, user2);
ALTER TABLE likes ADD UNIQUE (user1, user2);

CREATE OR REPLACE FUNCTION public.notify_like() -- FUNCTION TO NOTIFY LISTENING BACKEND ABOUT A LIKE
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    PERFORM pg_notify('new_like', row_to_json(NEW)::text);
    RETURN NULL;
END;
$function$;

CREATE TRIGGER new_like_trigger AFTER INSERT ON likes -- TRIGGERS AFTER EACH LIKE
    FOR EACH ROW EXECUTE PROCEDURE notify_like();



