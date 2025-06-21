'use client';

import { useState } from 'react';

const galleryImages = [
  {
    src: '/property_images/modern-apartment.jpg',
    alt: 'Living Room',
  },
  {
    src: '/property_images/family-home.jpg',
    alt: 'Bedroom',
  },
  {
    src: '/property_images/prop4.jpg',
    alt: 'Kitchen',
  },
  {
    src: '/property_images/prop3.jpg',
    alt: 'Garden',
  },
];

export default function PropertyDetails() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const openModal = (src: string) => {
    setModalImg(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="bg-green-100 min-h-screen text-gray-800">
      <header className="bg-green-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">Property Details</h1>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src="/property_images/prop1.jpg"
              alt="Main Property"
              className="rounded-lg w-full"
            />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">Luxury Green Villa</h2>
            <div className="text-xl text-green-700 mb-2">₹250,000</div>
            <div className="italic mb-4">Location: Green Valley, California</div>
            <p className="mb-4">
              Experience serene living in this beautiful green-themed villa. Spacious rooms, lush gardens, and modern amenities await you.
            </p>

            <h3 className="text-lg font-semibold mb-2">Features:</h3>
            <ul className="space-y-2">
              {['3 Bedrooms', '2 Bathrooms', 'Swimming Pool', 'Garden & Patio', 'Garage for 2 Cars'].map((feature) => (
                <li key={feature} className="bg-green-200 px-4 py-2 rounded">{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt}
                onClick={() => openModal(img.src)}
                className="h-full rounded cursor-pointer hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img src={modalImg} alt="Enlarged" className="max-w-4xl w-full rounded-lg" />
        </div>
      )}
    </main>
  );
}
