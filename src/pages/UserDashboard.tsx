import React, { useEffect, useState } from 'react';
import { Clock, FileText, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface UserDashboardProps { onVerifyClick: () => void; userId?: string; }

export const UserDashboard: React.FC<UserDashboardProps> = ({ onVerifyClick, userId }) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (userId) {
        const data = await api.getUserRequests(userId);
        setRequests(data);
      }
      setLoading(false);
    };
    if(userId) fetchData();
    else setLoading(false);
  }, [userId]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gov-blue" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-end">
        <div><h1 className="text-2xl font-bold text-gray-900 font-serif">My Dashboard</h1><p className="text-sm text-gray-500">Track your verification requests.</p></div>
        <button onClick={onVerifyClick} className="bg-gov-blue text-white px-6 py-2 rounded shadow font-semibold flex items-center gap-2"><FileText size={18} /> New Request</button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50"><h3 className="font-bold text-gray-700 flex items-center gap-2"><Clock size={18} /> Request History</h3></div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{req.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{req.type}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold rounded bg-yellow-100 text-yellow-800">{req.status}</span></td>
              </tr>
            ))}
            {requests.length === 0 && <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No requests found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};