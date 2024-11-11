import { db } from "../server.js";

export const pushMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  try {
    await db.query(
      `INSERT INTO messages (name, email, subject, message) 
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject, message]
    );
    res.status(201).json({ message: "Message created successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error creating message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM messages");
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error fetching messages" });
  }
};
