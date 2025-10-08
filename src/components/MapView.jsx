import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const MapView = ({ businesses }) => {
  const [userLocation, setUserLocation] = useState(null);
  const defaultLocation = [31.4705, 74.9029];
  const navigate = useNavigate();

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

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      className="h-full w-full rounded-lg"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>

      {businesses
        .filter((b) => String(b.id).startsWith("db_"))
        .map((b) => (
          <Marker key={b.id} position={[Number(b.lat), Number(b.lng)]}>
            <Popup>
              <div className="flex flex-col items-center gap-2 w-56">
                {b.image && (
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <strong>{b.name}</strong>
                <p>Category: {b.category}</p>
                <p>⭐ {b.rating ?? "N/A"}</p>
                <button
                  onClick={() =>
                    navigate(`/category/${b.category}`, { state: { selectedId: b.id } })
                  }
                  className="mt-2 px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  View in {b.category}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

      {businesses
        .filter((b) => !String(b.id).startsWith("db_"))
        .map((b, idx) => (
          <Marker key={`api-${idx}`} position={[Number(b.lat), Number(b.lng)]}>
            <Popup>
              <div className="flex flex-col items-center gap-2 w-56">
                <strong className="text-blue-600">{b.name}</strong>
                <p>Category: {b.category}</p>
                <p>Distance: {b.distance ? `${b.distance} m` : "N/A"}</p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapView;