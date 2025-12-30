let mongoose = require("mongoose");
let dbURI =
  "mongodb+srv://putrifathonah:putrifathonah18@cluster0.l5akwld.mongodb.net/?appName=Cluster0";

mongoose.connect(dbURI, {
  //useNewURLParser: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected To MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log("Connection Error: " + error);
});

mongoose.connection.on("disconected", () => {
  console.log("Disconnected From MongoDB");
});

// Load models

