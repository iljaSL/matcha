import pool from '../config/database.js';

const getConversationID = async (senderUid, receiverUid) => {
  if (senderUid === receiverUid) throw new Error('Cant have a conversation with yourself');
  const result = await pool.query(`
    SELECT id
    FROM conversations
    WHERE (user1 = $1 AND user2 = $2)
    OR (user1 = $2 AND user2 = $1)`,
  [senderUid, receiverUid]);
  return result.rows[0];
};

const createConversation = async (senderUid, receiverUid) => {
  if (senderUid === receiverUid) throw new Error('Cant message yourself');
  const result = await pool.query(`
    INSERT INTO conversations (user1, user2)
    SELECT $1, $2
    WHERE NOT EXISTS (SELECT 1
    FROM block
    WHERE (user_id =
           $1 AND blocked_user_id =
           $2)
        OR (user_id =
           $2 AND blocked_user_id =
           $1)
        )
    RETURNING id
    `,
  [senderUid, receiverUid]);
  return result.rows[0];
};

const addMessage = async (conversationId, senderUid, receiverId, message) => {
  await pool.query(`INSERT INTO messages (conversation_id, sender, receiver, message)
                        VALUES ($1, $2, $3, $4)`,
  [conversationId, senderUid, receiverId, message]);
};

const getConversations = async (uid) => {
  const result = await pool.query(`
    SELECT 
           conversations.id,
           user1,
           user2,
           conversations.time_added,
           t1.firstname AS user1_firstname,
           t1.lastname  AS user1_lastname,
           t1.username  AS user1_username,
           t1.profile_picture_id     AS user1_profilepic,
           t2.firstname AS user2_firstname,
           t2.lastname  AS user2_lastname,
           t2.username  AS user2_username,
           t2.profile_picture_id      AS user2_profilepic
    FROM conversations
           JOIN users t1 ON user1 = t1.id
           JOIN users t2 ON user2 = t2.id
    WHERE user1 = $1
       OR user2 = $1
    `, [uid]);
  return result.rows;
};

const getMessages = async (id) => {
  const result = await pool.query(`
    SELECT *
    FROM messages
    WHERE conversation_id = $1
    `, [id]);
  return result.rows;
};

const addLike = async (likerId, likedId) => {
  if (likerId === likedId) throw new Error('Cant like yourself');
  const result = await pool.query(`   
    INSERT INTO likes (user1, user2)
    SELECT $1, $2
    WHERE NOT EXISTS (
      SELECT 1
      FROM block
      WHERE (user_id = $1 AND blocked_user_id = $2)
      OR (user_id = $2 AND blocked_user_id = $1)
    )
    RETURNING id
  `, [likerId, likedId]);

  return result.rows[0];
};

const removeLike = async (likeId) => {
  const result = await pool.query(`
    DELETE FROM likes
        WHERE id = $1;`, [likeId]);
  return result.rows[0];
};

export default {
  getConversationID,
  getConversations,
  getMessages,
  addMessage,
  addLike,
};
