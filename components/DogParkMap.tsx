'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    MapPin,
    Navigation,
    Star,
    Users,
    Clock,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Filter
} from 'lucide-react';
import { Modal, ModalBody, ModalContent, ModalTrigger } from './ui/animated-modal';
import ReactDOM from 'react-dom';


interface ModalPortalProps {
    children: React.ReactNode;
}
const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
    return ReactDOM.createPortal(
            <div className="modal-overlay">
                <div className="modal-content">
                    {children}
                </div>
            </div>,
        document.body // This renders the modal at the root of the document
    );
};

type DogPark = {
    placeId: string;
    name: string;
    position: { lat: number; lng: number };
    rating?: number;
    vicinity?: string;
    userRatingsTotal?: number;
    openingHours?: {
        isOpen: boolean | undefined;
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
const RESULTS_PER_PAGE = 30;

const DogParkMap: React.FC = () => {
    const mapContainerStyle = { width: '100%', height: '700px' };
    const [dogParks, setDogParks] = useState<DogPark[]>([]);
    const [displayedParks, setDisplayedParks] = useState<DogPark[]>([]);
    const [selectedPark, setSelectedPark] = useState<DogPark | null>(null);
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [initialLocationSet, setInitialLocationSet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterRating, setFilterRating] = useState(0);
    const [markerIcons, setMarkerIcons] = useState<{
        user: google.maps.Symbol | null;
        dogPark: google.maps.Symbol | null;
    }>({ user: null, dogPark: null });


    //this is for modal
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    const mapRef = useRef<google.maps.Map | null>(null);
    const lastFetchPositionRef = useRef<Location | null>(null);
    const searchDebounceRef = useRef<NodeJS.Timeout>();

    const totalPages = Math.ceil(dogParks.length / RESULTS_PER_PAGE);

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

    useEffect(() => {
        const filtered = dogParks.filter(park => !filterRating || (park.rating || 0) >= filterRating);
        const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
        const endIndex = startIndex + RESULTS_PER_PAGE;
        setDisplayedParks(filtered.slice(startIndex, endIndex));
    }, [currentPage, dogParks, filterRating]);

    const getPlaceDetails = useCallback(async (placeId: string, map: google.maps.Map): Promise<Partial<DogPark>> => {
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
                            openingHours: result.opening_hours ? { isOpen: result.opening_hours.isOpen() ?? false, periods: result.opening_hours.periods } : undefined,
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
        const R = 6371e3;
        const φ1 = center.lat() * Math.PI / 180;
        const φ2 = ne.lat() * Math.PI / 180;
        const Δφ = (ne.lat() - center.lat()) * Math.PI / 180;
        const Δλ = (ne.lng() - center.lng()) * Math.PI / 180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return Math.min(R * c, 50000); // Cap at 50km
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

        const service = new google.maps.places.PlacesService(map);
        const allResults: google.maps.places.PlaceResult[] = [];

        const searchInRadius = (token?: string): Promise<void> => {
            return new Promise((resolve) => {
                const request: google.maps.places.PlaceSearchRequest = {
                    location: center,
                    radius,
                    keyword: 'dog park',
                    ...(token && { pageToken: token })
                };

                service.nearbySearch(request, async (results, status, pagination) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        allResults.push(...results);

                        if (pagination && pagination.hasNextPage && allResults.length < 60) {
                            setTimeout(() => {
                                pagination.nextPage();
                                resolve();
                            }, 2000);
                        } else {
                            resolve();
                        }
                    } else {
                        resolve();
                    }
                });
            });
        };

        try {
            await searchInRadius();

            const parksWithDetails = await Promise.all(
                allResults.map(async (result) => {
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
            setCurrentPage(1);
        } catch (err) {
            setError('Failed to fetch dog parks. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
                    <div className="flex gap-2">
                        <Button
                            onClick={centerOnUser}
                            disabled={!userLocation}
                            className="flex items-center gap-2"
                            variant="default"
                        >
                            <Navigation className="w-4 h-4" />
                            Center on My Location
                        </Button>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-md px-4 py-2">
                            <Filter className="w-4 h-4 text-gray-600" />
                            <select
                                value={filterRating}
                                onChange={(e) => setFilterRating(Number(e.target.value))}
                                className="bg-transparent border-none focus:outline-none"
                            >
                                <option value={0}>All Ratings</option>
                                <option value={4}>4+ Stars</option>
                                <option value={4.5}>4.5+ Stars</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <MapPin className="w-4 h-4" />
                            Found {dogParks.length} dog parks
                            {isLoading && (
                                <Loader2 className="w-4 h-4 animate-spin ml-2" />
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-sm font-medium">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
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
                            },
                            {
                                featureType: 'landscape',
                                elementType: 'geometry',
                                stylers: [{ color: '#f5f5f5' }]
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

                    {displayedParks.map((park) => (
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
                                    <span className={`${selectedPark.openingHours?.isOpen ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                        {formatOpeningHours(selectedPark)}
                                    </span>
                                </div>
                                {selectedPark.rating && (
                                    <div className="flex items-center gap-2 text-sm mb-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="font-medium">{selectedPark.rating.toFixed(1)}/5</span>
                                        {selectedPark.userRatingsTotal && (
                                            <span className="flex items-center gap-1 text-gray-600">
                                                <Users className="w-4 h-4" />
                                                {selectedPark.userRatingsTotal.toLocaleString()} reviews
                                            </span>
                                        )}
                                    </div>
                                )}
                                {selectedPark.photos && selectedPark.photos.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        <img
                                            src={selectedPark.photos[0].getUrl()}
                                            alt={selectedPark.name}
                                            className="w-full h-32 object-cover rounded-md shadow-sm"
                                        />
                                    </div>
                                )}
                                {selectedPark.reviews && selectedPark.reviews.length > 0 && (
                                    <button onClick={openModal}>Click To View The Reviews</button>
                                )}
                                {mapRef.current && (
                                    <div className="mt-3">
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPark.position.lat},${selectedPark.position.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm transition-colors"
                                        >
                                            Get Directions
                                        </a>
                                    </div>
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