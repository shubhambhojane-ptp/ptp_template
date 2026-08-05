import 'leaflet/dist/leaflet.css';
import { MapContainer,  TileLayer } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import { twMerge } from 'tailwind-merge';

interface MapProps {
  position?: LatLngTuple;
  zoom?: number;
  className?: string;
  popupText?: string;
}

const Map = ({
  position = [19.060, 72.827],
  zoom = 13,
  className = '',
}: MapProps) => {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      className={twMerge('isolate z-0 h-64 w-full overflow-hidden rounded-2xl sm:h-80 md:h-96', className)}
    >
      <TileLayer
        attribution=''
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default Map
