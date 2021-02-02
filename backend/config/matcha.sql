DROP DATABASE matcha;
CREATE DATABASE matcha;

create extension if not exists cube;
create extension if not exists earthdistance;

CREATE TYPE gender AS ENUM ('man','woman','other');
CREATE TYPE sexual_orientation AS ENUM ('androsexual', 'gynesexual', 'pansexual');
CREATE TYPE notification_type AS ENUM ('like', 'visit', 'message', 'match', 'unlike');

CREATE TABLE IF NOT EXISTS users (
  id bigserial PRIMARY KEY NOT NULL,
  lastname varchar(32) NOT NULL,
  firstname varchar(32) NOT NULL,
  username varchar(32) NOT NULL,
  gender gender DEFAULT NULL,
  sexual_orientation sexual_orientation NOT NULL DEFAULT 'pansexual',
  mail varchar(255) NOT NULL,
  bio varchar(255) DEFAULT NULL,
  -- `birthdate` date DEFAULT NULL,
  password varchar(255) NOT NULL,
  -- `city` varchar(255) DEFAULT NULL,
  profile_picture_id int,
  popularity_score int NOT NULL DEFAULT '0',
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
  status smallint DEFAULT 0,
  online smallint NOT NULL DEFAULT 0,
  last_seen TIMESTAMP DEFAULT NULL
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
uid bigint NULL REFERENCES users ( id ) ON DELETE SET NULL,
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
receiver bigint NOT NULL REFERENCES users (id) ON DELETE CASCADE,
message text NOT NULL,
message_read boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS likes (
id bigserial NOT NULL PRIMARY KEY,
time_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
user1 bigint NULL REFERENCES users (id) ON DELETE CASCADE,
user2 bigint NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
id bigserial NOT NULL PRIMARY KEY,
uid bigint NOT NULL REFERENCES users (id) ON DELETE CASCADE,
time_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
event notification_type NOT NULL,
added_by bigint NOT NULL REFERENCES users (id) ON DELETE CASCADE,
notification_read boolean NOT NULL DEFAULT false
);

ALTER TABLE users ADD FOREIGN KEY (profile_picture_id) REFERENCES user_photo (id);
ALTER TABLE usertags ADD UNIQUE (uid, tagId); -- TO ENSURE UNIQUENESS OF ALL TAGS PER USER, NO DUPLICATES
ALTER TABLE report ADD UNIQUE (user_id, reported_user_id);
ALTER TABLE block ADD UNIQUE (user_id , blocked_user_id);
ALTER TABLE conversations ADD UNIQUE (user1, user2);
ALTER TABLE likes ADD UNIQUE (user1, user2);


CREATE OR REPLACE FUNCTION public.notify_like()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE users
        SET popularity_score = popularity_score + 5
        WHERE id = NEW.user2;
    INSERT INTO notifications (uid, event, added_by)
        VALUES (NEW.user2, 'like', NEW.user1);

    INSERT INTO notifications (uid, event, added_by)
        SELECT NEW.user2, 'match', NEW.user1
            WHERE EXISTS (
                SELECT 1 FROM likes WHERE user2 = NEW.user1 AND user1 = NEW.user2
                    );
    INSERT INTO notifications (uid, event, added_by)
        SELECT NEW.user1, 'match', NEW.user2
        WHERE EXISTS (
                      SELECT 1 FROM likes WHERE user2 = NEW.user1 AND user1 = NEW.user2
                    );
    INSERT INTO conversations (user1, user2)
        SELECT NEW.user1, NEW.user2
        WHERE EXISTS (
                      SELECT 1 FROM likes WHERE user2 = NEW.user1 AND user1 = NEW.user2
                    );
    RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_message()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO notifications (uid, event, added_by) VALUES (NEW.receiver, 'message', NEW.sender);
    RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_unlike()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    DELETE FROM notifications WHERE (event = 'match' AND (uid = OLD.user1 AND added_by = OLD.user2) OR (uid = OLD.user2 AND added_by = OLD.user1));
    INSERT INTO notifications (uid, event, added_by) VALUES (OLD.user2, 'unlike', OLD.user1);
    DELETE FROM conversations WHERE (user1 = OLD.user1 AND user2 = OLD.user2) OR (user1 = OLD.user2 AND user2 = OLD.user1);
    RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_notification()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    PERFORM pg_notify('notification', row_to_json(NEW)::text); -- ONLY LISTEN TO NOTIFICATIONS
    RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.block()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    DELETE FROM notifications WHERE (event = 'match' AND (uid = NEW.user_id AND added_by = NEW.blocked_user_id) OR (uid = NEW.blocked_user_id AND added_by = NEW.user_id));
    DELETE FROM conversations WHERE (user1 = NEW.user_id AND user2 = NEW.blocked_user_id) OR (user1 = NEW.blocked_user_id AND user2 = NEW.user_id);
    RETURN NULL;
END;
$function$;



CREATE TRIGGER new_like_trigger AFTER INSERT ON likes -- TRIGGERS AFTER EACH LIKE
    FOR EACH ROW EXECUTE PROCEDURE notify_like();

CREATE TRIGGER new_message_trigger AFTER INSERT ON messages
    FOR EACH ROW EXECUTE PROCEDURE notify_message();

CREATE TRIGGER deleted_like_trigger AFTER DELETE ON likes
    FOR EACH ROW EXECUTE PROCEDURE notify_unlike();

CREATE TRIGGER new_notification_trigger AFTER INSERT ON notifications
    FOR EACH ROW EXECUTE PROCEDURE notify_notification(); -- such a good name...

CREATE TRIGGER new_block_trigger AFTER INSERT ON block
    FOR EACH ROW EXECUTE PROCEDURE block();
