"use client";

import React from "react";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="text-red-500 text-2xl mr-3">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default function FeaturesPreview() {
  const features = [
    {
      title: "Product Catalog",
      description:
        "Browse through our extensive collection of products with detailed information.",
      icon: "📦",
    },
    {
      title: "User Authentication",
      description:
        "Secure login and registration system to manage your account and track orders.",
      icon: "🔐",
    },
    {
      title: "Shopping Cart",
      description:
        "Add products to your cart and manage quantities before checkout.",
      icon: "🛒",
    },
    {
      title: "Wishlist",
      description: "Save your favorite items for future purchase.",
      icon: "❤️",
    },
    {
      title: "Order Tracking",
      description: "Track your orders in real-time from purchase to delivery.",
      icon: "📍",
    },
    {
      title: "Payment Integration",
      description: "Secure payment processing with multiple payment options.",
      icon: "💳",
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            App Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Discover what our e-commerce app has to offer
          </p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
