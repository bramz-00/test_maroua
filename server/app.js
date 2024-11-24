const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const { sequelize } = require("./models");
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/users");
const todoRoutes = require("./routes/todos");
const categoryRoutes = require("./routes/categories");

const app = express();
const PORT = 5000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Origine autorisée (Frontend)
  credentials: true, // Autorise les cookies et les en-têtes sécurisés
}));

app.use(bodyParser.json());
app.use(cookieParser()); // To parse cookies
// Define routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
app.use("/categories", categoryRoutes);

// Start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
