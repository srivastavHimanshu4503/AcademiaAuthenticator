// import React, { useState, useEffect } from 'react';
// import { Upload, FileText, Check, AlertTriangle, X, Loader2, Send, Keyboard, CloudCog } from 'lucide-react';
// import { VerificationStep } from '../types';
// import { DocumentComparisonDisplay } from './DocumentComparisonDisplay';
// import { api } from '../services/api';

// type VerificationMode = 'UPLOAD' | 'MANUAL';

// interface VerificationFlowProps {
//   userId: string;
//   onComplete: () => void;
// }

// let verificationResult = {"file1": {}, "file2": {}, "diff": {}};

// export const VerificationFlow: React.FC<VerificationFlowProps> = ({ userId, onComplete }) => {
//   const [step, setStep] = useState<VerificationStep>(VerificationStep.UPLOAD);
//   const [mode, setMode] = useState<VerificationMode>('UPLOAD');
  
//   const [file, setFile] = useState<File | null>(null);
//   const [manualData, setManualData] = useState({ certificateId: '', name: '', institutionId: '' });
//   const [institutions, setInstitutions] = useState<any[]>([]);

//   const [requestId, setRequestId] = useState<string | null>(null);

//   useEffect(() => {
//     const loadInsts = async () => {
//       try {
//         const data = await api.getAllInstitutions();
//         setInstitutions(data.filter((i:any) => i.status === 'ACTIVE'));
//       } catch (e) {}
//     };
//     loadInsts();
//   }, []);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//       setStep(VerificationStep.PREVIEW);
//     }
//   };

//   const handleSubmission = async () => {
//     setStep(VerificationStep.PROCESSING);
//     const formData = new FormData();
//     formData.append('file_upload', file!);
//     try {
//       const endpoint = "http://127.0.0.1:8000/uploadFile/";
//       const response = await fetch(endpoint, {
//         method: "POST",
//         body: formData
//       });
//       if (response.ok) {
//         const verify = "http://127.0.0.1:8000/verify/";
//         const res = await fetch(verify, {
//           method: "GET"
//         })
//         if (res.ok) {
//           const result = await res.json();
//           console.log(result);
//           verificationResult = {...result};
//           console.log(verificationResult);
//         } else {
//           console.log("Did not get the response")
//         }
//       } else {
//         console.error("Failed to upload file.");
//       }
//     } catch (error) {
//         console.error(error);
//     }
//     try {
//       let res;
//       if (mode === 'UPLOAD' && file) {
//         res = await api.submitVerificationRequest(file, userId);
//       } else {
//         res = await api.submitManualRequest(manualData, userId);
//       }
      
//       setRequestId(res.requestId);
//       setStep(VerificationStep.HANDOVER);
//     } catch (e) {
//       alert("Submission Failed");
//       setStep(VerificationStep.UPLOAD);
//     }
//   };

//   const resetFlow = () => {
//     setFile(null);
//     setManualData({ certificateId: '', name: '', institutionId: '' });
//     setStep(VerificationStep.UPLOAD);
//     setRequestId(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
      
//       {/* Progress Stepper */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between relative">
//           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
//           {['Input', 'Preview', 'Submitting', 'Handover'].map((label, index) => {
//             const isActive = index <= step;
//             return (
//               <div key={label} className="flex flex-col items-center bg-slate-50 px-2">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isActive ? 'bg-gov-blue text-white' : 'bg-gray-300 text-gray-600'}`}>
//                   {index + 1}
//                 </div>
//                 <span className={`text-xs mt-1 font-medium ${isActive ? 'text-gov-blue' : 'text-gray-500'}`}>{label}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Step 1: Input */}
//       {step === VerificationStep.UPLOAD && (
//         <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
//           <div className="flex border-b border-gray-200">
//              <button onClick={() => setMode('UPLOAD')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${mode === 'UPLOAD' ? 'bg-blue-50 text-gov-blue border-b-2 border-gov-blue' : 'text-gray-500 hover:bg-gray-50'}`}>
//                 <Upload size={18} /> Upload Document
//              </button>
//              <button onClick={() => setMode('MANUAL')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${mode === 'MANUAL' ? 'bg-blue-50 text-gov-blue border-b-2 border-gov-blue' : 'text-gray-500 hover:bg-gray-50'}`}>
//                 <Keyboard size={18} /> Enter Details Manually
//              </button>
//           </div>

//           <div className="p-10">
//             {mode === 'UPLOAD' ? (
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-blue-50 text-gov-blue rounded-full mx-auto flex items-center justify-center mb-6"><Upload size={40} /></div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Certificate</h2>
//                 <p className="text-gray-500 mb-8 max-w-md mx-auto">Supported formats: PDF, JPG, PNG. Max size: 5MB.</p>
//                 <div className="flex justify-center">
//                   <label className="cursor-pointer bg-gov-blue hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded shadow transition-colors">
//                     <span>Choose File</span>
//                     <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
//                   </label>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={(e) => {e.preventDefault(); handleSubmission();}} className="max-w-lg mx-auto space-y-5">
//                 <div><label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID</label><input required className="w-full border p-3 rounded" value={manualData.certificateId} onChange={e => setManualData({...manualData, certificateId: e.target.value})} /></div>
//                 <div><label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label><input required className="w-full border p-3 rounded" value={manualData.name} onChange={e => setManualData({...manualData, name: e.target.value})} /></div>
//                 <div>
//                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
//                    <select required className="w-full border p-3 rounded" value={manualData.institutionId} onChange={e => setManualData({...manualData, institutionId: e.target.value})}>
//                      <option value="">Select Institution</option>
//                      {institutions.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
//                    </select>
//                 </div>
//                 <button type="submit" className="w-full bg-gov-blue hover:bg-blue-800 text-white font-bold py-3 rounded shadow mt-4">Submit Verification Request</button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Step 2: Preview (Upload only) */}
//       {step === VerificationStep.PREVIEW && file && (
//         <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden text-center p-8">
//           <h3 className="font-bold text-gray-700 mb-4">Confirm Submission</h3>
//           <div className="bg-gray-100 p-4 rounded mb-6 inline-block">{file.name}</div>
//           <p className="text-sm text-gray-500 mb-6">This document will be sent to the backend for AI analysis.</p>
//           <div className="flex justify-center gap-4">
//             <button onClick={resetFlow} className="text-gray-500">Cancel</button>
//             <button onClick={handleSubmission} className="bg-gov-green hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow flex items-center gap-2">
//               <Send size={18} /> Submit for Analysis
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step 3: Submitting */}
//       {step === VerificationStep.PROCESSING && (
//         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
//           <Loader2 size={60} className="text-gov-blue animate-spin mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-gray-800">Sending to Secure Cloud...</h2>
//         </div>
//       )}

//       {/* Step 4: Handover Result */}
//       {step === VerificationStep.HANDOVER && 
//         <DocumentComparisonDisplay
//         file1={verificationResult.file1}
//         file2={verificationResult.file2}
//         diff={verificationResult.diff}
//         onComplete={onComplete}
//         resetFlow={resetFlow}
//       />
//     }
//       {/* {step === VerificationStep.HANDOVER && (
//         <div className="bg-white rounded-lg shadow-lg border-t-8 border-gov-green p-8 text-center">
//           <div className="w-20 h-20 bg-green-100 text-gov-green rounded-full mx-auto flex items-center justify-center mb-6"><Check size={40} /></div>
//           <h2 className="text-3xl font-bold text-gov-green mb-2">Request Submitted</h2>
//           <p className="text-gray-600 mb-8">Your document has been successfully handed over to the backend verification engine.</p>
//           <div className="bg-gray-50 p-4 rounded border border-gray-200 inline-block mb-6">
//             <p className="text-xs text-gray-500 uppercase font-bold">Request ID</p>
//             <p className="text-xl font-mono font-bold text-gray-800">{requestId}</p>
//           </div>
//           <p className="text-sm text-gray-500 mb-8">You can track the status of this request in your dashboard.</p>
//           <div className="flex justify-center gap-4">
//              <button onClick={resetFlow} className="px-6 py-2 border border-gray-300 rounded text-gray-700">Submit Another</button>
//              <button onClick={onComplete} className="px-6 py-2 bg-gov-blue text-white rounded hover:bg-blue-800 font-bold">Go to Dashboard</button>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// VerificationFlow.tsx

import React, { useState, useEffect } from 'react';
import { Upload, AlertTriangle, Loader2, Send, Keyboard } from 'lucide-react';
// Assuming types.ts defines VerificationStep, UserRole, etc.
// NOTE: I'm defining the interface here to make this component self-contained.
// In your real project, these should come from '../types'.

// --- Local Type Definitions (for compilation) ---
enum VerificationStep {
    UPLOAD = 0,
    PREVIEW = 1,
    PROCESSING = 2,
    HANDOVER = 3,
}
type VerificationMode = 'UPLOAD' | 'MANUAL';
interface ComparisonResult {
    file1: any;
    file2: any;
    diff: any; // Now a PARSED JSON object
}
// --------------------------------------------------

import { DocumentComparisonDisplay } from './DocumentComparisonDisplay';
import { api } from '../services/api'; // Assuming your API services exist

interface VerificationFlowProps {
  userId: string;
  onComplete: () => void;
}

export const VerificationFlow: React.FC<VerificationFlowProps> = ({ userId, onComplete }) => {
  const [step, setStep] = useState<VerificationStep>(VerificationStep.UPLOAD);
  const [mode, setMode] = useState<VerificationMode>('UPLOAD');
  
  const [file, setFile] = useState<File | null>(null);
  const [manualData, setManualData] = useState({ certificateId: '', name: '', institutionId: '' });
  const [institutions, setInstitutions] = useState<any[]>([]);

  const [requestId, setRequestId] = useState<string | null>(null);
  
  // FIX 1: Use useState for the comparison result instead of a global let variable
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    const loadInsts = async () => {
      try {
        const data = await api.getAllInstitutions();
        setInstitutions(data.filter((i:any) => i.status === 'ACTIVE'));
      } catch (e) {
        console.error("Failed to load institutions:", e);
      }
    };
    loadInsts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStep(VerificationStep.PREVIEW);
    }
  };

  const handleSubmission = async () => {
    setStep(VerificationStep.PROCESSING);
    
    // Safety check for file upload mode
    if (mode === 'UPLOAD' && !file) {
      alert("Please select a file to upload.");
      setStep(VerificationStep.UPLOAD);
      return;
    }

    let localRequestId: string | null = null;
    let comparisonData: ComparisonResult | null = null;
    
    try {
        if (mode === 'UPLOAD' && file) {
            const formData = new FormData();
            formData.append('file_upload', file);
            
            // --- Step 1: Upload File ---
            const uploadEndpoint = "http://127.0.0.1:8000/uploadFile/";
            const uploadResponse = await fetch(uploadEndpoint, {
                method: "POST",
                body: formData
            });

            if (uploadResponse.ok) {
                // --- Step 2: Get Verification/Comparison Result ---
                const verifyEndpoint = "http://127.0.0.1:8000/verify/";
                const verifyResponse = await fetch(verifyEndpoint, { method: "GET" });
                
                if (verifyResponse.ok) {
                    const result = await verifyResponse.json();
                    
                    // FIX 2: Parse the diff JSON string
                    let parsedDiff = {};
                    try {
                        parsedDiff = JSON.parse(result.diff);
                    } catch (e) {
                        console.error("Failed to parse diff JSON string:", result.diff, e);
                    }
                    
                    comparisonData = {
                        file1: result.file1,
                        file2: result.file2,
                        diff: parsedDiff
                    };

                } else {
                    throw new Error(`Verification API call failed with status: ${verifyResponse.status}`);
                }

                // Step 3: Submit tracking request
                const trackingRes = await api.submitVerificationRequest(file, userId);
                localRequestId = trackingRes.requestId;
                
            } else {
                throw new Error(`File upload failed with status: ${uploadResponse.status}`);
            }
        } else {
            // Manual submission logic
            const trackingRes = await api.submitManualRequest(manualData, userId);
            localRequestId = trackingRes.requestId;
            
            // NOTE: For manual mode, you'd typically fetch comparison data after the request 
            // is processed, or you'd just skip the comparison display. 
            // For now, we set a temporary comparisonData (assuming no file1/file2 match) 
            // to show the UI if needed.
            comparisonData = { file1: {}, file2: {}, diff: {} }; 
        }
        
        // Final state update
        setComparisonResult(comparisonData);
        setRequestId(localRequestId);
        setStep(VerificationStep.HANDOVER);

    } catch (error) {
        console.error("Submission or Verification Flow Failed:", error);
        alert(`Submission Failed: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`);
        setStep(VerificationStep.UPLOAD);
    }
  };

  const resetFlow = () => {
    setFile(null);
    setManualData({ certificateId: '', name: '', institutionId: '' });
    setStep(VerificationStep.UPLOAD);
    setRequestId(null);
    setComparisonResult(null); // Reset comparison result
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Progress Stepper (omitted for brevity) */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
          {['Input', 'Preview', 'Submitting', 'Handover'].map((label, index) => {
            const isActive = index <= step;
            return (
              <div key={label} className="flex flex-col items-center bg-slate-50 px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isActive ? 'bg-gov-blue text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {index + 1}
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-gov-blue' : 'text-gray-500'}`}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Input (omitted for brevity) */}
      {step === VerificationStep.UPLOAD && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
             <div className="flex border-b border-gray-200">
                <button onClick={() => setMode('UPLOAD')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${mode === 'UPLOAD' ? 'bg-blue-50 text-gov-blue border-b-2 border-gov-blue' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <Upload size={18} /> Upload Document
                </button>
                <button onClick={() => setMode('MANUAL')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${mode === 'MANUAL' ? 'bg-blue-50 text-gov-blue border-b-2 border-gov-blue' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <Keyboard size={18} /> Enter Details Manually
                </button>
             </div>

             <div className="p-10">
                {mode === 'UPLOAD' ? (
                   <div className="text-center">
                     <div className="w-20 h-20 bg-blue-50 text-gov-blue rounded-full mx-auto flex items-center justify-center mb-6"><Upload size={40} /></div>
                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Certificate</h2>
                     <p className="text-gray-500 mb-8 max-w-md mx-auto">Supported formats: PDF, JPG, PNG. Max size: 5MB.</p>
                     <div className="flex justify-center">
                       <label className="cursor-pointer bg-gov-blue hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded shadow transition-colors">
                         <span>Choose File</span>
                         <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                       </label>
                     </div>
                   </div>
                ) : (
                   <form onSubmit={(e) => {e.preventDefault(); handleSubmission();}} className="max-w-lg mx-auto space-y-5">
                     <div><label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID</label><input required className="w-full border p-3 rounded" value={manualData.certificateId} onChange={e => setManualData({...manualData, certificateId: e.target.value})} /></div>
                     <div><label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label><input required className="w-full border p-3 rounded" value={manualData.name} onChange={e => setManualData({...manualData, name: e.target.value})} /></div>
                     <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                         <select required className="w-full border p-3 rounded" value={manualData.institutionId} onChange={e => setManualData({...manualData, institutionId: e.target.value})}>
                            <option value="">Select Institution</option>
                            {institutions.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
                         </select>
                     </div>
                     <button type="submit" className="w-full bg-gov-blue hover:bg-blue-800 text-white font-bold py-3 rounded shadow mt-4">Submit Verification Request</button>
                   </form>
                )}
             </div>
        </div>
      )}

      {/* Step 2: Preview (omitted for brevity) */}
      {step === VerificationStep.PREVIEW && file && (
         <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden text-center p-8">
            <h3 className="font-bold text-gray-700 mb-4">Confirm Submission</h3>
            <div className="bg-gray-100 p-4 rounded mb-6 inline-block">{file.name}</div>
            <p className="text-sm text-gray-500 mb-6">This document will be sent to the backend for AI analysis.</p>
            <div className="flex justify-center gap-4">
              <button onClick={resetFlow} className="text-gray-500">Cancel</button>
              <button onClick={handleSubmission} className="bg-gov-green hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow flex items-center gap-2">
                <Send size={18} /> Submit for Analysis
              </button>
            </div>
         </div>
      )}

      {/* Step 3: Submitting (omitted for brevity) */}
      {step === VerificationStep.PROCESSING && (
         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
            <Loader2 size={60} className="text-gov-blue animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Sending to Secure Cloud...</h2>
         </div>
      )}

      {/* Step 4: Handover Result - Using the new Comparison Display */}
      {step === VerificationStep.HANDOVER && comparisonResult && (
        <DocumentComparisonDisplay
          file1={comparisonResult.file1}
          file2={comparisonResult.file2}
          diff={comparisonResult.diff}
          onComplete={onComplete}
          resetFlow={resetFlow}
        />
      )}
      
      {/* Fallback for missing data */}
      {step === VerificationStep.HANDOVER && !comparisonResult && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center text-red-600">
             <AlertTriangle size={30} className="mx-auto mb-4" />
             <p className="font-bold">Verification Failed.</p>
             <p className="text-sm">Comparison results could not be retrieved. Please check the network log.</p>
         </div>
      )}
    </div>
  );
};