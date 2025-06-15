'use client'

import Link from "next/link";
import { log } from "node:console";
import { EventEmitter } from "node:stream";
import { SyntheticModule } from "node:vm";
import { ChangeEvent, useEffect, useState } from "react";

export default function Page() {
  const listings = [
    {
      title: 'Cozy Cottage',
      price: '$250,000',
      location: 'Countryside',
    },
    {
      title: 'Luxury Apartment',
      price: '$550,000',
      location: 'City Center',
    },
    {
      title: '3 Bedroom House',
      price: '$350,000',
      location: 'Downtown',
    },
    {
      title: 'Spacious Villa',
      price: '$1,200,000',
      location: 'Suburbs',
    },
    {
      title: 'Modern Townhouse',
      price: '$400,000',
      location: 'Urban Area',
    },
    {
      title: 'Charming Apartment',
      price: '$300,000',
      location: 'Near Park',
    },
  ];
  const [properties, setProperties] = useState(listings);
  const [recommendations,setRecommendations] = useState<String[] | null>(null);

  function searchChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    if(!event.target.value) {
      setRecommendations(null);
      return;
    };

    const filteredProperties = properties.filter(property=>{
      return property.title.includes(event.target.value) || property.title.toLowerCase().includes(event.target.value);
    });

    console.log(filteredProperties);
    setRecommendations(filteredProperties.map(item=>item.title));
  } 

  function searchClickHandler(event): void {
    const selectedProperty = properties.filter(item=> item.title === event.target.textContent);
    console.log(selectedProperty);
    
    setProperties(selectedProperty);
  }

  return (
    <>
      <style jsx>{`
        /* Custom Styles */
        .page-container {
          max-width: 1265px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          font-family: 'Roboto', sans-serif;
          color: #374151; /* Darker gray for text */
        }

        .header {
          width: 100%;
          height: 64px;
          background-color: #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          left: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          z-index: 10;
        }

        .header-title {
          font-weight: 700;
          font-size: 24px;
          color: #111827; /* Almost black */
        }

        .nav-links {
          display: flex;
          gap: 24px;
          font-weight: 500;
          color: #10b981; /* Emerald green */
          cursor: pointer;
          font-size: 16px;
          user-select: none;
          transition: color 0.3s ease;
        }

        .nav-links:hover {
          color: #047857; /* Darker emerald */
        }

        .content {
          width: 100%;
          padding: 0 24px;
        }

        .search-bar {
          width: 100%;
          max-width: 1217px;
          height: 50px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          display: flex;
          align-items: center;
          padding-left: 16px;
          color: #9ca3af;
          font-size: 16px;
          margin-bottom: 24px;
          box-sizing: border-box;
          user-select: none;
        }

        .title {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 24px;
          max-width: 1217px;
        }

        .cards-container {
          max-width: 1217px;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: space-between;
        }

        .card {
          width: 32%;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: box-shadow 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          height: 160px;
          background: linear-gradient(90deg, #e5e7eb, #9ca3af); /* subtle gradient */
          position: relative;
        }

        .image-placeholder {
          position: absolute;
          width: 233px;
          height: 25px;
          background: #6b7280;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 4px;
        }

        .card-content {
          padding: 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .price {
          font-size: 16px;
          font-weight: 400;
          color: #4b5563;
          margin-bottom: 4px;
        }

        .location {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .title-property {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }

        .view-details-btn {
          width: 120px;
          height: 40px;
          background-color: #10b981;
          border-radius: 6px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          line-height: 40px;
          user-select: none;
          transition: background-color 0.3s ease;
        }

        .view-details-btn:hover {
          background-color: #059669;
        }
      `}</style>

   <header className="header">
        <div className="header-title">Real Estate Agent</div>
        <nav className="nav-links">
            <Link href="/buy">Buy</Link>
            <Link href="/sell">Sell</Link>
            <Link href="/rent">Rent</Link>
            {/* <Link href="/profile">Profile</Link> */}
            <Link href="/login">Login</Link>
        </nav>
    </header>

    <div className="page-container">
    <main className="content">
      <div className="relative">
        <input  onChange={searchChangeHandler} type="search" className="search-bar mt-4" placeholder="Search properties..."/>

        {recommendations && recommendations.length > 0 &&
         <ul className="absolute top-full left-0 w-full bg-white  border-[1px] border-[#d1d5db] z-[9] shadow-[0px_3px_5px_0px_#0000006b]">
            {recommendations.map((item,index)=>{
              

              return (<li className="first-of-type:border-t-0 last-of-type:border-b-0 border-t-[1px]" key={index}>
                <button onClick={searchClickHandler} className="w-full text-left px-4 py-1 cursor-pointer">{item}</button>
              </li>)
            })}
          </ul>
        }
      </div>

        <h1 className="title">Available Properties</h1>

        <div className="cards-container">
        {listings.map(({ title, price, location }) => (
            <div key={title} className="card">
            <div className="card-image">
                <div className="image-placeholder" />
            </div>
            <div className="card-content">
                <div className="title-property">{title}</div>
                <div className="price">{price}</div>
                <div className="location">Location: {location}</div>
                <div className="view-details-btn">View Details</div>
            </div>
            </div>
        ))}
        </div>
    </main>
    </div>
    </>
  );
}
