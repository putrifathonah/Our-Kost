let mongoose = require("mongoose");
// membaca file .env
require("dotenv").config();

// ambil dari .env
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
    // useNewURLParser: true
});

// pemberian informasi status koneksi
mongoose.connection.on("connected", () => {
    console.log("Connected To MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log("Connection Error: " + error);
});

mongoose.connection.on("disconected", () => {
    console.log("Disconnected From MongoDB");
});