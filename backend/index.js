import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./api/config/db.config.js";
import userRoutes from "./api/routes/user.routes.js";
import mediaRoutes from "./api/routes/media.routes.js";
import profileRoutes from "./api/routes/profile.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to AmplifyIt API!" });
});

app.use("/api/user",userRoutes );
app.use("/api/media",mediaRoutes );
app.use("/api/profile",profileRoutes );

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
