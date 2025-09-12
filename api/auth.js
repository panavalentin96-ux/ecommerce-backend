// backend/api/auth.js
import mongoose from "mongoose";
import User from "../models/user.js";

// --- Conectare la MongoDB ---
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
    }
  }
};

// --- Handler pentru Vercel ---
export default async function handler(req, res) {
  await connectDB(); // conectează la MongoDB

  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${method} not allowed` });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Trebuie să trimiți username și password" });
  }

  try {
    const userExists = await User.findOne({ username });

    if (req.url.endsWith("/register")) {
      // --- REGISTER ---
      if (userExists) {
        return res.status(400).json({ message: "User deja există" });
      }

      const newUser = new User({ username, password });
      await newUser.save();

      return res.status(201).json({ message: "User creat cu succes", user: newUser });
    } else if (req.url.endsWith("/login")) {
      // --- LOGIN ---
      if (!userExists || userExists.password !== password) {
        return res.status(401).json({ message: "Username sau parola greșită" });
      }

      return res.status(200).json({ user: userExists });
    } else {
      return res.status(404).json({ message: "Endpoint invalid" });
    }
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ message: "Eroare la server" });
  }
}
