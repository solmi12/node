const mongoose = require("mongoose");

const Carte = mongoose.model(
  "carte",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Carte;
