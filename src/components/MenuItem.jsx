import React from 'react';

const MenuItem = ({ item, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4">
      {/* Image container with centered image */}
      <div className="w-full flex justify-center mb-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      
      {/* Text content */}
      <div className="text-center w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2">{item.description}</p>
        <p className="text-lg font-bold text-gray-900 mb-4">Rp {item.price.toLocaleString()}</p>
        
        {/* Button container */}
        <button
          onClick={() => addToCart(item)}
          className="w-full bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors"
        >
          Tambahkan ke Pesanan
        </button>
      </div>
    </div>
  );
};

export default MenuItem;