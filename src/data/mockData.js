
// src/data/mockData.js
export const DASHBOARD_STATS = {
  totalSlabs: 240,
  availableSlabs: 180,
  activeOrders: 14,
  pendingOrders: 5,
  newLeads: 22,
  monthlyRevenue: 480000, // in INR
  revenueGrowth: 12,      // %
  topMaterials: [
    { name: "Granite", count: 140 },
    { name: "Quartz", count: 70 },
    { name: "Marble", count: 30 },
  ],
  recentActivity: [
    { type: "order", message: "New order placed for Imperial White", time: "5 mins ago" },
    { type: "slab", message: "Updated stock for Black Galaxy", time: "12 mins ago" },
    { type: "lead", message: "Lead converted: Mr. Arjun Sharma", time: "1 hour ago" },
    { type: "order", message: "Order #SO-1023 marked delivered", time: "3 hours ago" },
  ],
};

export const mockOrders = [
  { id: 1, orderNumber: "SO-1023", customerName: "Rahul Verma", total: 32000, status: "delivered" },
  { id: 2, orderNumber: "SO-1024", customerName: "Neha Kapoor", total: 48000, status: "pending" },
  { id: 3, orderNumber: "SO-1025", customerName: "K. Srinivas", total: 22000, status: "processing" },
  { id: 4, orderNumber: "SO-1026", customerName: "Aravind Designs", total: 69000, status: "delivered" },
];

export const MOCKLEADS = [
  { id: 1, name: "Rohit Jain", interest: "Granite slabs", status: "new" },
  { id: 2, name: "Sunitha Reddy", interest: "Quartz premium series", status: "contacted" },
  { id: 3, name: "Interior Hub", interest: "Bulk granite order", status: "won" },
  { id: 4, name: "Arora Constructions", interest: "Marble alternatives", status: "lost" },
];
