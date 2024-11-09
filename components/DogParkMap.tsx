'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Star, Users, Clock } from 'lucide-react';

type DogPark = {
    placeId: string;
    name: string;
    position: { lat: number; lng: number };
    rating?: number;
    vicinity?: string;
    userRatingsTotal?: number;
    openingHours?: {
        isOpen: boolean;
        periods?: google.maps.places.PlaceOpeningHoursPeriod[];
    };
    photos?: google.maps.places.PlacePhoto[];
    reviews?: google.maps.places.PlaceReview[];
};

type Location = {
    lat: number;
    lng: number;
};

const DEFAULT_CENTER = { lat: 38.89511, lng: -77.03637 };
const DEFAULT_ZOOM = 12;

const DogParkMap: React.FC = () => {
    const mapContainerStyle = { width: '100%', height: '700px' };
    const [dogParks, setDogParks] = useState<DogPark[]>([]);
    const [selectedPark, setSelectedPark] = useState<DogPark | null>(null);
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [initialLocationSet, setInitialLocationSet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [parkCount, setParkCount] = useState(0);
    const [markerIcons, setMarkerIcons] = useState<{
        user: google.maps.Symbol | null;
        dogPark: google.maps.Symbol | null;
    }>({ user: null, dogPark: null });

    const mapRef = useRef<google.maps.Map | null>(null);
    const lastFetchPositionRef = useRef<Location | null>(null);
    const searchDebounceRef = useRef<NodeJS.Timeout>();

    const initializeMarkerIcons = useCallback(() => {
        if (window.google) {
            setMarkerIcons({
                user: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#3B82F6',
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2,
                    scale: 8,
                },
                dogPark: {
                    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                    fillColor: '#10B981',
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2,
                    scale: 1.5,
                }
            });
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation && !initialLocationSet) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(location);
                    setInitialLocationSet(true);
                    if (mapRef.current) {
                        mapRef.current.panTo(location);
                    }
                },
                () => {
                    setError('Could not get your location. Using default location.');
                    setInitialLocationSet(true);
                }
            );
        }
    }, [initialLocationSet]);

    const getPlaceDetails = useCallback((placeId: string, map: google.maps.Map): Promise<Partial<DogPark>> => {
        return new Promise((resolve) => {
            const service = new google.maps.places.PlacesService(map);
            service.getDetails(
                {
                    placeId: placeId,
                    fields: ['opening_hours', 'photos', 'reviews']
                },
                (result, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && result) {
                        resolve({
                            openingHours: result.opening_hours,
                            photos: result.photos,
                            reviews: result.reviews
                        });
                    } else {
                        resolve({});
                    }
                }
            );
        });
    }, []);

    const calculateVisibleRadius = useCallback((map: google.maps.Map): number => {
        const bounds = map.getBounds();
        if (!bounds) return 5000;

        const center = map.getCenter();
        if (!center) return 5000;

        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        const R = 6371e3; // Earth's radius in meters
        const φ1 = center.lat() * Math.PI / 180;
        const φ2 = ne.lat() * Math.PI / 180;
        const Δφ = (ne.lat() - center.lat()) * Math.PI / 180;
        const Δλ = (ne.lng() - center.lng()) * Math.PI / 180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }, []);

    const fetchDogParks = useCallback(async (map: google.maps.Map) => {
        const center = map.getCenter();
        if (!center) return;

        const currentPosition = { lat: center.lat(), lng: center.lng() };
        const radius = calculateVisibleRadius(map);

        if (lastFetchPositionRef.current &&
            Math.abs(lastFetchPositionRef.current.lat - currentPosition.lat) < 0.01 &&
            Math.abs(lastFetchPositionRef.current.lng - currentPosition.lng) < 0.01) {
            return;
        }

        setIsLoading(true);
        lastFetchPositionRef.current = currentPosition;

        const request = {
            location: center,
            radius,
            keyword: 'dog park',
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, async (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                const parksWithDetails = await Promise.all(
                    results.map(async (result) => {
                        const details = await getPlaceDetails(result.place_id!, map);
                        return {
                            placeId: result.place_id!,
                            name: result.name!,
                            position: {
                                lat: result.geometry!.location!.lat(),
                                lng: result.geometry!.location!.lng(),
                            },
                            rating: result.rating,
                            vicinity: result.vicinity,
                            userRatingsTotal: result.user_ratings_total,
                            ...details
                        };
                    })
                );
                setDogParks(parksWithDetails);
                setParkCount(parksWithDetails.length);
            } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                setDogParks([]);
                setParkCount(0);
            } else {
                setError('Failed to fetch dog parks. Please try again.');
            }
            setIsLoading(false);
        });
    }, [getPlaceDetails, calculateVisibleRadius]);

    const debouncedFetchDogParks = useCallback((map: google.maps.Map) => {
        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current);
        }
        searchDebounceRef.current = setTimeout(() => fetchDogParks(map), 500);
    }, [fetchDogParks]);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        initializeMarkerIcons();
        if (userLocation && !initialLocationSet) {
            map.panTo(userLocation);
            setInitialLocationSet(true);
        }
        debouncedFetchDogParks(map);
    }, [userLocation, initialLocationSet, debouncedFetchDogParks, initializeMarkerIcons]);

    const centerOnUser = useCallback(() => {
        if (mapRef.current && userLocation) {
            mapRef.current.panTo(userLocation);
            mapRef.current.setZoom(DEFAULT_ZOOM);
        }
    }, [userLocation]);

    const formatOpeningHours = (park: DogPark) => {
        if (!park.openingHours) return 'Hours not available';
        return park.openingHours.isOpen ? 'Open Now' : 'Closed';
    };

    return (
        <div className="space-y-4">
            <Card className="p-4 bg-white shadow-md">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <button
                        onClick={centerOnUser}
                        disabled={!userLocation}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition-colors"
                    >
                        <Navigation className="w-4 h-4" />
                        Center on My Location
                    </button>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <MapPin className="w-4 h-4" />
                        Found {parkCount} dog parks
                        {isLoading && <span className="ml-2">Loading...</span>}
                    </div>
                </div>
                {error && (
                    <div className="mt-2 text-red-500 text-sm">{error}</div>
                )}
            </Card>

            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                libraries={['places']}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={userLocation || DEFAULT_CENTER}
                    zoom={DEFAULT_ZOOM}
                    onLoad={onMapLoad}
                    onIdle={() => mapRef.current && debouncedFetchDogParks(mapRef.current)}
                    options={{
                        styles: [
                            {
                                featureType: 'poi.park',
                                elementType: 'geometry',
                                stylers: [{ color: '#e5f5e0' }]
                            },
                            {
                                featureType: 'water',
                                elementType: 'geometry',
                                stylers: [{ color: '#c9e2f3' }]
                            }
                        ]
                    }}
                >
                    {userLocation && markerIcons.user && (
                        <Marker
                            position={userLocation}
                            icon={markerIcons.user}
                            title="Your Location"
                        />
                    )}

                    {dogParks.map((park) => (
                        <Marker
                            key={park.placeId}
                            position={park.position}
                            onClick={() => setSelectedPark(park)}
                            icon={markerIcons.dogPark || undefined}
                            title={park.name}
                        />
                    ))}

                    {selectedPark && (
                        <InfoWindow
                            position={selectedPark.position}
                            onCloseClick={() => setSelectedPark(null)}
                        >
                            <div className="p-3 max-w-sm">
                                <h4 className="font-bold text-lg mb-2">{selectedPark.name}</h4>
                                {selectedPark.vicinity && (
                                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {selectedPark.vicinity}
                                    </p>
                                )}
                                <div className="flex items-center gap-2 text-sm mb-2">
                                    <Clock className="w-4 h-4 text-gray-600" />
                                    <span>{formatOpeningHours(selectedPark)}</span>
                                </div>
                                {selectedPark.rating && (
                                    <div className="flex items-center gap-2 text-sm mb-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span>{selectedPark.rating}/5</span>
                                        {selectedPark.userRatingsTotal && (
                                            <span className="flex items-center gap-1 text-gray-600">
                                                <Users className="w-4 h-4" />
                                                {selectedPark.userRatingsTotal}
                                            </span>
                                        )}
                                    </div>
                                )}
                                {selectedPark.photos && selectedPark.photos.length > 0 && (
                                    <img
                                        src={selectedPark.photos[0].getUrl()}
                                        alt={selectedPark.name}
                                        className="w-full h-32 object-cover rounded-md mt-2"
                                    />
                                )}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default DogParkMap;