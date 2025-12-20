import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gov-dark text-white border-t-4 border-gov-orange">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-serif font-bold mb-4 text-gov-light">SatyaCert</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              An initiative to securely verify academic credentials using advanced OCR and blockchain technology. Ensuring transparency and trust in education.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gov-orange transition-colors">Verify Certificate</a></li>
              <li><a href="#" className="hover:text-gov-orange transition-colors">Institution Login</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gov-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gov-orange transition-colors">Terms of Use</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Contact</h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Department of Higher Education</strong><br/>
              Ranchi, Jharkhand - 834004
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-xs text-gray-400">&copy; 2025 SatyaCert. Content owned by Department of Higher Education.</p>
        </div>
      </div>
    </footer>
  );
};