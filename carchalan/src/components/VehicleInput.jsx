import React, { useState } from 'react';

const VehicleInput = ({ onSearch, isLoading }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [error, setError] = useState('');

  const validateVehicleNumber = (number) => {
    const cleanNumber = number.replace(/\s+/g, '').toUpperCase();
    const pattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
    return pattern.test(cleanNumber);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setError('');
    const cleanValue = value.replace(/[^A-Za-z0-9\s]/g, '');
    if (cleanValue.length <= 14) {
      setVehicleNumber(cleanValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!vehicleNumber.trim()) {
      setError('Please enter a vehicle number');
      return;
    }

    if (!validateVehicleNumber(vehicleNumber)) {
      setError('Please enter a valid Indian vehicle number (e.g., DL01AB1234)');
      return;
    }

    setError('');
    onSearch(vehicleNumber.trim());
  };

  const handleQuickSearch = (sampleNumber) => {
    setVehicleNumber(sampleNumber);
    setError('');
    onSearch(sampleNumber);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Vehicle Challans</h2>
        <p className="text-gray-600">Enter your vehicle registration number to check for traffic violations</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={handleInputChange}
              placeholder="e.g., DL 01 AB 1234"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Challans
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-3">Try these sample vehicle numbers:</p>
        <div className="flex flex-wrap gap-2">
          {['DL01AB1234', 'MH02XY5678', 'KA03CD9012'].map((sample) => (
            <button
              key={sample}
              onClick={() => handleQuickSearch(sample)}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 rounded-full transition-colors duration-200"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleInput;
