import pool from '../config/database.js';

const getConversationID = async (senderUid, receiverUid) => {
  const result = await pool.query(`
    SELECT id
    FROM conversations
    WHERE (user1 = $1 AND user2 = $2)
    OR (user1 = $2 AND user2 = $1)`,
  [senderUid, receiverUid]);
  return result.rows[0];
};

const createConversation = async (senderUid, receiverUid) => {
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

const addMessage = async (senderUid, receiverUid, message) => {
  if (senderUid === receiverUid) throw new Error('Cant message yourself');
  const { id } = await getConversationID(senderUid, receiverUid)
  || await createConversation(senderUid, receiverUid) || {};
  if (id === undefined) throw new Error("Can't message blocked user");
  await pool.query(`INSERT INTO messages (conversation_id, sender, message)
                        VALUES ($1, $2, $3)`,
  [id, senderUid, message]);
};

const getConversations = async (uid) => {
  const result = await pool.query(`
        SELECT *
        FROM conversations
        WHERE user1 = $1 OR user2 = $1
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

export default {
  getConversationID,
  getConversations,
  getMessages,
  addMessage,
};
