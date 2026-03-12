import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

/*
CORS configuration
Allow requests from Vercel frontend
*/

app.use(
  cors({
    origin: "https://ai-chatbot-g2kl.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

connectDB();

/*
Routes
*/

app.use("/api/chat", chatRoutes);

/*
Test route
*/

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});