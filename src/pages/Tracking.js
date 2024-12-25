import React, { useEffect, useState } from 'react';
import vehicleIcon from '../imgs/delivery-truck.png';

const Tracking = () => {
  const [shipmentsData, setShipmentsData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState('');
  
  // Fetch data from the JSON file when the component mounts
  useEffect(() => {
    fetch('http://localhost/adyologistics/src/backend/APIs/shipments.json') // Path to your JSON file
      .then(response => response.json())
      .then(data => {
        setShipmentsData(data);
      })
      .catch(error => console.error('Error loading JSON:', error));
  }, []);

  // Function to handle the search
  const handleSearch = () => {
    const result = shipmentsData.find(
      (shipment) => shipment.tracking_number === inputValue
    );

    if (result) {
      setSearchResult(result);
      initializeMap(result.start, result.current, result.end);
    } else {
      console.log("Shipment not found");
    }
  };

  // Initialize map function
  const initializeMap = (start, current, end) => {
    const mapboxgl = window.mapboxgl;

    mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZXJ2ZG5hbmUiLCJhIjoiY201MDE0OXh3MTlocTJrcjBuaXZjc3p3NyJ9.jOIJ2DC3zZvA80dIxBX-mg'; // Replace with your token

    // Debugging: Check coordinates
    console.log("Start coordinates:", start);
    console.log("Current coordinates:", current);
    console.log("End coordinates:", end);

    // Initialize the map
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: start,  // Use the starting coordinates for the center
      zoom: 5,
    });

    // Function to add markers
    const addMarker = (coordinates, map, iconUrl, size = [40, 40]) => {
      const el = document.createElement('div');
      el.style.backgroundImage = `url(${iconUrl})`;
      el.style.width = `${size[0]}px`;
      el.style.height = `${size[1]}px`;
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';

      new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);
    };

    // Add Start Point Marker (GPS Icon)
    addMarker(start, map, 'https://cdn-icons-png.flaticon.com/512/854/854878.png');

    // Add Current Location Marker (Vehicle Icon)
    addMarker(current, map, vehicleIcon);

    // Add End Point Marker (GPS Icon)
    addMarker(end, map, 'https://cdn-icons-png.flaticon.com/512/854/854878.png');

    // Route Line from Start to Current (Solid Line)
    const routeToCurrent = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [start, current],
      },
    };

    // Route Line from Current to End (Dashed Line)
    const routeToEnd = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [current, end],
      },
    };

    map.on('load', () => {
      // Solid Line (Start to Current)
      map.addSource('routeToCurrent', {
        type: 'geojson',
        data: routeToCurrent,
      });

      map.addLayer({
        id: 'routeToCurrent',
        type: 'line',
        source: 'routeToCurrent',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#1E90FF',
          'line-width': 4,
        },
      });

      // Dashed Line (Current to End)
      map.addSource('routeToEnd', {
        type: 'geojson',
        data: routeToEnd,
      });

      map.addLayer({
        id: 'routeToEnd',
        type: 'line',
        source: 'routeToEnd',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#FF4500',
          'line-width': 4,
          'line-dasharray': [2, 2], // Dashed pattern
        },
      });
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Track Your Shipment</h1>
      {/* Search Bar */}
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg flex p-2">
        <input
          type="text"
          placeholder="Enter Tracking Number"
          className="flex-grow px-3 py-2 rounded-l-lg border-gray-300 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update state as user types
        />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg">
          Search
        </button>
      </div>
      {/* Map Container */}
      <div id="map" className="mt-6 w-full h-[800px]"></div>
    </div>
  );
};

export default Tracking;
