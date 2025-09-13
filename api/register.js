// backend/api/register.js
import Cors from "cors";
import User from "../models/user.js";
import connectDB from "../utils/connectDB.js";

// Initialize cors middleware
const cors = Cors({
  origin: "https://ecommerce-frontend-seven-rose.vercel.app", // frontend-ul tău
  methods: ["GET", "POST"]
});

// Helper pentru a folosi middleware-ul cu async/await
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Aplică CORS
  await runMiddleware(req, res, cors);

  // Conectare la MongoDB
  await connectDB();

  // Log ca să vezi ce primește backend-ul
  console.log("Date primite la register:", req.body);

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
