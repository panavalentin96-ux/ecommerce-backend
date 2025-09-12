// backend/api/register.js
import User from "../models/user.js";
import connectDB from "../utils/connectDB.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Trebuie să trimiți username și password" });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "User există deja" });

    const newUser = new User({ username, password });
    await newUser.save();

    return res.status(201).json({ message: "✅ User creat cu succes", user: newUser });
  } catch (err) {
    console.error("❌ Register error:", err);
    return res.status(500).json({ message: "Eroare la server", error: err.message, stack: err.stack });
  }
}
