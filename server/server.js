import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import UserRoutes from "./routes/user.routes.js";
import CharacterRoutes from "./routes/character.routes.js"
// import { faker } from "@faker-js/faker";

const app = express();
app.use(express.json(), cors({
    origin: 'http://localhost:5173'
  }));
app.use('/api', UserRoutes)
app.use('/api', CharacterRoutes)
dotenv.config();
const PORT = process.env.PORT;
dbConnect();
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

