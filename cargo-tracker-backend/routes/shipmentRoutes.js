const express = require("express");
const router = express.Router();
const Shipment = require("../models/shipment.js");

// Get all shipments
router.get("/shipments", async (req, res) => {
  const shipments = await Shipment.find();
  res.json(shipments);
});

// Get a single shipment
router.get("/shipment/:id", async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  res.json(shipment);
});

// Create a new shipment
router.post("/shipment", async (req, res) => {
  const newShipment = new Shipment(req.body);
  await newShipment.save();
  res.status(201).json(newShipment);
});

// Update current location
router.post("/shipment/:id/update-location", async (req, res) => {
  const { currentLocation } = req.body;
  const shipment = await Shipment.findByIdAndUpdate(req.params.id, { currentLocation }, { new: true });
  res.json(shipment);
});

// Get ETA for a shipment
router.get("/shipment/:id/eta", async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  res.json({ currentETA: shipment.currentETA });
});

module.exports = router;
