// AuthTabs.tsx
import React from 'react';
import { UserRole } from '../types'; // Assume UserRole is defined here

interface AuthTabsProps {
  activeTab: UserRole.USER | UserRole.INSTITUTION | UserRole.ORGANISATION;
  setActiveTab: (role: UserRole) => void;
  setError: (error: string) => void;
  setMsg: (msg: string) => void;
}

export const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, setActiveTab, setError, setMsg }) => {
  const roles = [UserRole.USER, UserRole.INSTITUTION, UserRole.ORGANISATION];

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.USER:
        return "Citizen";
      case UserRole.INSTITUTION:
        return "Institution";
      case UserRole.ORGANISATION:
        return "Organisation";
      default:
        return "";
    }
  };

  return (
    <div className="flex border-b border-gray-200 mb-6">
      {roles.map(role => (
        <button
          key={role}
          className={`flex-1 py-3 text-sm font-medium border-b-2 flex justify-center 
            ${activeTab === role ? 'border-gov-blue text-gov-blue' : 'border-transparent text-gray-500'}`}
          onClick={() => {
            setActiveTab(role);
            setError('');
            setMsg('');
          }}
        >
          {getRoleLabel(role)}
        </button>
      ))}
    </div>
  );
};