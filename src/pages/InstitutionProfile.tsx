import React, { useEffect, useState } from "react";
import { ArrowLeft, Camera, Edit, Save } from "lucide-react";
import { api } from "../services/api";

interface InstitutionProfileProps {
  institutionId: string;
  onBack: () => void;
}

export const InstitutionProfile: React.FC<InstitutionProfileProps> = ({
  institutionId,
  onBack,
}) => {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const [data, setData] = useState<any>({
    name: "",
    code: "",
    type: "",
    address: "",
    principalName: "",
    contactEmail: "",
    mobile: "",
  });

  // Fetch institution data
  useEffect(() => {
    loadInstitutionDetails();
  }, []);

  const loadInstitutionDetails = async () => {
    const instData = await api.getInstitutionById(institutionId);
    setData(instData);
    setLogoPreview(instData?.logo ?? "");

    setLoading(false);
  };

  // Logo upload handler
  const handleLogoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await api.updateInstitutionProfile(institutionId, {
      ...data,
      logo: logoPreview,
    });
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  if (loading)
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-700 font-semibold hover:underline mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Institution Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT CARD */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 text-center">
          {/* Logo */}
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={
                logoPreview ||
                "https://via.placeholder.com/100?text=Logo"
              }
              className="w-32 h-32 rounded-full object-cover border shadow"
              alt="Institution Logo"
            />

            {editMode && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
            )}
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold mt-4">{data.name}</h2>
          <p className="text-gray-500">{data.type}</p>

          {/* Contact details */}
          <div className="w-full mt-6 text-left text-sm space-y-2">
            <p><strong>Email:</strong> {data.contactEmail}</p>
            <p><strong>Phone:</strong> {data.mobile}</p>
            <p><strong>Address:</strong> {data.address}</p>
          </div>
        </div>

        {/* RIGHT CARD — Details */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow border border-gray-200">

          {/* Header with Edit / Save Buttons */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Institution Information</h3>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
              >
                <Edit size={18} /> Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
              >
                <Save size={18} /> Save
              </button>
            )}
          </div>

          {/* Editable Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Institution Name", "name"],
              ["Institution Code", "code"],
              ["Type", "type"],
              ["Address", "address"],
              ["Registrar / Principal", "principalName"],
              ["Email ID", "contactEmail"],
              ["Phone No", "mobile"],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>
                <input
                  disabled={!editMode}
                  value={data[key]}
                  onChange={(e) =>
                    setData({ ...data, [key]: e.target.value })
                  }
                  className={`w-full p-2 border rounded mt-1 ${
                    editMode ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
