import React, { useState } from 'react';
import { Loader2, Building, ShieldAlert, Mail, User, Phone, Lock, Check } from 'lucide-react';
import { api } from '../services/api';
import { UserRole } from '../types'; // Assuming UserRole is defined here

interface OrganisationRegistrationProps {
  onNavigate: (page: string) => void;
}

export const OrganisationRegistration: React.FC<OrganisationRegistrationProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    organisationName: '',
    email: '',
    // Role is pre-filled as requested
    role: UserRole.ORGANISATION,
    contactName: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // Destructure data for the API call, excluding confirmPassword
      const { confirmPassword, ...dataToSubmit } = formData;
      
      // ASSUMPTION: The API service has a function `registerOrganisation`
      await api.registerOrganisation(dataToSubmit);

      setMsg('Registration successful! You can now sign in on the login page.');
      // After a short delay, navigate to the login page
      setTimeout(() => {
        onNavigate('login');
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check the details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border-t-4 border-gov-blue">
        <div className="flex justify-center items-center gap-3 text-gov-blue">
            <Building size={30} />
            <h2 className="text-center text-3xl font-serif font-bold text-gray-900">Organisation Registration</h2>
        </div>
        <p className="text-center text-sm text-gray-500">Register your organisation to verify credentials on SatyaCert.</p>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">{error}</div>}
        {msg && <div className="bg-green-50 text-green-600 p-3 rounded text-sm text-center border border-green-200">{msg}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Organisation Details */}
          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <div className="p-3 bg-gray-100 text-gray-500"><Building size={20} /></div>
            <input 
              type="text" 
              name="organisationName" 
              required 
              className="w-full px-3 py-3 focus:outline-none" 
              placeholder="Organisation Name" 
              value={formData.organisationName} 
              onChange={handleChange} 
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <div className="p-3 bg-gray-100 text-gray-500"><Mail size={20} /></div>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full px-3 py-3 focus:outline-none" 
              placeholder="Organisation Email (Used for Login)" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Contact Person Name */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <div className="p-3 bg-gray-100 text-gray-500"><User size={20} /></div>
                <input 
                type="text" 
                name="contactName" 
                required 
                className="w-full px-3 py-3 focus:outline-none" 
                placeholder="Contact Person Name" 
                value={formData.contactName} 
                onChange={handleChange} 
                />
            </div>

            {/* Mobile Number */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <div className="p-3 bg-gray-100 text-gray-500"><Phone size={20} /></div>
                <input 
                type="tel" 
                name="mobileNo" 
                required 
                className="w-full px-3 py-3 focus:outline-none" 
                placeholder="Mobile Number" 
                value={formData.mobileNo} 
                onChange={handleChange} 
                />
            </div>
          </div>
          
          {/* Role (Read-only) */}
          <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-gray-50">
            <div className="p-3 bg-gray-200 text-gray-500"><Check size={20} /></div>
            <input 
              type="text" 
              name="role" 
              readOnly
              className="w-full px-3 py-3 focus:outline-none text-gray-600" 
              value={`Role: ${formData.role}`} 
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-4">
             {/* Password */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <div className="p-3 bg-gray-100 text-gray-500"><Lock size={20} /></div>
                <input 
                type="password" 
                name="password" 
                required 
                className="w-full px-3 py-3 focus:outline-none" 
                placeholder="Password (min 6 chars)" 
                value={formData.password} 
                onChange={handleChange} 
                />
            </div>
            
            {/* Confirm Password */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <div className="p-3 bg-gray-100 text-gray-500"><Lock size={20} /></div>
                <input 
                type="password" 
                name="confirmPassword" 
                required 
                className="w-full px-3 py-3 focus:outline-none" 
                placeholder="Confirm Password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 mt-6 bg-gov-blue text-white rounded shadow-lg hover:bg-blue-900 font-bold flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Register Organisation'}
          </button>
        </form>

        <div className="text-center mt-4 border-t pt-4">
          <span className="text-sm text-gray-600">Already registered? </span>
          <button onClick={() => onNavigate('login')} className="text-sm font-bold text-gov-orange hover:underline">
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};