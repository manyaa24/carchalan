import React from 'react';

const ChallanDisplay = ({ challans, vehicleNumber }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'overdue':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!challans || challans.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Challans Found!</h3>
        <p className="text-gray-600">
          Great news! No traffic violations found for vehicle number <span className="font-semibold">{vehicleNumber}</span>
        </p>
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 text-sm">Keep up the good driving! Always follow traffic rules and stay safe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Challans for Vehicle: <span className="text-blue-600">{vehicleNumber}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{challans.length}</div>
            <div className="text-sm text-blue-700">Total Challans</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {challans.filter(c => c.status.toLowerCase() === 'pending').length}
            </div>
            <div className="text-sm text-yellow-700">Pending</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {challans.filter(c => c.status.toLowerCase() === 'paid').length}
            </div>
            <div className="text-sm text-green-700">Paid</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(challans.filter(c => c.status.toLowerCase() !== 'paid').reduce((sum, c) => sum + c.fineAmount, 0))}
            </div>
            <div className="text-sm text-red-700">Outstanding Amount</div>
          </div>
        </div>
      </div>

      {/* Challan Cards */}
      <div className="space-y-4">
        {challans.map((challan) => (
          <div key={challan.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Challan Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{challan.violationType}</h4>
                  <p className="text-sm text-gray-600">Challan ID: {challan.id}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getStatusStyles(challan.status)}`}>
                  {getStatusIcon(challan.status)}
                  <span>{challan.status}</span>
                </div>
              </div>

              {/* Challan Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Violation Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{challan.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{formatDate(challan.violationDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fine Amount:</span>
                      <span className="font-bold text-red-600">{formatCurrency(challan.fineAmount)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Payment Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">{formatDate(challan.dueDate)}</span>
                    </div>
                    {challan.paymentDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paid On:</span>
                        <span className="font-medium text-green-600">{formatDate(challan.paymentDate)}</span>
                      </div>
                    )}
                    {challan.status.toLowerCase() !== 'paid' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Days to Pay:</span>
                        <span className={`font-medium ${getDaysUntilDue(challan.dueDate) < 0 ? 'text-red-600' : 'text-orange-600'}`}>
                          {getDaysUntilDue(challan.dueDate) < 0 ? 
                            `${Math.abs(getDaysUntilDue(challan.dueDate))} days overdue` : 
                            `${getDaysUntilDue(challan.dueDate)} days left`
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Description</h5>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{challan.description}</p>
              </div>

              {/* Action Buttons */}
              {challan.status.toLowerCase() !== 'paid' && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    Pay Now - {formatCurrency(challan.fineAmount)}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Download Receipt
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Contest Challan
                  </button>
                </div>
              )}

              {challan.status.toLowerCase() === 'paid' && (
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200">
                    Download Receipt
                  </button>
                  <span className="flex items-center text-green-600 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Payment Completed
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallanDisplay;
