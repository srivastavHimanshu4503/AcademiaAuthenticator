import React from 'react';
import { Shield, Search, Upload, Database } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden parallax-bg bg-slate-900">
        <div className="absolute inset-0 bg-blue-900/80 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 inline-block p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <span className="text-gov-orange font-bold tracking-widest uppercase text-sm">
              Official Verification Portal
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight drop-shadow-lg">
            Trusted Credentials <br /> Verified Instantly
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Secure, Tamper-Proof, and Centralized Verification for Educational Certificates.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('login')}
              className="bg-gov-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl text-lg flex items-center justify-center gap-2"
            >
              <Upload size={24} /> Verify Certificate
            </button>

            <button
              onClick={() => onNavigate('login')}
              className="bg-white hover:bg-gray-50 text-gov-blue font-bold py-4 px-8 rounded shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl text-lg flex items-center justify-center gap-2"
            >
              <Shield size={24} /> Institution Portal
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gov-blue py-6 border-b-4 border-gov-orange">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around text-white text-center">
          <div className="p-2">
            <div className="text-3xl font-bold font-serif">Secure</div>
            <div className="text-xs uppercase tracking-wider opacity-80">Encryption Standard</div>
          </div>
          <div className="p-2">
            <div className="text-3xl font-bold font-serif">2.5M+</div>
            <div className="text-xs uppercase tracking-wider opacity-80">Records Secured</div>
          </div>
          <div className="p-2">
            <div className="text-3xl font-bold font-serif">100%</div>
            <div className="text-xs uppercase tracking-wider opacity-80">Government Backed</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gov-blue font-serif mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-gov-orange mx-auto rounded"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Seamless integration for users and institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 text-gov-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">1. Upload Document</h3>
              <p className="text-gray-600 text-sm">Citizens upload their certificates securely for analysis.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 text-gov-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">2. Processing</h3>
              <p className="text-gray-600 text-sm">Requests are queued and verified securely.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 text-gov-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Database size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">3. Database Match</h3>
              <p className="text-gray-600 text-sm">Matched against institution records.</p>
            </div>
          </div>

          {/* NEW BUTTON: opens DocumentAuthenticityForm */}
          <div className="text-center mt-16">
            <button
              onClick={() => onNavigate("auth-checker")}
              className="bg-gov-orange text-white font-bold px-8 py-4 rounded-lg shadow hover:bg-orange-600 transition text-lg"
            >
              🔍 Run Document Similarity Checker
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
