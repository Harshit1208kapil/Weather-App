import React, { useRef } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

function Navbar({ setCity }) {
  const inputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    const city = inputRef.current.value.trim(); // Trim whitespace
    if (city) {
      setCity(city); // Update the city
      inputRef.current.value = ''; // Clear input after search
    }
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center text-white sticky z-50">
      <div className="text-xl md:text-2xl font-bold">Weather App</div>
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter City..."
            className="py-2 px-3 md:py-2 md:px-4 rounded-full bg-gray-700 text-white w-40 md:w-64 lg:w-80 focus:outline-none"
          />
          <button type="submit" className="absolute top-2 right-4 text-gray-400 cursor-pointer">
            <FaSearch />
          </button>
        </form>
        <FaBell className="text-lg md:text-xl" />
        <FaUserCircle className="text-xl md:text-2xl" />
      </div>
    </div>
  );
}

export default Navbar;
