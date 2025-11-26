import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { user, pass } = req.body;

  const filePath = path.join(process.cwd(), "users.txt");

  const line = `${user}:${pass}\n`;

  fs.appendFile(filePath, line, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save" });
    }
    res.json({ success: true });
  });
}
