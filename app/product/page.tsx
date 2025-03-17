"use client";

import React from "react";
import Link from "next/link";

export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
          <h1 className="ml-4 text-lg font-medium">Details</h1>
        </div>
        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>
      </header>

      <main className="p-4">
        {/* Product Title */}
        <h1 className="text-xl font-bold uppercase mb-6">
          LIGHTWEIGHT RUNNING - CASUAL SHOES SNEAKERS
        </h1>

        {/* Rating */}
        <div className="flex items-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="gold"
              stroke="gold"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-500">(45 Reviews)</span>
        </div>

        {/* Product Image */}
        <div className="bg-gray-100 p-6 rounded-xl mb-6">
          <img
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Lightweight Running Casual Sneakers"
            className="w-full h-64 object-contain mx-auto"
          />
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 flex items-center">
            Description
            <div className="relative ml-auto flex">
              <div className="w-6 h-6 rounded-full bg-black absolute border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-red-600 ml-4 border-2 border-white"></div>
            </div>
          </h2>
          <p className="text-gray-700 mb-4">
            Shoe Island Player-X Trendy White Lightweight Running Sports Boys
            Men Casual Shoes Sneakers For Men. Classic. Perfection. In-live.
          </p>
          <p className="text-gray-700">
            Flaunt a minimalistic and stylish statement as you adorn this pair
            of sneakers by Shoe Island. Featuring a synthetic upper material
            that ensures comfort and breathability.
          </p>
        </div>

        {/* Product Details */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Product Details</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">Brand</span>
              <span className="font-medium">Shoe Island</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Material</span>
              <span className="font-medium">Synthetic</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Available Sizes</span>
              <span className="font-medium">7, 8, 9, 10</span>
            </li>
          </ul>
        </div>

        {/* Add to Cart Section */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex items-center justify-between shadow-lg border-t">
          <div>
            <span className="text-2xl font-bold">$250.00</span>
          </div>
          <Link href="/cart">
            <button className="bg-red-600 text-white py-3 px-8 rounded-full font-medium flex items-center">
              Add to cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
