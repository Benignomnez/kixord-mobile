"use client";

import React from "react";
import Link from "next/link";

export default function ShoppingCart() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
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
            <h1 className="ml-2 text-xl font-bold">Shopping Cart</h1>
          </div>
          <div className="relative">
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
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
              2
            </span>
          </div>
        </div>
      </header>

      <main className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Your Items</h2>

          {/* Cart Item 1 */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              alt="Lightweight Running Casual Sneakers"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="ml-4 flex-grow">
              <div className="flex justify-between">
                <h3 className="font-bold">LIGHTWEIGHT RUNNING</h3>
                <button className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 text-sm">
                Size: 8 | Color: White/Navy
              </p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center border rounded-full overflow-hidden">
                  <button className="px-2 py-1 bg-gray-100">-</button>
                  <span className="px-3">1</span>
                  <button className="px-2 py-1 bg-gray-100">+</button>
                </div>
                <span className="font-bold">$250.00</span>
              </div>
            </div>
          </div>

          {/* Cart Item 2 */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex">
            <img
              src="https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              alt="Black Athletic Sneakers"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="ml-4 flex-grow">
              <div className="flex justify-between">
                <h3 className="font-bold">ATHLETIC PERFORMANCE</h3>
                <button className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 text-sm">Size: 9 | Color: Black</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center border rounded-full overflow-hidden">
                  <button className="px-2 py-1 bg-gray-100">-</button>
                  <span className="px-3">1</span>
                  <button className="px-2 py-1 bg-gray-100">+</button>
                </div>
                <span className="font-bold">$180.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-32">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>$430.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>$43.00</span>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>$483.00</span>
            </div>
          </div>
        </div>
      </main>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t">
        <button className="w-full bg-red-600 text-white py-3 rounded-full font-medium">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
