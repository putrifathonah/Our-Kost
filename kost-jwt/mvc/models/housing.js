const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    nama: {
      type: String,
      required: true,
    },
    lokasi: {
      type: String,
      required: true,
    },
    harga: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    label: {
      type: String,
      required: true,
      enum: ["Kos Putri", "Kos Putra", "Kos Campur"],
    },
    image: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Housing = mongoose.model("Housing", housingSchema);
module.exports = Housing;

