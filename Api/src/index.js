const express = require("express");
const dotenv = require("dotenv");
const user_route = require("./routes/user.js");
const document_route = require("./routes/document.js");


dotenv.config();
const app = express();

console.clear();

// Middleware pour le corps des requetes JSON
app.use(express.json());

// Utilisation des routes
app.use("/user", user_route);

// Utilisation des routes
app.use("/documents", document_route);


app.listen(process.env.PORT, () => {
//   logger.info(`Server is running on port ${process.env.PORT}`);
  console.log(`Server is running on port ${process.env.PORT}`);
});


