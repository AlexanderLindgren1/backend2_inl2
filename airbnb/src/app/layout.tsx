"use client"
import React from "react";
import { PropertyProvider } from "./context/PropertyContext";

export default function RootLayout({
  children
}: {children: React.ReactNode}){
  return (
    <html>
      <body>
        
        <PropertyProvider>
          {children}
          </PropertyProvider>
      </body>
    </html>
  )
}