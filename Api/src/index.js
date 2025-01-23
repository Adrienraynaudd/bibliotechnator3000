import express from "express";
import dotenv from "dotenv";
import user_route from "./routes/user.js";
import example_route from "./routes/example.js";
import document_route from "./routes/document.js";

dotenv.config();
const app = express();

console.clear();

// Middleware pour le corps des requetes JSON
app.use(express.json());

// Utilisation des routes
app.use("/user", user_route);

// Utilisation des routes
app.use("/documents", document_route);

// Utilisation des routes
app.use("/documents", document_route);

app.listen(process.env.PORT, () => {
//   logger.info(`Server is running on port ${process.env.PORT}`);
  console.log(`Server is running on port ${process.env.PORT}`);
});