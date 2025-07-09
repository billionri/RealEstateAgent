// 'use client';
import React from 'react';

const BuyForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form data here
  };

  return (
    <>
    <header className="bg-green-600 text-white py-6 text-center">
      <h1 className="text-3xl font-semibold">Add Customer Enquiry</h1>
    </header>
    <div className="w-[80%] md:w-[95%] max-w-3xl mx-auto mt-6 mb-10 bg-white p-6 rounded-lg shadow-md">
      <form className="flex flex-col">
        <label htmlFor="customer_name" className="text-gray-700 mt-2">Customer Name:</label>
        <input
          type="text"
          id="customer_name"
          name="customer_name"
          placeholder="Customer Name"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        
    <label className="text-gray-700" htmlFor="request_type">Request Type:</label>
      <select id="request_type" name="request_type" required
      className="p-3 mt-1 mb-4 border border-gray-300 rounded-md">
        <option value="">-- Select Type --</option>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
        <option value="rent">Rent</option>
      </select>

        <label htmlFor="phone" className="text-gray-700">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Customer Phone Number"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="property_type" className="text-gray-700">Select Property:</label>
        <select
          id="property_type"
          name="property_type"
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        >
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="townhouse">Townhouse</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>

        <label htmlFor="location" className="text-gray-700">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="City, State, or Zip Code"
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />
          

        <label htmlFor="comments" className="text-gray-700">Additional Comments:</label>
        <textarea
          id="comments"
          name="comments"
          rows={4}
          placeholder="Any specific requirements?"
          className="p-3 mt-1 mb-6 border border-gray-300 rounded-md"
        ></textarea>

        <input
          type="submit"
          value="Submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md cursor-pointer transition-colors duration-300"
        />
      </form>
    </div>
  </>
  );
};

export default BuyForm;
