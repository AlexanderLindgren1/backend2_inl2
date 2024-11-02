"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./component/Login";
import Register from "./component/Register";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export default function Home() {
  const [property, setProperty] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/property`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  // Render only when data is ready to prevent server/client mismatches
  if (property.length === 0) {
    return <p>Loading properties...</p>;
  }

  return (
    <div>  
      <Register/>
    <Login/>

      <h1>Property</h1>
      <div>
        {property.map((property) => (
          <div key={property.id}>
            <h2>{property.name}</h2>
            <p>Price: ${property.pricePerNight}</p>
            <p>Place: {property.place}</p>
            <p>{property.description}</p>
            <p>Available From: {property?.availableFrom ? "true" : "false"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
