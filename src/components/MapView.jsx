import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ businesses }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        setUserLocation([31.4705, 74.9029]);
      }
    );
  }, []);

  if (!userLocation) {
    return <p>Loading map...</p>; 
  }

  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>

      {businesses.map((biz) => (
        <Marker key={biz.id} position={[biz.latitude, biz.longitude]}>
          <Popup>
            <strong>{biz.name}</strong><br />
            Category: {biz.category}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
