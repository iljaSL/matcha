import pool from '../config/database.js';

const getProfiles = async (uid, distance) => { // should DISTANCE be a column on user table?
  const res = await pool.query(
    `WITH master_user AS (
      SELECT *
      FROM users
      WHERE id = $1
    )

     SELECT *
     FROM users
     WHERE (point((SELECT geo_long FROM master_user), (SELECT geo_lat FROM master_user))
              <@> point(geo_long, geo_lat)) < $2 * 1.609344
       AND id NOT IN (
           SELECT blocked_user_id 
           FROM block 
           WHERE user_id = (SELECT id FROM master_user)
           )
        `, [uid, distance],
  );
  return res.rows;
};

const getCommonTagCountByUid = async (uid) => {
  const res = await pool.query(`WITH master_user_tags AS (
        SELECT tagid
    FROM usertags
    WHERE uid = $1
)

    SELECT COUNT(uid), uid
    FROM usertags
    WHERE tagid IN (SELECT tagid FROM master_user_tags)
    GROUP BY uid`, [uid]);
  return res.rows;
};

const getProfilesByDistance = async (uid, distance, specifiedGender = null) => {
  const genderString = specifiedGender ? `AND users.gender = '${specifiedGender}'` : '';
  const queryString = `WITH master_user_tags AS (
                      SELECT tagid
                  FROM usertags
                  WHERE uid = $1
                ),
                  master_user AS (
                      SELECT *
                      FROM users
                  WHERE id = $1
                )
                
                  SELECT  uid,
                   COUNT(uid) - 1 AS tags_in_common,
                    users.lastname, users.firstname,
                     users.username, users.gender, users.sexual_orientation,
                      users.bio,
                       users.popularity_score,
                        users.geo_lat,
                         users.geo_long,
                          users.profile_picture_id,
                          point((SELECT geo_long FROM master_user), (SELECT geo_lat FROM master_user))
                           <@> point(users.geo_long, users.geo_lat) as distance_in_miles,
                           ( select json_agg(row_to_json(usertags)) 
                           from usertags 
                           left join tags ON tags.id = usertags.tagid 
                           where usertags.uid=users.id) as tags
                  FROM usertags
                  LEFT JOIN users ON users.id = usertags.uid
                  WHERE (point((SELECT geo_long FROM master_user), (SELECT geo_lat FROM master_user))
                <@> point(geo_long, geo_lat)) < $2 * 1.609344
                  AND users.id NOT IN ( SELECT id FROM master_user)
                  AND users.id NOT IN (
                      SELECT blocked_user_id
                  FROM block
                  WHERE user_id = (SELECT id FROM master_user)
                )
                  AND users.id NOT IN (
                        SELECT user_id 
                  FROM block
                  WHERE blocked_user_id = (SELECT id FROM master_user)
                  )
                  ${genderString}
                  GROUP BY uid, users.lastname, users.firstname, users.username, users.gender, users.sexual_orientation, users.bio, users.popularity_score, users.geo_lat, users.geo_long, users.profile_picture_id,
                  users.id
                  ORDER BY tags_in_common DESC, users.popularity_score DESC`;
  const res = await pool.query(queryString, [uid, distance]);
  return res.rows;
};

const getLikedStatus = async (user1, user2) => { // user1 = 'liker' user2 = 'liked'
  const liked = await pool.query(`
        SELECT 1 as liked
        FROM likes
        WHERE (user1 = $1 AND user2 = $2) `, [user1, user2]);
  const matched = await pool.query(`
      SELECT 1 as matched
      FROM notifications
      WHERE (event = 'match') AND (uid = $1 AND added_by = $2)`, [user1, user2]);
  return { liked: liked.rowCount === 1, matched: matched.rowCount === 1 }
};

export default {
  getProfiles,
  getProfilesByDistance,
  getCommonTagCountByUid,
  getLikedStatus,
};
