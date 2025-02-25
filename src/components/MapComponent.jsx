import React, { useState, useEffect } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const MapComponent = ({ lat, lng }) => {

    let [locations, setLocation] = useState([]);
    
    const searchNearbyPlaces = async (latitude, longitude, type) => {
        const response = await fetch(
            `http://localhost:3000/api/places?lat=${latitude}&lng=${longitude}&type=${type}`
        );
        const data = await response.json();
        console.log(data)
        locations = []
        if (data.results && data.results.length > 0) {
            data.results.map((key, _) => {
                locations.push({
                        location: key.geometry.location,
                        key: key.name
                    }
                )
            }); 
            
            setLocation(locations)
            
        }
        console.log(locations)
        
    };
    
    if (lat && lng) {
        searchNearbyPlaces(lat, lng, 'doctor');
    }

    return (
        <Map
        defaultZoom={13}
        defaultCenter={ { lat, lng } }
        mapId='DEMO_MAP_ID'
    >
    {
        locations.map( poi => {
            {/* console.log(poi) */}
            return (
                <AdvancedMarker
                key={poi.key}
                position={poi.location}>
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            )}
        )
    }
    </Map>
  );
};

export default MapComponent;