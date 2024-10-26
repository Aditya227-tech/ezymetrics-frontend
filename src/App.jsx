// App.jsx
import './App.css';
import React, { useState } from 'react';
import {
  BarChart as ReChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line
} from 'recharts';

// Sample data
const performanceData = [
  { month: 'Jan', leads: 65, conversions: 40 },
  { month: 'Feb', leads: 59, conversions: 35 },
  { month: 'Mar', leads: 80, conversions: 55 },
  { month: 'Apr', leads: 81, conversions: 60 },
  { month: 'May', leads: 56, conversions: 45 },
  { month: 'Jun', leads: 55, conversions: 42 }
];

const leadData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New', source: 'Website' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted', source: 'LinkedIn' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Qualified', source: 'Referral' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Converted', source: 'Website' },
];

// Custom Alert component since we don't have access to shadcn/ui
const Alert = ({ children, onClose }) => (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
    {children}
    {onClose && (
      <button onClick={onClose} className="absolute top-0 right-0 px-4 py-3">
        <span className="text-2xl">&times;</span>
      </button>
    )}
  </div>
);

export default function App() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAlert, setShowAlert] = useState(false);

  const handleExport = (format) => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Simplified menu items without Lucide icons
  const menuItems = [
    { label: '📊 Dashboard', id: 'dashboard' },
    { label: '📈 Leads', id: 'leads' },
    { label: '📊 Analytics', id: 'analytics' },
    { label: '📑 Reports', id: 'reports' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed h-full bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">EzyMetrics</h1>
        </div>
        <nav className="flex-1 p-4">
          {menuItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${
                activeSection === id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-8">
        {showAlert && (
          <Alert onClose={() => setShowAlert(false)}>
            Report exported successfully!
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Total Leads</h3>
            <p className="text-3xl font-bold text-blue-600">247</p>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-green-600">68%</p>
            <p className="text-sm text-gray-500">+5% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Average Response Time</h3>
            <p className="text-3xl font-bold text-purple-600">2.4h</p>
            <p className="text-sm text-gray-500">-0.5h from last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Lead Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#2563eb" />
                  <Line type="monotone" dataKey="conversions" stroke="#16a34a" />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ReChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#2563eb" />
                </ReChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Leads</h3>
              <div className="space-x-2">
                <button
                  onClick={() => handleExport('pdf')}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Export PDF
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leadData.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                          lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lead Details</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900">{selectedLead.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{selectedLead.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="text-gray-900">{selectedLead.status}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Source</label>
                <p className="text-gray-900">{selectedLead.source}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
