import React, { useState } from 'react';
import Header from './components/Header';
import VehicleInput from './components/VehicleInput';
import ChallanDisplay from './components/ChallanDisplay';
import StatusHistory from './components/StatusHistory';
import { getChallansByVehicleNumber } from './data/mockChallans';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchedVehicle, setSearchedVehicle] = useState('');
  const [challans, setChallans] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const handleVehicleSearch = async (vehicleNumber) => {
    setIsLoading(true);
    setError('');
    setHasSearched(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const foundChallans = getChallansByVehicleNumber(vehicleNumber);
      
      setChallans(foundChallans);
      setSearchedVehicle(vehicleNumber);
      setHasSearched(true);
      console.log(`Searched for vehicle: ${vehicleNumber}, Found: ${foundChallans.length} challans`);

    } catch (err) {
      setError('Failed to fetch challan data. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setChallans([]);
    setSearchedVehicle('');
    setHasSearched(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <VehicleInput 
          onSearch={handleVehicleSearch}
          isLoading={isLoading}
        />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L10 10.414l1.707-1.707a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700 font-medium">Search Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button 
                onClick={() => setError('')}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Searching for Challans...</h3>
              <p className="text-gray-600">Please wait while we fetch the latest information from RTO database.</p>
            </div>
          </div>
        )}

        {hasSearched && !isLoading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
              <button
                onClick={handleNewSearch}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Search</span>
              </button>
            </div>

            <ChallanDisplay 
              challans={challans}
              vehicleNumber={searchedVehicle}
            />

            {challans.length > 0 && (
              <StatusHistory challans={challans} />
            )}
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use Car Chalan Checker</h2>
                <p className="text-gray-600 mb-6">Follow these simple steps to check your vehicle's traffic violations</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Enter Vehicle Number</h3>
                  <p className="text-gray-600 text-sm">Type your vehicle registration number in the format: DL01AB1234</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Search Challans</h3>
                  <p className="text-gray-600 text-sm">Click search to find all traffic violations for your vehicle</p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">View & Pay</h3>
                  <p className="text-gray-600 text-sm">View challan details, payment status, and pay online if needed</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Note:</strong> This is a demo application using mock data. 
                      In production, this would connect to official RTO APIs for real-time challan information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            &copy; 2025 Car Chalan Checker.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;