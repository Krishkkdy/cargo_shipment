const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const shipmentSchema = new mongoose.Schema({
  containerId: String,
  route: [String],
  currentLocation: String,
  eta: String,
  status: String,
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

// Get all shipments
app.get("/api/shipments", async (req, res) => {
  const shipments = await Shipment.find();
  res.json(shipments);
});

// Add a new shipment
app.post("/api/shipment", async (req, res) => {
  const shipment = new Shipment(req.body);
  await shipment.save();
  res.json(shipment);
});

app.get("/api/shipments", async (req, res) => {
  const shipments = await Shipment.find();
  
  // Convert route from string to an array of lat/lng objects
  const updatedShipments = shipments.map((shipment) => ({
    ...shipment,
    route: shipment.route.split("|").map((coord) => {
      const [lat, lng] = coord.split(",");
      return { lat: parseFloat(lat), lng: parseFloat(lng) };
    }),
  }));

  res.json(updatedShipments);
});


// Update shipment location
app.post("/api/shipment/:id/update-location", async (req, res) => {
  const { currentLocation } = req.body;
  const updatedShipment = await Shipment.findByIdAndUpdate(req.params.id, { currentLocation }, { new: true });
  res.json(updatedShipment);
});

app.listen(5000, () => console.log("Server running on port 5000"));
