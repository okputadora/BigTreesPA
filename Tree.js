const mongoose = require("mongoose");
const Tree = new mongoose.Schema({
  Address: { type: String },
  county: { type: String },
  MeasuringCrew: { type: String },
  OriginalNominator: { type: String },
  Comments: { type: String },
  MeausringTechnique: { type: String },
  YearNominated: { type: String },
  YearLastMeasured: { type: String },
  circumference: { type: String },
  spread: { type: String },
  height: { type: String },
  points: { type: String },
  commonName: { type: String },
  genus: { type: String },
  species: { type: String },
  link: { type: String },
  googleAddress: { type: String },
  geometry: {
    location: { lat: { type: Number }, lng: { type: Number } },
    viewport: {
      northeast: { lat: { type: Number }, lng: { type: Number } },
      southwest: { lat: { type: Number }, lng: { type: Number } }
    }
  },
  lat: { type: Number },
  lng: { type: Number }
});

module.exports = mongoose.model("Tree", Tree);
