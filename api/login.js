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
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Username sau parola greșită" });
    }

    return res.status(200).json({ message: "✅ Login reușit", user });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({
      message: "Eroare la server",
      error: err.message,  // 🔥 arată cauza reală
      stack: err.stack,    // 🔥 arată exact unde crapă
    });
  }
}
