"use client";

import PropertyList from "./component/PropertyList";
import { useEffect, useState } from "react";

export default function Home() {
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setReloadKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PropertyList key={reloadKey} />
      </div>
    </div>
  );
}
