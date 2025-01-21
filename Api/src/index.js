import express from "express";
import dotenv from "dotenv";
import example_route from "./routes/example.js";

dotenv.config();
const app = express();

console.clear();

// Middleware pour le corps des requetes JSON
app.use(express.json());

// Utilisation des routes
app.use("/example", example_route);

// Utilisation des routes
app.use("/documents", example_route);

app.listen(process.env.PORT, () => {
//   logger.info(`Server is running on port ${process.env.PORT}`);
  console.log(`Server is running on port ${process.env.PORT}`);
});