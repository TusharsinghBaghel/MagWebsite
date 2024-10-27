import { db } from "../server.js";

export const pushMagazine = async (req, res) => {
  const formData = req.body;

  const image = req.file ? req.file.buffer : null;

  const newMagazinePost = {
    edition: formData.edition,
    link: formData.link,
    image: image,
    date: formData.date || new Date(),
  };

  try {
    await db.query(
      `INSERT INTO magazine (edition, link, image, date) 
       VALUES ($1, $2, $3, $4)`,
      [
        newMagazinePost.edition,
        newMagazinePost.link,
        newMagazinePost.image,
        newMagazinePost.date,
      ]
    );
    res.status(201).json({ message: "Magazine added successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error adding magazine" });
  }
};

export const getMagazine = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM magazine");
    const magazines = response.rows.map((magazine) => {
      if (magazine.image) {
        const imageBase64 = magazine.image.toString("base64");
        return { ...magazine, image: imageBase64 };
      }
      return magazine;
    });

    res.status(200).json(magazines);
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error fetching magazines" });
  }
};

export const deleteMagazine = async (req, res) => {
  const { id } = req.body;

  try {
    await db.query("DELETE FROM magazine WHERE id = $1", [id]);
    res.status(200).json({ message: "Magazine deleted successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error deleting magazine" });
  }
};
