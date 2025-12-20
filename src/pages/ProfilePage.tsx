import React from 'react';
import { User, Shield } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gov-dark font-serif mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow border-t-4 border-gov-blue overflow-hidden p-6 flex flex-col items-center">
          <div className="w-24 h-24 bg-gov-blue rounded-full flex items-center justify-center text-white mb-4 shadow-lg border-4 border-white"><User size={48} /></div>
          <h2 className="text-xl font-bold text-gray-900">User</h2>
          <p className="text-sm text-gray-500">Authenticated via Google</p>
          <span className="mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1"><Shield size={12} /> Google Verified</span>
      </div>
    </div>
  );
};