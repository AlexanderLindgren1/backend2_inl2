"use client";

import Login from "./component/Login";
import Register from "./component/Register";
import PropertyList from "./component/PropertyList";
import PropertyForm from "./component/PropertyForm";
import { usePropertyContext } from "./context/PropertyContext";
import { useUserContext } from "./context/UserContext";
import Logout from "./component/Logout";
export default function Home() {
  const { selectedProperty } = usePropertyContext();
  const {user, logout} = useUserContext();
  return (
    <div className="min-h-screen bg-gray-50 p-4">
  {
    user ? (
      <>
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <Logout />
        <PropertyList />
        <PropertyForm selectedProperty={selectedProperty} />
      </>
    ) : (
      <>
        <Login />
        <Register />
      </>
    )
  }
</div>

  );
}
