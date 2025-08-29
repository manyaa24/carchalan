import React from 'react';

const StatusHistory = ({ challans }) => {
  const generateTimelineEvents = (challans) => {
    const events = [];

    challans.forEach(challan => {
      events.push({
        id: `violation-${challan.id}`,
        type: 'violation',
        title: challan.violationType,
        description: `Traffic violation at ${challan.location}`,
        date: challan.violationDate,
        challanId: challan.id,
        amount: challan.fineAmount,
        status: 'violation'
      });

      if (challan.paymentDate) {
        events.push({
          id: `payment-${challan.id}`,
          type: 'payment',
          title: 'Payment Completed',
          description: `Fine paid for ${challan.violationType}`,
          date: challan.paymentDate,
          challanId: challan.id,
          amount: challan.fineAmount,
          status: 'paid'
        });
      }

      if (challan.status.toLowerCase() === 'overdue') {
        events.push({
          id: `overdue-${challan.id}`,
          type: 'overdue',
          title: 'Payment Overdue',
          description: `Payment overdue for ${challan.violationType}`,
          date: challan.dueDate,
          challanId: challan.id,
          amount: challan.fineAmount,
          status: 'overdue'
        });
      }
    });

    return events.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'violation':
        return (
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'overdue':
        return (
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return years === 1 ? '1 year ago' : `${years} years ago`;
    }
  };

  if (!challans || challans.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Status History</h3>
        <p className="text-gray-600">Search for a vehicle to view its challan status history.</p>
      </div>
    );
  }

  const timelineEvents = generateTimelineEvents(challans);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Status History</h3>
        <p className="text-gray-600">Timeline of all violations and payments for this vehicle</p>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {timelineEvents.filter(e => e.type === 'violation').length}
          </div>
          <div className="text-sm text-gray-600">Total Violations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {timelineEvents.filter(e => e.type === 'payment').length}
          </div>
          <div className="text-sm text-gray-600">Payments Made</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {timelineEvents.filter(e => e.type === 'overdue').length}
          </div>
          <div className="text-sm text-gray-600">Overdue Items</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="flex items-start space-x-4">
            {/* Timeline Icon */}
            <div className="flex flex-col items-center">
              {getEventIcon(event.type)}
              {index < timelineEvents.length - 1 && (
                <div className="w-px h-8 bg-gray-300 mt-2"></div>
              )}
            </div>

            {/* Event Content */}
            <div className="flex-1 pb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{formatDate(event.date)}</div>
                    <div className="text-xs text-gray-500">{getRelativeTime(event.date)}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Challan ID: {event.challanId}</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(event.amount)}</span>
                </div>

                {/* Status Badge */}
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'paid' 
                      ? 'bg-green-100 text-green-800'
                      : event.status === 'overdue'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Total events: {timelineEvents.length}</span>
          <span>
            Outstanding amount: {formatCurrency(
              challans
                .filter(c => c.status.toLowerCase() !== 'paid')
                .reduce((sum, c) => sum + c.fineAmount, 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusHistory;
