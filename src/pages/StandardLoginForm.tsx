// StandardLoginForm.tsx
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { UserRole } from '../types';

interface StandardLoginFormProps {
  activeTab: UserRole.INSTITUTION | UserRole.ORGANISATION;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  onLogin: (role: UserRole, userData?: any) => void;
  onNavigate: (page: string) => void;
}

export const StandardLoginForm: React.FC<StandardLoginFormProps> = ({ 
  activeTab, 
  loading, 
  setLoading, 
  setError, 
  onLogin, 
  onNavigate 
}) => {
  const [formData, setFormData] = useState({ id: '', password: '' });

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user;
      if (activeTab === UserRole.INSTITUTION) {
        user = await api.loginInstitution(formData.id, formData.password);
      } else if (activeTab === UserRole.ORGANISATION) {
        // Double-check your API implementation for this call!
        user = await api.loginOrganisation(formData.id, formData.password);
      } else {
        setError('Invalid login type');
        return;
      }
      onLogin(activeTab, user);
    } catch (err: any) {
      setError(err.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  const isInstitution = activeTab === UserRole.INSTITUTION;

  return (
    <form className="space-y-6" onSubmit={handleStandardLogin}>
      <input
        type="text"
        required
        className="w-full px-3 py-3 border border-gray-300 rounded"
        placeholder={isInstitution ? "Institution Email" : "Organisation Email"}
        value={formData.id}
        onChange={e => setFormData({ ...formData, id: e.target.value })}
      />

      <input
        type="password"
        autoComplete='current-password'
        required
        className="w-full px-3 py-3 border border-gray-300 rounded"
        placeholder="Password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gov-blue text-white rounded shadow-lg hover:bg-blue-900 
                  font-bold flex justify-center"
      >
        {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
      </button>
      
      {/* Registration Link */}
      <div className="text-center mt-4 border-t pt-4">
        <span className="text-sm text-gray-600">Not registered? </span>
        <button
          onClick={() => onNavigate(isInstitution ? 'register-institution' : 'register-organisation')}
          className="text-sm font-bold text-gov-orange hover:underline"
          type="button" // Important to prevent form submission
        >
          {isInstitution ? "Register New Institution" : "Register New Organisation"}
        </button>
      </div>
    </form>
  );
};