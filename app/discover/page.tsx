import DogParkMap from "@/components/DogParkMap";
import React from "react";

const DogParks: React.FC = () => {
    return (
        <div style={{ padding: '1rem' }}>
            <h1>Find Dog Parks Near You</h1>
            <DogParkMap />
        </div>
    );
};

export default DogParks;
