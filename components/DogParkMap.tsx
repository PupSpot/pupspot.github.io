'use client';
import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

type DogPark = {
    placeId: string;
    name: string;
    position: { lat: number; lng: number };
};

const DogParkMap: React.FC = () => {
    const mapContainerStyle = { width: '100%', height: '600px' };
    const [dogParks, setDogParks] = useState<DogPark[]>([]);
    const [selectedPark, setSelectedPark] = useState<DogPark | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const fetchDogParks = useCallback((map: google.maps.Map) => {
        const request = {
            location: map.getCenter()!,
            radius: 5000,
            keyword: 'dog park',
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                const parks = results.map(result => ({
                    placeId: result.place_id!,
                    name: result.name!,
                    position: {
                        lat: result.geometry!.location!.lat(),
                        lng: result.geometry!.location!.lng(),
                    },
                }));
                setDogParks(parks);
            }
        });
    }, []);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        fetchDogParks(map);
    }, [fetchDogParks]);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={['places']}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: 38.89511, lng: -77.03637 }}
                zoom={12}
                onLoad={onMapLoad}
            >
                {dogParks.map((park) => (
                    <Marker
                        key={park.placeId}
                        position={park.position}
                        onClick={() => setSelectedPark(park)}
                    />
                ))}

                {selectedPark && (
                    <InfoWindow
                        position={selectedPark.position}
                        onCloseClick={() => setSelectedPark(null)}
                    >
                        <div>
                            <h4>{selectedPark.name}</h4>
                            <p>Dog Park</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default DogParkMap;
