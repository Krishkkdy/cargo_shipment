import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipments, addShipment } from "../slices/shipmentSlice"; // ✅ Import addShipment action


const Dashboard = () => {
  const dispatch = useDispatch();
  const { shipments, loading, error } = useSelector((state) => state.shipments);

  const [showForm, setShowForm] = useState(false);
  const [containerId, setContainerId] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [eta, setEta] = useState("");

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShipment = { containerId, currentLocation, eta };
    dispatch(addShipment(newShipment)); // ✅ Dispatch action to add shipment
    setShowForm(false);
  };

  return (
    <div>
      <h2>Shipment Tracker</h2>

      {/* ✅ Add Shipment Button */}
      <button onClick={() => setShowForm(true)}>Add New Shipment</button>

      {/* ✅ Add Shipment Form (Modal) */}
      {showForm && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <label>Container ID:</label>
            <input type="text" value={containerId} onChange={(e) => setContainerId(e.target.value)} required />

            <label>Current Location:</label>
            <input type="text" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} required />

            <label>ETA:</label>
            <input type="text" value={eta} onChange={(e) => setEta(e.target.value)} />

            <button type="submit">Add Shipment</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {loading && <p>Loading shipments...</p>}
      {error && <p>Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Container ID</th>
            <th>Current Location</th>
            <th>ETA</th>
            <th>Status</th>
            <th>Map</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment._id}>
              <td>{shipment._id}</td>
              <td>{shipment.containerId}</td>
              <td>{shipment.currentLocation}</td>
              <td>{shipment.eta || "N/A"}</td>
              <td>{shipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
