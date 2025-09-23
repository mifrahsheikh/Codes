import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ businesses }) => {
  const [userLocation, setUserLocation] = useState(null);
  const defaultLocation = [31.4705, 74.9029];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        setUserLocation(defaultLocation);
      }
    );
  }, []);

  if (!userLocation) {
    return <p>Loading map...</p>;
  }

  const validBusinesses = businesses.filter(
    (b) =>
      b.latitude !== undefined &&
      b.latitude !== null &&
      b.longitude !== undefined &&
      b.longitude !== null
  );

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>

{businesses.map((b) => (
  <Marker key={b.id} position={[b.lat, b.lng]}>
    <Popup>
      <strong>{b.name}</strong><br />
      Category: {b.category}<br />
      Rating: {b.rating ?? "N/A"}<br />
      Distance: {b.distance ? `${b.distance} m` : "N/A"}<br />
      {b.image && <img src={b.image} alt={b.name} className="w-24 h-24 object-cover mt-1"/>}
    </Popup>
  </Marker>
))}
    </MapContainer>
  );
};

export default MapView;