"use client"
import { useState, useEffect, useRef, useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from "@react-google-maps/api";

interface Location {
  lat: number;
  lng: number;
}

interface DogPark {
  place_id: string;
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  geometry: {
    location: Location;
  };
}

const DogParkMap2 = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [dogParks, setDogParks] = useState<DogPark[]>([]);
  const [selectedPark, setSelectedPark] = useState<DogPark | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for storing timeout id

  // Function to fetch dog parks based on location and search query
  const fetchDogParks = async (lat: number, lng: number, search: string) => {
    const response = await fetch(`/api/fetchDogParks?lat=${lat}&lng=${lng}&search=${search}&limit=5`);
    if (!response.ok) {
      console.error("Error fetching dog parks:", await response.text());
    }
    const data = await response.json();
    setDogParks(data.results);
  };

  useEffect(() => {
    // Get user's current location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  // Handle debouncing logic with `setTimeout` and `useRef`
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the previous timeout
    }
    timeoutRef.current = setTimeout(() => {
      if (location) {
        fetchDogParks(location.lat, location.lng, searchInput);
      }
    }, 500); // Debounce delay of 500ms
  }, [searchInput, location]); // Trigger the effect on searchInput or location change

  // Handle location change from search box
  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng });
      }
    }
  };
  // Memoize the dog park markers to avoid unnecessary re-renders
  const memoizedMarkers = useMemo(() => {
    return dogParks.map((park) => (
      <Marker
        key={park.place_id}
        position={{
          lat: park.geometry.location.lat,
          lng: park.geometry.location.lng,
        }}
        onClick={() => setSelectedPark(park)}
      />
    ));
  }, [dogParks]); 
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places"]}>
      <div className="flex flex-col m-3 gap-3">
        <div className="w-full text-center">
          <Autocomplete onLoad={(autocomplete) => setAutocomplete(autocomplete)} onPlaceChanged={handlePlaceSelect}>
            <input
              type="text"
              placeholder="Where Are We going Today......"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-1/2 p-2 rounded-md border border-gray-300 bg-white text-black"
            />
          </Autocomplete>
        </div>

        <GoogleMap
          center={location || { lat: 37.7749, lng: -122.4194 }} // Default to San Francisco if no location
          zoom={13}
          mapContainerStyle={{ height: "100vh", width: "100%" }}
        >
          {location && <Marker position={location} label="You" />}
          {dogParks.length > 0 &&
            dogParks.map((park) => (
              <Marker
                key={park.place_id}
                position={{
                  lat: park.geometry.location.lat,
                  lng: park.geometry.location.lng,
                }}
                onClick={() => setSelectedPark(park)}
              />
            ))}

          {selectedPark && (
            <InfoWindow
              position={{
                lat: selectedPark.geometry.location.lat,
                lng: selectedPark.geometry.location.lng,
              }}
              onCloseClick={() => setSelectedPark(null)}
            >
              <div>
                <h3>{selectedPark.name}</h3>
                <p>{selectedPark.vicinity}</p>
                <p>Rating: {selectedPark.rating} ({selectedPark.user_ratings_total} reviews)</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default DogParkMap2;
