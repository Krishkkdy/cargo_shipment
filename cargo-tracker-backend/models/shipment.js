const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  containerId: { type: String, required: true },
  route: [{ type: String }], // Array of locations
  currentLocation: { type: String, required: true },
  currentETA: { type: Date },
  status: { type: String, enum: ["In Transit", "Delivered", "Pending"], default: "Pending" },
});

module.exports = mongoose.model("Shipment", ShipmentSchema);
