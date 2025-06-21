'use client'
import { ChangeEvent, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
export default function Page() {
  const dummyProperties = [
    {
      title: 'Sneh Sadan',
      price: '₹250,000',
      location: 'Countryside',
      thumbnail: '/property_images/prop.jpg'
    },
    {
      title: 'Sant Ekdant',
      price: '₹550,000',
      location: 'City Center',
      thumbnail: '/property_images/prop1.jpg'
    },
    {
      title: 'Swapna Housing',
      price: '₹350,000',
      location: 'Downtown',
      thumbnail: '/property_images/prop2.jpg'
    },
    {
      title: 'Shanti Niketan',
      price: '₹1,200,000',
      location: 'Suburbs',
      thumbnail: '/property_images/prop3.jpg'
    },
    {
      title: 'Rubi',
      price: '₹400,000',
      location: 'Urban Area',
      thumbnail: '/property_images/prop4.jpg'
    },
    {
      title: 'Trinity',
      price: '₹300,000',
      location: 'Near Park',
      thumbnail: '/property_images/prop.jpg'
    },
  ];
  const [properties, setProperties] = useState(dummyProperties);

  function searchChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    if(!event.target.value) {
      setProperties(dummyProperties);
      return;
    };

    const filteredProperties = dummyProperties.filter(property=>{
      return property.title.includes(event.target.value) || property.title.toLowerCase().includes(event.target.value);
    });

    console.log(filteredProperties);
    setProperties(filteredProperties);
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
        }

        .card {
          width: 32%;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
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

    <div className="page-container">
    <main className="content">
      <div className="relative">
        <input  onChange={searchChangeHandler} type="search" className="search-bar mt-4" placeholder="Search properties..."/>
      </div>

        <h1 className="title">Available Properties</h1>

        <div className="cards-container">
        {properties && properties.map(({ title, price, location ,thumbnail}) => (
            <div key={title} className="card">
            <div className="card-image w-full ">
                <Image
                  src={thumbnail}
                  className="object-cover w-full h-full"
                  alt={title}
                  width={500}
                  height={300}
                />
            </div>
            <div className="card-content">
                <div className="title-property">{title}</div>
                <div className="price">{price}</div>
                <div className="location">Location: {location}</div>
                <Link href="/details" className="view-details-btn bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-[8px] w-max transition-colors">View Details</Link>
            </div>
            </div>
        ))}
        { properties.length === 0 && (
          <div className="w-full h-[250px] flex flex-col items-center justify-center text-center">
            <p className="text-gray-500 text-lg font-medium">No properties found</p>
            <p className="text-gray-400 text-sm mt-1">Try looking up something else</p>
          </div>
        )}
        </div>
    </main>
    </div>
    </>
  );
}
