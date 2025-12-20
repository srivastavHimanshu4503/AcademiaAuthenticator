import React from "react";
import { DocumentAuthenticityForm } from "../components/DocumentAuthenticityForm";

const DocumentAuthenticityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Document Authenticity Predictor
        </h1>

        <DocumentAuthenticityForm />
      </div>
    </div>
  );
};

export default DocumentAuthenticityPage;
