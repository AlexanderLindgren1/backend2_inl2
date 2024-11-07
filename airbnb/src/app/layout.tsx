"use client";
import React from "react";
import "./globals.css";
import { PropertyProvider } from "./context/PropertyContext";
import { UserProvider } from "./context/UserContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <UserProvider>
          <PropertyProvider>{children}</PropertyProvider>
        </UserProvider>
      </body>
    </html>
  );
}
