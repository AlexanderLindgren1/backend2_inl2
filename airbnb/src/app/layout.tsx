"use client";
import React from "react";
import "./globals.css";
import { PropertyProvider } from "./context/PropertyContext";
import { UserProvider } from "./context/UserContext";
import { BookingProvider } from "./context/BookingContext";
import Header from "./component/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <UserProvider>
          <PropertyProvider>
            <BookingProvider>
              <Header/>
              {children}
              </BookingProvider>
          </PropertyProvider>
        </UserProvider>
      </body>
    </html>
  );
}
