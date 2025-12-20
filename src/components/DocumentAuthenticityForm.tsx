import React, { useState } from "react";

const API_ENDPOINT = "https://vikingmachinelearningmodel.onrender.com/predict";

export const DocumentAuthenticityForm: React.FC = () => {
  const [formData, setFormData] = useState({
    sig_sim: 0.92,
    seal_sim: 0.52,
    photo_clarity: 0.90,
    text_alignment: 0.89,
    font_match: "yes",
    layout_ok: "yes",
  });

  const [result, setResult] = useState<string | null>(null);
  const [resultClass, setResultClass] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.type === "number" ? parseFloat(e.target.value) : e.target.value,
    });
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("Sending data...");
    setResultClass("");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(`Error: ${data.detail || response.statusText}`);
        setResultClass("result-fraud");
        return;
      }

      if (data.prediction_status) {
        setResult(`✔ Result: ${data.prediction_label} - The document is likely AUTHENTIC.`);
        setResultClass("result-genuine");
      } else {
        setResult(`✘ Result: ${data.prediction_label} - The document is likely FRAUDULENT.`);
        setResultClass("result-fraud");
      }
    } catch (err) {
      setResult("Network Error: Could not connect to the API.");
      setResultClass("result-fraud");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold text-center mb-4">📜 Document Authenticity Check</h2>

      <form onSubmit={handleSubmit}>
        {/* Signature Similarity */}
        <div className="mb-4">
          <label className="font-semibold">Signature Similarity (0 - 1):</label>
          <input
            type="number"
            id="sig_sim"
            step="0.01"
            min="0"
            max="1"
            value={formData.sig_sim}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Seal Similarity */}
        <div className="mb-4">
          <label className="font-semibold">Seal Similarity (0 - 1):</label>
          <input
            type="number"
            id="seal_sim"
            step="0.01"
            min="0"
            max="1"
            value={formData.seal_sim}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Photo Clarity */}
        <div className="mb-4">
          <label className="font-semibold">Photo Clarity (0 - 1):</label>
          <input
            type="number"
            id="photo_clarity"
            step="0.01"
            min="0"
            max="1"
            value={formData.photo_clarity}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Text Alignment */}
        <div className="mb-4">
          <label className="font-semibold">Text Alignment Score (0 - 1):</label>
          <input
            type="number"
            id="text_alignment"
            step="0.01"
            min="0"
            max="1"
            value={formData.text_alignment}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Font Match */}
        <div className="mb-4">
          <label className="font-semibold">Font Match:</label>
          <select
            id="font_match"
            value={formData.font_match}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Layout OK */}
        <div className="mb-4">
          <label className="font-semibold">Layout OK:</label>
          <select
            id="layout_ok"
            value={formData.layout_ok}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          {loading ? "Checking..." : "Check Authenticity"}
        </button>
      </form>

      {/* Result section */}
      <div className={`mt-4 p-3 text-center rounded font-semibold ${resultClass}`}>
        {result}
      </div>
    </div>
  );
};
