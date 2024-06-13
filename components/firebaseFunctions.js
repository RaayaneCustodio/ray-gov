// pages/api/registerShareAction.js
import { db } from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, userName, userEmail } = req.body;

    if (!userId || !userName || !userEmail) {
      return res.status(400).json({ error: "User ID, Name, and Email are required" });
    }

    try {
      await db.collection("shares").add({
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        sharedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.status(200).json({ message: "Share action recorded!" });
    } catch (error) {
      console.error("Error recording share action: ", error);
      res.status(500).json({ error: "Error recording share action" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
