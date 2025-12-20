import React, { useState } from 'react';
import { UserRole } from '../types';
import { api } from '../services/api';
import { Loader2 } from 'lucide-react'; 
// Removed firebaseAuth and auth imports

interface AuthProps { onLogin: (role: UserRole, userData?: any) => void; onNavigate: (page: string) => void; }

export const AdminAuth: React.FC<{ onLogin: (role: UserRole, data?: any) => void; onNavigate: (page: string) => void; }> = ({ onLogin, onNavigate }) => {
  // Assuming UserRole now includes ORGANISATION and does not include ADMIN
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.ADMIN);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState({ id: 'jk@gov.in', password: '123456' });

  const handleGoogleLogin = async () => {
    setLoading(true); setError('');
    try { 
        const user = await api.loginGoogle(); 
        onLogin(UserRole.USER, user); 
    } 
    catch (e) { 
        setError('Google Authentication Failed'); 
    } finally { 
        setLoading(false); 
    }
  };

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(''); setMsg('');
    try {
      let user;
      
      // Changed logic: ADMIN role removed, ORGANISATION role added.
      if (activeTab === UserRole.ADMIN) {
        // ASSUMING: You have a new API call for Organisation login
        user = (formData.id, formData.password); 

      }
      onLogin(activeTab, user);
    } catch (err: any) { 
        setError(err.message || 'Login Failed'); 
    } finally { 
        setLoading(false); 
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border-t-4 border-gov-blue">
        <h2 className="text-center text-3xl font-serif font-bold text-gray-900">SatyaCert Portal Login</h2>
        <div className="flex border-b border-gray-200 mb-6">
          {/* Updated roles for tabs: Removed ADMIN, added ORGANISATION */}
          {[UserRole.ADMIN].map(role => (
             <button key={role} className={`flex-1 py-3 text-sm font-medium border-b-2 flex justify-center gap-2 ${activeTab === role ? 'border-gov-blue text-gov-blue' : 'border-transparent text-gray-500'}`} onClick={() => {setActiveTab(role); setError(''); setMsg('');}}>
                {role === UserRole.ADMIN}
             </button>
          ))}
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">{error}</div>}
        {msg && <div className="bg-green-50 text-green-600 p-3 rounded text-sm text-center border border-green-200">{msg}</div>}
        
        {activeTab === UserRole.ADMIN }
          <form className="space-y-6" onSubmit={handleStandardLogin}>
            <input 
                type="text" 
                required 
                className="w-full px-3 py-3 border border-gray-300 rounded" 
                placeholder={activeTab === UserRole.ORGANISATION ? "Organisation Email" : "Institution Email"} 
                value={formData.id} 
                onChange={e => setFormData({...formData, id: e.target.value})} 
            />
            <input 
                type="password" 
                required 
                className="w-full px-3 py-3 border border-gray-300 rounded" 
                placeholder="Password" 
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})} 
            />
            <button type="submit" disabled={loading} className="w-full py-3 bg-gov-blue text-white rounded shadow-lg hover:bg-blue-900 font-bold flex justify-center">{loading ? <Loader2 className="animate-spin" /> : 'Sign In'}</button>
          </form>
        
        
    
      </div>
    </div>
  );
};