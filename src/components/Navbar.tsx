import React, { useState } from 'react';
import { Menu, User, LogOut, ShieldCheck, UserCircle, X, LayoutDashboard, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentUser: string | null;
  role: string | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentUser, role, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDashboardClick = () => {
    if (role === 'ADMIN') onNavigate('admin-dashboard');
    else if (role === 'INSTITUTION') onNavigate('institution-dashboard');
    else if (role === 'ORGANISATION') onNavigate('user-dashboard');
    else onNavigate('user-dashboard');
  };

  const navigateAndClose = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gov-blue shadow-lg sticky top-0 z-50">
      <div className="bg-blue-900 text-blue-100 text-[10px] md:text-xs py-1 px-4 flex justify-between items-center border-b border-blue-800">
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Government of Jharkhand</span>
          <span className="hidden md:inline border-l border-blue-700 pl-4 hover:underline cursor-pointer">
            Department of Higher Education
          </span>
        </div>
        <div className="space-x-3 flex items-center">
          <button className="hover:text-white transition-colors">Skip to Main Content</button>
          <span className="text-gray-500">|</span>
          <button className="hover:text-white transition-colors font-bold">A+</button>
          <button className="hover:text-white transition-colors">A</button>
          <button className="hover:text-white transition-colors text-xs">A-</button>
          <span className="text-gray-500">|</span>
          <button className="flex items-center gap-1 hover:text-white"><span>English</span></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('landing')}>
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-full">
                <ShieldCheck className="h-8 w-8 text-gov-blue" />
              </div>
              <div className="flex flex-col text-white">
                <h1 className="text-2xl font-bold font-serif leading-none tracking-tight group-hover:text-blue-200 transition-colors">SatyaCert</h1>
                <span className="text-[10px] text-blue-200 font-medium uppercase tracking-widest mt-0.5">
                  National Credential Verification
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('landing')} className="text-white hover:text-gov-orange font-medium transition-colors text-sm uppercase tracking-wide">
              Home
            </button>
            <button className="text-white hover:text-gov-orange font-medium transition-colors text-sm uppercase tracking-wide">
              About
            </button>

            {currentUser && (
              <button 
                onClick={handleDashboardClick}
                className="text-gov-orange hover:text-white font-bold transition-colors text-sm uppercase tracking-wide flex items-center gap-1 border-b-2 border-gov-orange pb-0.5"
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
            )}

            {!currentUser ? (
              <>
                <button 
                  onClick={() => onNavigate('admin-login')} 
                  className="bg-gov-orange text-white px-5 py-2 rounded shadow hover:bg-orange-600 transition-colors font-bold text-sm flex items-center gap-2"
                >
                  <ShieldAlert size={16} /> Ministry
                </button>
                <button 
                  onClick={() => onNavigate('login')} 
                  className="bg-white text-gov-blue px-5 py-2 rounded shadow hover:bg-gray-100 transition-colors font-bold text-sm flex items-center gap-2"
                >
                  <User size={16} /> LOGIN
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end text-white">
                  <div className="text-sm font-bold leading-tight">{currentUser}</div>
                  <div className="text-[10px] bg-gov-orange px-1.5 rounded text-white font-bold uppercase">{role}</div>
                </div>
                <div className="flex items-center bg-blue-800 rounded-lg p-1 border border-blue-700">
                  <button onClick={() => onNavigate('profile')} className="p-2 text-blue-200 hover:text-white hover:bg-blue-700 rounded transition-colors" title="My Profile"><UserCircle size={20} /></button>
                  <div className="w-px h-4 bg-blue-700 mx-1"></div>
                  <button onClick={onLogout} className="p-2 text-blue-200 hover:text-red-300 hover:bg-blue-700 rounded transition-colors" title="Logout"><LogOut size={20} /></button>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-gov-orange p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-900 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-800">
          <button onClick={() => navigateAndClose('landing')} className="text-gray-300 hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Home</button>
          {currentUser && (
             <button onClick={() => { handleDashboardClick(); setIsMobileMenuOpen(false); }} className="text-gov-orange hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-bold w-full text-left">Dashboard</button>
          )}
          {!currentUser ? (
            <>
                <button onClick={() => navigateAndClose('admin-login')} className="text-gov-orange hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Admin Login</button>
                <button onClick={() => navigateAndClose('login')} className="text-gray-300 hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Login</button>
            </>
          ) : (
              <>
               <button onClick={() => navigateAndClose('profile')} className="text-gray-300 hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">My Profile</button>
               <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="text-red-300 hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Logout</button>
              </>
          )}
        </div>
      )}
    </nav>
  );
};
