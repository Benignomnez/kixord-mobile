"use client";

import Link from "next/link";

export default function SyntheticV0PageForDeployment() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-inspired Header */}
      <header className="bg-black text-white p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tighter">SHOP</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-gray-800">
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
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <Link
              href="/cart"
              className="p-2 rounded-full bg-gray-800 relative"
            >
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
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold">
                2
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Category Pills */}
        <div className="p-4 flex gap-2 overflow-x-auto scrollbar-hide">
          <button className="px-4 py-2 rounded-full bg-black text-white whitespace-nowrap">
            Run
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 whitespace-nowrap">
            Athletic
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 whitespace-nowrap">
            Hot Deals
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 whitespace-nowrap">
            Exclusive
          </button>
        </div>

        {/* Featured Hero Section - Similar to the red background in image */}
        <section className="bg-red-600 p-6 mb-6 md:mx-4 md:rounded-2xl">
          <div className="md:flex md:items-center md:gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4 uppercase md:text-5xl">
                ELEVATE YOUR LOOK WITH A FRESH, NEW STYLE
              </h2>
              <button className="mt-4 px-6 py-3 bg-white text-black rounded-full font-semibold flex items-center gap-2">
                GET STARTED
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Stylish white and black sneakers"
                className="w-full object-contain rounded-lg transform -rotate-12"
              />
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="px-4 mb-8">
          <h2 className="text-xl font-bold mb-4">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Card 1 */}
            <Link
              href="/product"
              className="bg-white rounded-xl overflow-hidden shadow-md block"
            >
              <div className="relative">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  New
                </span>
                <button
                  className="absolute top-2 right-2 p-1 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <img
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Lightweight Running Casual Sneakers"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg uppercase">
                  LIGHTWEIGHT RUNNING
                </h3>
                <p className="text-gray-600 text-sm">CASUAL SNEAKERS SHOE</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-xl">$250.00</span>
                  <span className="text-gray-500 text-sm">
                    MAN SNEAKERS - 7,8
                  </span>
                </div>
              </div>
            </Link>

            {/* Product Card 2 */}
            <Link
              href="/product"
              className="bg-white rounded-xl overflow-hidden shadow-md block"
            >
              <div className="relative">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  New
                </span>
                <button
                  className="absolute top-2 right-2 p-1 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <img
                  src="https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Black Athletic Sneakers"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg uppercase">
                  ATHLETIC PERFORMANCE
                </h3>
                <p className="text-gray-600 text-sm">BLACK SPORTS SHOE</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-xl">$180.00</span>
                  <span className="text-gray-500 text-sm">
                    MAN SNEAKERS - 8,9
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Product Detail Preview */}
        <section className="px-4 my-8 hidden md:block">
          <h2 className="text-xl font-bold mb-4">Featured Product</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="bg-gray-100 p-4 rounded-xl">
                  <img
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt="Lightweight Running Casual Sneakers Detail"
                    className="w-full object-contain"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold uppercase">
                  LIGHTWEIGHT RUNNING - CASUAL SHOES SNEAKERS
                </h3>
                <div className="flex items-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="gold"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    (45 Reviews)
                  </span>
                </div>

                <h4 className="font-bold mt-4">Description</h4>
                <p className="text-gray-600 my-2">
                  Shoe Island Player-X Trendy White Lightweight Running Sports
                  Boys Men Casual Shoes Sneakers For Men. Classic. Perfection.
                  In-live.
                </p>

                <p className="text-gray-600 my-2">
                  Flaunt a minimalistic and stylish statement as you adorn this
                  pair of sneakers by Shoe Island. Featuring a synthetic upper
                  material that ensures comfort and breathability.
                </p>

                <div className="mt-6 flex">
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 rounded-full bg-black border-2 border-gray-200"></div>
                    <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-gray-200"></div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <span className="text-2xl font-bold">$250.00</span>
                  <Link href="/product">
                    <button className="px-6 py-3 bg-red-600 text-white rounded-full font-medium">
                      Add to cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Kixord</h2>
              <p className="text-gray-300">
                Your trusted e-commerce platform for all your shopping needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">support@kixord.com</p>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} Kixord. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
