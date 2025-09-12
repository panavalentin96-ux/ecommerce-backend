import mongoose from "mongoose";
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
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Username sau parola greșită" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Eroare la server" });
  }
}
