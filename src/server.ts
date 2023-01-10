import express from "express";

import dotenv from "dotenv"

dotenv.config()

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Hello from server!"));

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));