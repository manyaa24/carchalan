export const mockChallansData = [
  {
    id: "CH001",
    vehicleNumber: "DL01AB1234",
    ownerName: "Rajesh Kumar",
    violationType: "Speed Limit Violation",
    fineAmount: 1000,
    location: "Delhi-Gurgaon Highway",
    violationDate: "2024-01-15",
    status: "Pending",
    dueDate: "2024-02-15",
    description: "Vehicle speed recorded at 85 km/h in 60 km/h zone"
  },
  {
    id: "CH002",
    vehicleNumber: "DL01AB1234",
    ownerName: "Rajesh Kumar",
    violationType: "No Parking",
    fineAmount: 500,
    location: "Connaught Place, New Delhi",
    violationDate: "2024-01-10",
    status: "Paid",
    dueDate: "2024-02-10",
    paymentDate: "2024-01-12",
    description: "Vehicle parked in no-parking zone"
  },
  {
    id: "CH003",
    vehicleNumber: "MH02XY5678",
    ownerName: "Priya Sharma",
    violationType: "Red Light Violation",
    fineAmount: 1500,
    location: "Bandra West, Mumbai",
    violationDate: "2024-01-20",
    status: "Pending",
    dueDate: "2024-02-20",
    description: "Vehicle crossed red light signal"
  },
  {
    id: "CH004",
    vehicleNumber: "KA03CD9012",
    ownerName: "Amit Patel",
    violationType: "Helmet Violation",
    fineAmount: 1000,
    location: "MG Road, Bangalore",
    violationDate: "2024-01-18",
    status: "Overdue",
    dueDate: "2024-02-18",
    description: "Motorcycle rider without helmet"
  },
  {
    id: "CH005",
    vehicleNumber: "TN04EF3456",
    ownerName: "Lakshmi Iyer",
    violationType: "Mobile Phone Usage",
    fineAmount: 1000,
    location: "Anna Salai, Chennai",
    violationDate: "2024-01-22",
    status: "Pending",
    dueDate: "2024-02-22",
    description: "Driver using mobile phone while driving"
  },
  {
    id: "CH006",
    vehicleNumber: "DL01AB1234",
    ownerName: "Rajesh Kumar",
    violationType: "Wrong Lane Driving",
    fineAmount: 750,
    location: "Ring Road, Delhi",
    violationDate: "2024-01-08",
    status: "Paid",
    dueDate: "2024-02-08",
    paymentDate: "2024-01-15",
    description: "Vehicle driving in wrong lane"
  },
  {
    id: "CH007",
    vehicleNumber: "GJ05GH7890",
    ownerName: "Kiran Modi",
    violationType: "Seat Belt Violation",
    fineAmount: 500,
    location: "SG Highway, Ahmedabad",
    violationDate: "2024-01-25",
    status: "Pending",
    dueDate: "2024-02-25",
    description: "Driver not wearing seat belt"
  }
];

export const getChallansByVehicleNumber = (vehicleNumber) => {
  if (!vehicleNumber) return [];
  
  const normalizedInput = vehicleNumber.toUpperCase().replace(/\s+/g, '');
  return mockChallansData.filter(challan => 
    challan.vehicleNumber.replace(/\s+/g, '') === normalizedInput
  );
};

export const getChallanStats = (challans) => {
  const stats = {
    total: challans.length,
    pending: 0,
    paid: 0,
    overdue: 0,
    totalFineAmount: 0,
    pendingAmount: 0
  };

  challans.forEach(challan => {
    stats.totalFineAmount += challan.fineAmount;
    
    switch (challan.status.toLowerCase()) {
      case 'pending':
        stats.pending++;
        stats.pendingAmount += challan.fineAmount;
        break;
      case 'paid':
        stats.paid++;
        break;
      case 'overdue':
        stats.overdue++;
        stats.pendingAmount += challan.fineAmount;
        break;
    }
  });

  return stats;
};
