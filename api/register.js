import mongoose from "mongoose";
import User from "../models/user.js";

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  await connectDB();

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username și password sunt obligatorii" });
  }

  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "User există deja" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    return res.status(201).json({ message: "✅ User creat cu succes", user: newUser });
  } catch (err) {
    console.error("❌ Register error:", err);
    return res.status(500).json({
      message: "Eroare la server",
      error: err.message, // 🔥 asta îți arată cauza reală
      stack: err.stack,   // 🔥 vezi exact unde crapă
    });
  }
}
