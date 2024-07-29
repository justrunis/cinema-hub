import React from "react";

export default function BackgroundImage({ imageUrl, children }) {
  return (
    <div className="relative flex-1">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="bg-gray-900 bg-opacity-50 h-full w-full"></div>
      </div>
      <div className="container mx-auto p-5 relative z-10">{children}</div>
    </div>
  );
}
