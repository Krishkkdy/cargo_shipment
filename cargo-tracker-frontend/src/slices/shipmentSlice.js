import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all shipments from the backend
export const fetchShipments = createAsyncThunk("shipment/fetchAll", async () => {
  const response = await axios.get("http://localhost:5000/api/shipments");
  return response.data;
});

// Add a new shipment
export const addShipment = createAsyncThunk("shipment/add", async (shipmentData) => {
  const response = await axios.post("http://localhost:5000/api/shipment", shipmentData);
  return response.data;
});

// Update shipment location
export const updateShipmentLocation = createAsyncThunk(
  "shipment/updateLocation",
  async ({ id, newLocation }) => {
    const response = await axios.post(`http://localhost:5000/api/shipment/${id}/update-location`, {
      currentLocation: newLocation,
    });
    return response.data;
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: { shipments: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addShipment.fulfilled, (state, action) => {
        state.shipments.push(action.payload);
      })
      .addCase(updateShipmentLocation.fulfilled, (state, action) => {
        const shipment = state.shipments.find((s) => s._id === action.payload._id);
        if (shipment) shipment.currentLocation = action.payload.currentLocation;
      });
  },
});

export default shipmentSlice.reducer;
