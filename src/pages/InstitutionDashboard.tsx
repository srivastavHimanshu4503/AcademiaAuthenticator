import React, { useState } from 'react';
import { Upload, CheckCircle, X, FileText } from 'lucide-react';
import { api } from '../services/api';
import UploadDoc from './UploadDoc';

interface Props { 
  institutionName?: string;
  institutionId?: string; 
}

export const InstitutionDashboard: React.FC<Props> = ({ institutionName, institutionId }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!category || !year || files.length === 0) {
      alert("All fields are required.");
      return;
    }

    setUploading(true);
    setSuccess(false);

    try {
      // Simulate upload (replace this with actual upload logic)
      await new Promise(res => setTimeout(res, 1500));
      
      setSuccess(true);
      setUploading(false);

      // Clear form
      setCategory("");
      setYear("");
      setFiles([]);

    } catch (err) {
      alert("Upload failed");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">
            Welcome, {institutionName || "Institution"}
          </h1>
          <p className="text-sm text-gray-500">Upload and manage your institution documents.</p>
        </div>

        <div className="bg-blue-50 text-gov-blue px-4 py-2 rounded border border-blue-200 font-mono text-sm">
          Status: <span className="text-green-600 font-bold">ACTIVE</span>
        </div>
      </div>

      {/* UPLOAD DOCUMENT BUTTON */}
      <UploadDoc />
      {/* <div className="bg-white p-8 rounded shadow border border-gray-200 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Documents</h2>
        <p className="text-gray-600 text-sm mb-6">
          Upload PDFs such as marksheets, fee receipts, degrees, or other certificates.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-gov-blue text-white px-6 py-3 rounded font-semibold shadow hover:bg-blue-700 transition"
        >
          Upload Documents
        </button> */}
        {/* <button
  onClick={() => window.location.href = "http://10.195.115.216:9001"}
  className="bg-gov-blue text-white px-6 py-3 rounded font-semibold shadow hover:bg-blue-700 transition"
>
  Upload Documents
</button> 

      </div>
*/}

      {/* ---------------- MODAL (POPUP) ---------------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">

            {/* Close Button */}
            <button onClick={() => setModalOpen(false)} className="absolute right-4 top-4 text-gray-500 hover:text-black">
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Document Details</h2>

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                Uploaded successfully!
              </div>
            )}

            {/* FORM */}
            <div className="space-y-4">

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full border p-2 rounded"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Marksheet">Marksheet</option>
                  <option value="Fees Receipt">Fees Receipt</option>
                  <option value="Degree">Degree</option>
                  <option value="Other Certificate">Other Certificate</option>
                </select>
              </div>

              {/* YEAR */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input 
                  type="text"
                  placeholder="e.g. 2024"
                  className="w-full border p-2 rounded"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                />
              </div>

              {/* PDF UPLOAD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF(s)</label>
                <input 
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                />

                {files.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                    {files.map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-4 mt-4">
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button 
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-4 py-2 bg-gov-blue text-white rounded shadow hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};