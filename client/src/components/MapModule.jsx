import React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYm90LWdlbWluaSIsImEiOiJjbHRyeHF6eGwwMG5qMnFvM3N4eDk0eHR5In0.YourFallbackToken'; // In reality, use env

const MapModule = ({ cities, onCitySelect, selectedCity }) => {
  const [viewState, setViewState] = React.useState({
    longitude: 40,
    latitude: 20,
    zoom: 1.5
  });

  const cityArray = Object.values(cities).map(c => c[c.length - 1]).filter(Boolean);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden glass relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="bottom-right" />
        
        {cityArray.map((city) => (
          <Marker
            key={city.cityName}
            longitude={city.coordinates.lon}
            latitude={city.coordinates.lat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              onCitySelect(city.cityName);
            }}
          >
            <div className={`cursor-pointer transition-transform duration-300 hover:scale-125 ${
              selectedCity === city.cityName ? 'text-primary scale-125' : 'text-secondary opacity-80'
            }`}>
              <MapPin size={24} fill={selectedCity === city.cityName ? "currentColor" : "none"} />
              {selectedCity === city.cityName && (
                <div className="absolute top-0 left-8 bg-background px-2 py-1 rounded-lg text-[10px] font-bold border border-primary border-opacity-20 shadow-xl whitespace-nowrap">
                  {city.cityName.toUpperCase()}
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>
      
      <div className="absolute bottom-4 left-4 bg-background bg-opacity-80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white border-opacity-10 shadow-lg">
        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Global Heatmap: Live</p>
      </div>
    </div>
  );
};

export default MapModule;
