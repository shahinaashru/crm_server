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
    origin: [
      "http://localhost:5173",
      "https://shahinaashru.github.io/crm-frontend",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
console.log("Server will run on port:", port);
console.log("Database URL:", dbUrl);
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/cases", caseRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`);
});
