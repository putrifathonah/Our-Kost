var createError = require("http-errors");
var express = require("express"); // ✅ express HARUS ADA
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// 🔹 INIT APP (INI WAJIB SEBELUM app.use)
var app = express(); // ✅ INI YANG TADI ERROR

// Load MongoDB connection
require("./mvc/models/db");

// Routers
var indexRouter = require("./mvc/routes/index");
var housingRouter = require("./mvc/routes/housing");
var authRouter = require("./mvc/routes/auth");

// CORS
app.use(cors());

// View engine setup (optional kalau API only)
app.set("views", path.join(__dirname, "mvc", "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ✅ ROUTES (INI PENTING)
app.use("/api/auth", authRouter);
app.use("/housing", housingRouter);
app.use("/", indexRouter);

// ❌ JANGAN DUPLIKASI ROUTE
// app.use("/", indexRouter); ← jangan 2x
// app.use("/housing", housingRouter); ← jangan 2x

// 404 handler (API VERSION)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Error handler (API VERSION)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
