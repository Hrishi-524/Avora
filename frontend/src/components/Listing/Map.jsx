import React, { useState, useRef, useEffect } from 'react';
import './Map.css';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiaHJpc2hpLTUyNCIsImEiOiJjbWUzemtncWkwM2g0MmlzYWt4Z3NrbGNxIn0.5fDedRthRBtBUBJJzxqExw';
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_TOKEN });

function Map({listing}) {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN; // ✅ set token before using Mapbox

    geocodingClient
      .forwardGeocode({
        query: `${listing.location}, ${listing.country}`,
        limit: 1,
      })
      .send()
      .then((response) => {
        if (!response.body.features.length) return;

        const coords = response.body.features[0].geometry.coordinates;
        setCenter(coords);

        // ✅ create map only once
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: coords,
          zoom: zoom,
        });

        new mapboxgl.Marker({ color: 'red' })
        .setLngLat(coords)
        .addTo(mapRef.current);
        
        mapRef.current.on('move', () => {
          const mapCenter = mapRef.current.getCenter();
          const mapZoom = mapRef.current.getZoom();
          setCenter([mapCenter.lng, mapCenter.lat]);
          setZoom(mapZoom);
        });
      })
      .catch((err) => console.error('Geocoding error:', err));

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []); // ✅ run only once on mount

  const handleButtonClick = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: center,
        zoom: zoom,
      });
    }
  };

  return (
    <div className="Map-component">
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <div id="map-container" ref={mapContainerRef}></div>
      <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button>
    </div>
  );
}

export default Map;
