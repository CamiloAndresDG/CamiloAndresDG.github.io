import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

const SPAIN_POSITION = [40.4637, -3.7492];
const MADRID_POSITION = [40.4168, -3.7038];

// Fix for default marker icon
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function Map() {
  return (
    <MapContainer 
      center={SPAIN_POSITION} 
      zoom={5} 
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={MADRID_POSITION} icon={defaultIcon}>
        <Popup>
          Madrid, Spain
        </Popup>
      </Marker>
    </MapContainer>
  );
}