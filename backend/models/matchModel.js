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

export default {
  getProfiles,
  getCommonTagCountByUid,
};
