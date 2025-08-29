import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white text-blue-600 p-3 rounded-full">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h2v2H7V6zm8 0v6h-6V6h6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Car Chalan Checker</h1>
              <p className="text-blue-100 text-sm">Check your traffic violations instantly</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            <a href="#check" className="hover:text-blue-200 transition-colors duration-200">
              Check Challans
            </a>
            <a href="#about" className="hover:text-blue-200 transition-colors duration-200">
              About
            </a>
            <a href="#contact" className="hover:text-blue-200 transition-colors duration-200">
              Contact
            </a>
          </nav>

          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
