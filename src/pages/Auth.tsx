// import React, { useState } from 'react';
// import { UserRole } from '../types';
// import { api } from '../services/api';
// import { Loader2 } from 'lucide-react';

// interface AuthProps {
//   onLogin: (role: UserRole, userData?: any) => void;
//   onNavigate: (page: string) => void;
// }

// export const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate }) => {
//   const [activeTab, setActiveTab] = useState<UserRole>(UserRole.USER);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [msg, setMsg] = useState('');
//   const [formData, setFormData] = useState({ id: '', password: '' });

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     setError('');
//     setMsg('');

//     try {
//       const user = await api.loginGoogle();
//       onLogin(UserRole.USER, user);
//     } catch (e) {
//       setError('Google Authentication Failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStandardLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMsg('');

//     try {
//       let user;
//       if (activeTab === UserRole.INSTITUTION) {
//         user = await api.loginInstitution(formData.id, formData.password);
//       } else if (activeTab === UserRole.ORGANISATION) {
//         user = await api.loginOrganisation(formData.id, formData.password);
//       } else {
//         setError('Invalid login type');
//         return;
//       }
//       onLogin(activeTab, user);
//     } catch (err: any) {
//       setError(err.message || 'Login Failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center py-12 px-4">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border-t-4 border-gov-blue">

//         {/* Title */}
//         <h2 className="text-center text-3xl font-serif font-bold text-gray-900">
//           SatyaCert Portal Login
//         </h2>

//         {/* Role Tabs */}
//         <div className="flex border-b border-gray-200 mb-6">
//           {[UserRole.USER, UserRole.INSTITUTION, UserRole.ORGANISATION].map(role => (
//             <button
//               key={role}
//               className={`flex-1 py-3 text-sm font-medium border-b-2 flex justify-center 
//                 ${activeTab === role ? 'border-gov-blue text-gov-blue' : 'border-transparent text-gray-500'}`}
//               onClick={() => {
//                 setActiveTab(role);
//                 setError('');
//                 setMsg('');
//               }}
//             >
//               {role === UserRole.USER
//                 ? "Citizen"
//                 : role === UserRole.INSTITUTION
//                   ? "Institution"
//                   : "Organisation"}
//             </button>
//           ))}
//         </div>

//         {/* Error & Success Messages */}
//         {error && (
//           <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">
//             {error}
//           </div>
//         )}

//         {msg && (
//           <div className="bg-green-50 text-green-600 p-3 rounded text-sm text-center border border-green-200">
//             {msg}
//           </div>
//         )}

//         {/* Citizen (Google) Login */}
//         {activeTab === UserRole.USER ? (
//           <div className="space-y-6">
//             <div className="bg-blue-50 p-4 rounded text-sm text-blue-800 border border-blue-100">
//               Citizens authenticate via Google linked to DigiLocker.
//             </div>

//             <button
//               onClick={handleGoogleLogin}
//               disabled={loading}
//               className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 
//                        hover:bg-gray-50 font-bold py-3 px-4 rounded shadow-sm"
//             >
//               {loading ? <Loader2 className="animate-spin" /> : <span>Sign in with Google</span>}
//             </button>
//           </div>
//         ) : (
//           /* Institution / Organisation Login Form */
//           <form className="space-y-6" onSubmit={handleStandardLogin}>
//             <input
//               type="text"
//               required
//               className="w-full px-3 py-3 border border-gray-300 rounded"
//               placeholder={
//                 activeTab === UserRole.ORGANISATION
//                   ? "Organisation Email"
//                   : "Institution Email"
//               }
//               value={formData.id}
//               onChange={e => setFormData({ ...formData, id: e.target.value })}
//             />

//             <input
//               type="password"
//               autoComplete='current-password'
//               required
//               className="w-full px-3 py-3 border border-gray-300 rounded"
//               placeholder="Password"
//               value={formData.password}
//               onChange={e => setFormData({ ...formData, password: e.target.value })}
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-gov-blue text-white rounded shadow-lg hover:bg-blue-900 
//                          font-bold flex justify-center"
//             >
//               {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
//             </button>
//           </form>
//         )}

//         {/* Registration Links */}
//         {activeTab === UserRole.INSTITUTION && (
//           <div className="text-center mt-4 border-t pt-4">
//             <span className="text-sm text-gray-600">Not registered? </span>
//             <button
//               onClick={() => onNavigate('register-institution')}
//               className="text-sm font-bold text-gov-orange hover:underline"
//             >
//               Register New Institution
//             </button>
//           </div>
//         )}

//         {activeTab === UserRole.ORGANISATION && (
//           <div className="text-center mt-4 border-t pt-4">
//             <span className="text-sm text-gray-600">Not registered? </span>
//             <button
//               onClick={() => onNavigate('register-organisation')}
//               className="text-sm font-bold text-gov-orange hover:underline"
//             >
//               Register New Organisation
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };
// Auth.tsx
import React, { useState } from 'react';
import { UserRole } from '../types';
import { AuthTabs } from './/AuthTab.tsx'; // New Import
import { CitizenLoginForm } from './/CitizenLoginForm'; // New Import
import { StandardLoginForm } from './StandardLoginForm'; // New Import

interface AuthProps {
  onLogin: (role: UserRole, userData?: any) => void;
  onNavigate: (page: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.USER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border-t-4 border-gov-blue">

        {/* Title */}
        <h2 className="text-center text-3xl font-serif font-bold text-gray-900">
          SatyaCert Portal Login
        </h2>

        {/* Role Tabs - Refactored into AuthTabs */}
        <AuthTabs
          activeTab={activeTab as UserRole.USER | UserRole.INSTITUTION | UserRole.ORGANISATION}
          setActiveTab={setActiveTab}
          setError={setError}
          setMsg={setMsg}
        />

        {/* Error & Success Messages */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        {msg && (
          <div className="bg-green-50 text-green-600 p-3 rounded text-sm text-center border border-green-200">
            {msg}
          </div>
        )}

        {/* Render the appropriate form based on the active tab */}
        {activeTab === UserRole.USER ? (
          // Citizen (Google) Login - Refactored into CitizenLoginForm
          <CitizenLoginForm
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            setMsg={setMsg}
            onLogin={onLogin}
          />
        ) : (
          // Institution / Organisation Login Form - Refactored into StandardLoginForm
          <StandardLoginForm
            activeTab={activeTab as UserRole.INSTITUTION | UserRole.ORGANISATION}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            onLogin={onLogin}
            onNavigate={onNavigate}
          />
        )}

      </div>
    </div>
  );
};