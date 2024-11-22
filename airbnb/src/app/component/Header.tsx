"use client";
import Link from 'next/link';
import { useUserContext } from "../context/UserContext";

export default function Header() {
  const { user, logout } = useUserContext();

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-rose-500">
          JIUX
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-600">
                Welcome,{" "}
                <Link
                  href="/profile"
                  className="text-rose-500 hover:text-rose-600"
                >
                  {user.name}
                </Link>
              </span>
              <button
                onClick={logout}
                className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/loginRegister"
              className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
