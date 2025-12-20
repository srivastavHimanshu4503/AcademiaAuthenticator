// CitizenLoginForm.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { UserRole } from '../types';

interface CitizenLoginFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setMsg: (msg: string) => void;
  onLogin: (role: UserRole, userData?: any) => void;
}

export const CitizenLoginForm: React.FC<CitizenLoginFormProps> = ({ loading, setLoading, setError, setMsg, onLogin }) => {

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    setMsg('');

    try {
      const user = await api.loginGoogle();
      onLogin(UserRole.USER, user);
    } catch (e) {
      setError('Google Authentication Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded text-sm text-blue-800 border border-blue-100">
        Citizens authenticate via Google linked to DigiLocker.
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 
                   hover:bg-gray-50 font-bold py-3 px-4 rounded shadow-sm"
      >
        {loading ? <Loader2 className="animate-spin" /> : <span>Sign in with Google</span>}
      </button>
    </div>
  );
};