import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./slices/shipmentSlice";

export default configureStore({
  reducer: {
    shipments: shipmentReducer,
  },
});
