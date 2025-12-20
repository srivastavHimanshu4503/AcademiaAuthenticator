import React, { useEffect, useState } from "react";
import { Clock, FileUp, Loader2 } from "lucide-react";
import { api } from "../services/api";

interface OrganisationDashboardProps {
  organisationId?: string;
}

export const OrganisationDashboard: React.FC<OrganisationDashboardProps> = ({
  organisationId,
}) => {
  const [uploads, setUploads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch upload history
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (organisationId) {
        const data = await api.getOrganisationUploads(organisationId);
        setUploads(data);
      }

      setLoading(false);
    };

    if (organisationId) fetchData();
    else setLoading(false);
  }, [organisationId]);

  // Handle file upload
  const handleUpload = async () => {
    if (!file || !organisationId) return;

    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("organisationId", organisationId);


      setSuccess("Document uploaded successfully!");
      setFile(null);

      // Refresh table
      const refreshed = await api.getOrganisationUploads(organisationId);
      setUploads(refreshed);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-gov-blue" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">
            Organisation Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Upload and track your verification document submissions.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <FileUp size={18} /> Upload Document for Verification
        </h3>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-3">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded mb-3">
            {success}
          </div>
        )}

        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border rounded p-2"
          />

          <button
            disabled={uploading || !file}
            onClick={handleUpload}
            className="bg-gov-blue text-white px-6 py-2 rounded shadow font-semibold flex items-center gap-2 disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <FileUp size={18} /> Upload
              </>
            )}
          </button>
        </div>
      </div>

      {/* Upload History */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <Clock size={18} /> Upload History
          </h3>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Upload ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {uploads.map((u) => (
              <tr key={u.id}>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">
                  {u.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {u.fileName}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-bold rounded bg-yellow-100 text-yellow-800">
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}

            {uploads.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No uploads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
