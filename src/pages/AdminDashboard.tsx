import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { MONTHLY_STATS } from '../constants';
import { api } from '../services/api';
import { Institution } from '../types';
import { Check, X, AlertTriangle, Edit2, Trash2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    const data = await api.getAllInstitutions();
    setInstitutions(data);
  };

  const handleStatusUpdate = async (id: string, status: 'ACTIVE' | 'REJECTED') => {
    await api.updateInstitutionStatus(id, status);
    setSelectedInst(null);
    fetchInstitutions();
  };

  const handleDelete = async (id: string) => {
    await api.deleteInstitution(id);
    fetchInstitutions();
  };

  const handleEdit = async (id: string) => {
    const inst = institutions.find(i => i.id === id);
    if (inst) setSelectedInst(inst);
  };

  const pendingInstitutions = institutions.filter(i => i.status === 'PENDING');
  const approvedInstitutions = institutions.filter(i => i.status === 'ACTIVE');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold text-gray-900 font-serif mb-8"> Ministry of Education Jharkhand</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow border-t-4 border-gov-blue">
          <div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Verifications</div>
          <div className="text-2xl font-bold">14,205</div>
        </div>

        <div className="bg-white p-4 rounded shadow border-t-4 border-gov-orange">
          <div className="text-gray-500 text-xs font-bold uppercase mb-1">Pending Approvals</div>
          <div className="text-2xl font-bold text-orange-600">{pendingInstitutions.length}</div>
        </div>
      </div>

      {/* FIXED 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE — ALWAYS 2/3 WIDTH */}
        <div className="lg:col-span-2">

          {/* Pending Box */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg mb-8 p-6">
            <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} /> Applications Pending Approval
            </h3>

            <div className="bg-white rounded shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Institution</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {pendingInstitutions.length > 0 ? (
                    pendingInstitutions.map(inst => (
                      <tr key={inst.id}>
                        <td className="px-6 py-4 font-bold text-gray-900">{inst.name}</td>

                        <td className="px-6 py-4 flex gap-2">
                          {/* <button
                            onClick={() => setSelectedInst(inst)}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                          >
                            Review
                          </button> */}
                          <button
  onClick={() => window.open("http://10.195.115.216:9001", "_blank")}
  className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
>
  Review
</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                        No pending applications.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE — FIXED APPROVED LIST */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded shadow h-full border-t-4 border-gov-blue">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Check size={20} className='text-gov-blue' /> Approved Institutions ({approvedInstitutions.length})
            </h3>

            <div className="space-y-3 max-h-[350px] overflow-y-auto">

              {approvedInstitutions.length > 0 ? (
                approvedInstitutions.map(inst => (
                  <div
                    key={inst.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
                  >
                    <span className="font-medium text-sm text-gray-800">{inst.name}</span>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(inst.id!)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="Edit Details"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(inst.id!)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="Permanently Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic text-sm">No institutions approved yet.</p>
              )}

            </div>
          </div>
        </div>

      </div>

      {/* REVIEW MODAL */}
      {selectedInst && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[450px] p-5 rounded-xl shadow-lg">

            <h2 className="text-xl font-bold mb-4">Review Institution</h2>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedInst.name}</p>
              <p><strong>Code:</strong> {selectedInst.code}</p>
              <p><strong>Type:</strong> {selectedInst.type}</p>
              <p><strong>District:</strong> {selectedInst.district}</p>
              <p><strong>Address:</strong> {selectedInst.address}</p>
              <p><strong>Principal:</strong> {selectedInst.principalName}</p>
              <p><strong>Email:</strong> {selectedInst.contactEmail}</p>
              <p><strong>Mobile:</strong> {selectedInst.mobile}</p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-1"
                onClick={() => handleStatusUpdate(selectedInst.id!, 'ACTIVE')}
              >
                <Check size={18} /> Approve
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded flex items-center gap-1"
                onClick={() => handleStatusUpdate(selectedInst.id!, 'REJECTED')}
              >
                <X size={18} /> Reject
              </button>

              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setSelectedInst(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CHART */}
      <div className="bg-white p-6 rounded shadow h-80 mt-10">
        <h3 className="font-bold text-gray-700 mb-4">Verification Volume</h3>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_STATS}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1e3a8a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded shadow h-80 mt-10 overflow-y-auto">
  <h3 className="font-bold text-gray-700 mb-4">Verification Logs</h3>

  <table className="w-full text-sm">
    <thead>
      <tr className="text-left border-b">
        <th className="pb-2">Date</th>
        <th className="pb-2">Documents</th>
        <th className="pb-2">Merkle Root Hash</th>
      </tr>
    </thead>

    <tbody>
      <tr className="border-b hover:bg-gray-50">
        <td className="py-2 text-gray-700">09-12-2025</td>
        <td className="py-2 text-gray-700">30</td>
        <td className="py-2 font-mono text-xs text-blue-700 truncate"
            title="9fafe82b173f09d76a092adf0f6184c2d4a45f6f373648e961012c7c222abea3">
          9fafe82b173f09d76a092adf0f6184c2d4a45f6f373648e961012c7c222abea3
        </td>
      </tr>


    </tbody>
  </table>
</div>

    </div>
  );
};