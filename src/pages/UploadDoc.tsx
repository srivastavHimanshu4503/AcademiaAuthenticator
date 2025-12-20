import React, { useState, ChangeEvent } from 'react';
import './UploadDoc.css';
import { CloudCog } from 'lucide-react';

// 1. Define an interface for the object returned by your backend
// Based on your code: src={fileData.path}
interface UploadedFileData {
  path: string;
  [key: string]: any; // Allows for other properties like filename, public_id, etc.
}

// 2. Define a type for your status to prevent typos
type UploadStatus = "idle" | "uploading" | "success" | "error";

function UploadDoc() {
  // 3. Explicitly type the useState hooks
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadedUrls, setUploadedUrls] = useState<UploadedFileData[]>([]);

  // 4. Handle File Selection
  // We use React.ChangeEvent<HTMLInputElement> for file inputs
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      setStatus("idle");
    }
  };

  // 5. Handle Upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files first!");
      return;
    }

    setStatus("uploading");
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        // Assuming result.data matches the UploadedFileData interface
        setUploadedUrls(result.data); 
        console.log("Uploaded Data:", result.data);
        let file_path = result.data[0].path;
        const req = await fetch(`http://127.0.0.1:9000/download-pdf?pdf_url=${file_path}`, {
  method: "POST"
});
        if (req.ok) {
          try {
            const mongo = await fetch("http://127.0.0.1:8000/uploadMongo", {
              method: "GET",
            });
            
          } catch (error) {
            console.log(error);
          }
          
        }
        
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="app-container">
      <div className="upload-card" style={{ width: '450px' }}>
        <h2>Upload pdf file</h2>
        
        <div className="file-input-wrapper">
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange} 
          />
        </div>

        {/* List of selected files to upload */}
        {selectedFiles.length > 0 && (
          <div className="file-info">
            <p><strong>Selected Files ({selectedFiles.length}):</strong></p>
            <ul style={{textAlign:'left', paddingLeft:'20px'}}>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button 
          onClick={handleUpload} 
          disabled={status === "uploading"}
          className="upload-btn"
        >
          {status === "uploading" ? "Uploading..." : "Upload"}
        </button>

        {status === "success" && (
          <div className="success-msg">
            <p>✅ Upload successful!</p>
            {/* Display uploaded images */}
            <div style={{display: 'flex', gap: '10px', flexWrap:'wrap', marginTop: '10px'}}>
              {uploadedUrls.map((fileData, index) => (
                 <img 
                   key={index} 
                   src={fileData.path} 
                   alt="uploaded" 
                   style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px'}}
                 />
              ))}
            </div>
          </div>
        )}
        
        {status === "error" && <p className="error-msg">❌ Upload failed.</p>}
      </div>
    </div>
  );
}

export default UploadDoc;