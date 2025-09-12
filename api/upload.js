import multer from "multer";
import path from "path";
import fs from "fs";

// Crează folder uploads dacă nu există
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    upload.single("image")(req, res, function (err) {
      if (err) return res.status(500).json({ message: "Upload error", error: err });
      return res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
