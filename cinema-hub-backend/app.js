const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./util/database");

const app = express();

const port = 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const friendsRoutes = require("./routes/friendsRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const authRoutes = require("./routes/authRoutes");
const triviaRoutes = require("./routes/triviaRoutes");

// Use the routes
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/friends", friendsRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/auth", authRoutes);
app.use("/trivia", triviaRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "An unexpected error occurred";
  res.status(status).json({ message: message });
});

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the Cinema Hub API", status: 200 });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found", status: 404 });
});

// Connect to MongoDB and start the server
connectDB().then(async () => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
