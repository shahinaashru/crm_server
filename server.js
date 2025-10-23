const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/middlewares/errorHandler.js");
const userRoutes = require("./src/routes/userRoutes.js");
const customerRoutes = require("./src/routes/customerRoutes.js");
const caseRoutes = require("./src/routes/caseRoutes.js");
const connectDB = require("./config/db.js");
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL;
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://shahinaashru.github.io"],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://shahinaashru.github.io"],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
console.log("Server will run on port:", port);
console.log("Database URL:", dbUrl);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("CRM API is running successfully with CORS enabled!");
});
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/cases", caseRoutes);
app.use(errorHandler);
module.exports = app;
// app.listen(port, () => {
//   console.log(`Example app listening on port localhost:${port}`);
// });
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running locally at http://localhost:${port}`);
  });
}
