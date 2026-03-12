import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

/*
Enable CORS so Vercel frontend can call the backend
*/
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

/*
Parse JSON requests
*/
app.use(express.json());

/*
Connect to MongoDB
*/
connectDB();

/*
Chat API route
*/
app.use("/api/chat", chatRoutes);

/*
Health check route
*/
app.get("/", (req, res) => {
  res.send("Server running");
});

/*
Start server
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});