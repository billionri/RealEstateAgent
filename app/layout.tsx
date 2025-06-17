import Link from "next/link";
import type { Metadata } from 'next'

// These styles apply to every route in the application
import './globals.css'
import Head from "next/head";
import Header from "./components/header";

export const metadata: Metadata = {
  title: 'RealEstateApp',
  description: 'Ge3nerated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#f9fafb]'>
        <Header />
        {children}
      </body>
    </html>
  )
}