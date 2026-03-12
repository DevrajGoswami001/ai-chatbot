import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./db.js";
import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Chat API
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});