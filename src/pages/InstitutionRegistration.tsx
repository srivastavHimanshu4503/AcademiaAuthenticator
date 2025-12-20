import React, { useState } from 'react';
import { api } from '../services/api';
import { Building, CheckCircle, Eye, EyeOff, XCircle } from 'lucide-react';

interface Props { onNavigate: (page: string) => void; }

export const InstitutionRegistration: React.FC<Props> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    address: '',
    district: '',
    principalName: '',
    contactEmail: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.registerInstitution(formData);
      setStep(2);
    } catch (error: any) {
      setError(error.code === 'auth/email-already-in-use'
        ? "Email already registered."
        : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (step === 2) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded shadow text-center border-t-4 border-gov-green">
          <CheckCircle className="w-16 h-16 text-gov-green mx-auto mb-4" />
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Registration Completed
          </h2>

          <p className="text-gray-600 mb-6">
            Your institution registration has been submitted successfully.
            <br />
            <strong>Please wait for approval to continue.</strong>
          </p>

          <button
            onClick={() => onNavigate('login')}
            className="bg-gov-blue text-white px-6 py-2 rounded"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // MAIN FORM
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gov-blue p-6 text-white flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Building size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold">Institution Registration</h1>
            <p className="text-blue-200 text-sm">Official onboarding form</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
              <input required className="w-full border p-2 rounded"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution Code</label>
              <input required className="w-full border p-2 rounded"
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select required className="w-full border p-2 rounded"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}>
                <option value="">Select Type</option>
                <option value="College">College</option>
                <option value="University">University</option>
                <option value="Polytechnic">Polytechnic</option>
                <option value="Training Institute">Training Institute</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <input required className="w-full border p-2 rounded"
                value={formData.district}
                onChange={e => setFormData({ ...formData, district: e.target.value })} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input required className="w-full border p-2 rounded"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Principal / Registrar Name</label>
              <input required className="w-full border p-2 rounded"
                value={formData.principalName}
                onChange={e => setFormData({ ...formData, principalName: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
              <input required type="email" className="w-full border p-2 rounded"
                value={formData.contactEmail}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input required className="w-full border p-2 rounded"
                value={formData.mobile}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
            </div>

          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">

            {/* PASSWORD */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                required
                type={showPassword ? "text" : "password"}
                className="w-full border p-2 rounded"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full border p-2 rounded ${
                  formData.confirmPassword.length > 0 &&
                  (formData.password === formData.confirmPassword
                    ? "border-green-500"
                    : "border-red-500")
                }`}
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              />

              {/* Eye Icon */}
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              {/* Match / Mismatch Message */}
              <div className="mt-1 h-5">
                {formData.confirmPassword.length > 0 &&
                  formData.password === formData.confirmPassword && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle size={16} className="mr-1" /> Passwords match
                    </div>
                )}

                {formData.confirmPassword.length > 0 &&
                  formData.password !== formData.confirmPassword && (
                    <div className="flex items-center text-red-600 text-sm">
                      <XCircle size={16} className="mr-1" /> Passwords do not match
                    </div>
                )}
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={() => onNavigate('login')} className="text-gray-600">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="bg-gov-orange text-white px-8 py-2 rounded font-bold shadow hover:bg-orange-600 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
