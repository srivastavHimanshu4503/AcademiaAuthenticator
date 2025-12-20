// // // // DocumentComparisonDisplay.tsx
// // // import React from 'react';
// // // import { FileText, CheckCircle, XCircle } from 'lucide-react';

// // // interface ComparisonProps {
// // //   file1: any; // Document data from Source A
// // //   file2: any; // Document data from Source B
// // //   diff: any;  // The difference object, which is empty {} if they match
// // //   onComplete: () => void;
// // //   resetFlow: () => void;
// // // }

// // // // Keys to ignore during comparison display (MongoDB internal fields)
// // // const IGNORED_KEYS = ['_id', '__v', '$oid'];

// // // /**
// // //  * Renders an array of objects (like the 'subjects' array) for comparison.
// // //  * This is simplified to just check if the entire array differs.
// // //  */
// // // const renderArrayComparison = (key: string, array1: any[], array2: any[], isDiff: boolean) => {
// // //   const diffClass = isDiff ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white';
  
// // //   return (
// // //     <div className={`p-3 rounded border ${diffClass} col-span-2`}>
// // //         <p className={`font-bold ${isDiff ? 'text-red-700' : 'text-gray-700'} mb-2`}>
// // //             {key.toUpperCase()} Array ({isDiff ? 'MISMATCH' : 'MATCH'})
// // //         </p>
// // //         <p className="text-sm text-gray-500 italic">
// // //             {isDiff 
// // //                 ? "The contents of this complex list differ between documents." 
// // //                 : "The list content is identical."
// // //             }
// // //         </p>
// // //         <p className="text-xs mt-1 text-gray-400">
// // //             Preview: {array1.length} items found.
// // //         </p>
// // //     </div>
// // //   );
// // // };


// // // /**
// // //  * Renders the values for a single field in the two documents, applying highlighting.
// // //  */
// // // const renderFieldRow = (key: string, value1: any, value2: any, isDiff: boolean) => {
// // //   // Convert complex objects to a readable string or indicator
// // //   const formatValue = (value: any) => {
// // //     if (value === null) return 'null';
// // //     if (typeof value === 'object') return '...Object / Array...';
// // //     return String(value);
// // //   };
  
// // //   // Highlight class for mismatched values
// // //   const highlightClass = isDiff ? 'bg-red-200 text-red-900 font-semibold' : 'text-gray-800';

// // //   return (
// // //     <div className="grid grid-cols-3 gap-4 border-b border-gray-100 py-3 items-center hover:bg-gray-50">
// // //       <div className="text-sm font-medium text-gray-500 pl-4">{key.replace(/_/g, ' ')}</div>
      
// // //       {/* Value 1 (Source A) */}
// // //       <div className={`text-sm pr-4 ${highlightClass}`}>{formatValue(value1)}</div>
      
// // //       {/* Value 2 (Source B) */}
// // //       <div className={`text-sm pr-4 ${highlightClass}`}>{formatValue(value2)}</div>
// // //     </div>
// // //   );
// // // };

// // // export const DocumentComparisonDisplay: React.FC<ComparisonProps> = ({ 
// // //   file1, 
// // //   file2, 
// // //   diff, 
// // //   onComplete, 
// // //   resetFlow 
// // // }) => {
  
// // //   // Clean the file objects by ignoring MongoDB internal keys
// // //   const cleanFile1 = Object.fromEntries(
// // //     Object.entries(file1).filter(([key]) => !IGNORED_KEYS.includes(key) && !key.includes('$'))
// // //   );
  
// // //   const cleanFile2 = Object.fromEntries(
// // //     Object.entries(file2).filter(([key]) => !IGNORED_KEYS.includes(key) && !key.includes('$'))
// // //   );

// // //   const cleanDiff = Object.fromEntries(
// // //     Object.entries(diff).filter(([key]) => !IGNORED_KEYS.includes(key) && !key.includes('$'))
// // //   );

// // //   const isMatch = Object.keys(cleanDiff).length === 0;
  
// // //   // --- Create a combined list of unique top-level keys for iteration ---
// // //   const allKeys = new Set([...Object.keys(cleanFile1), ...Object.keys(cleanFile2)]);
// // //   const sortedKeys = Array.from(allKeys).sort();

// // //   return (
// // //     <div className="max-w-7xl mx-auto p-4 md:p-8 bg-slate-50">
      
// // //       {/* --- Header Summary --- */}
// // //       <div className={`rounded-lg shadow-xl p-6 mb-8 border-l-8 ${isMatch ? 'border-gov-green bg-white' : 'border-red-600 bg-red-50'}`}>
// // //         <div className="flex items-center gap-4">
// // //           {isMatch 
// // //             ? <CheckCircle size={32} className="text-gov-green flex-shrink-0" /> 
// // //             : <XCircle size={32} className="text-red-600 flex-shrink-0" />
// // //           }
// // //           <div>
// // //             <h2 className="text-2xl font-bold text-gray-900">
// // //               {isMatch ? "Verification Successful: Documents Match" : "Verification Failed: Mismatch Found"}
// // //             </h2>
// // //             <p className="text-sm text-gray-500 mt-1">
// // //               {isMatch 
// // //                 ? "The two documents' core data fields are a 100% database match." 
// // //                 : `Found ${Object.keys(cleanDiff).length} mismatching field(s). Review the highlighted values below.`
// // //               }
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* --- Comparison Table --- */}
// // //       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
// // //         {/* Table Header */}
// // //         <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 font-bold text-sm text-gray-700 uppercase">
// // //           <div>Field</div>
// // //           <div className="flex items-center gap-2"><FileText size={16} /> Document 1 (Source A)</div>
// // //           <div className="flex items-center gap-2"><FileText size={16} /> Document 2 (Source B)</div>
// // //         </div>

// // //         {/* Table Body - Iterating over all fields */}
// // //         {/* <div className="divide-y divide-gray-200">
// // //           {sortedKeys.map(key => {
// // //             const value1 = cleanFile1[key];
// // //             const value2 = cleanFile2[key];
// // //             const isDiff = cleanDiff.hasOwnProperty(key);
            
// // //             // Handle complex objects/arrays by rendering a summary row
// // //             if (typeof value1 === 'object' && value1 !== null && key !== 'document_metadata') {
// // //                 return renderArrayComparison(key, value1, value2, isDiff);
// // //             }
            
// // //             // Handle primitive values and document_metadata fields
// // //             return renderFieldRow(key, value1, value2, isDiff);
// // //           })}

// // //           {sortedKeys.length === 0 && (
// // //             <div className="p-8 text-center text-gray-500">
// // //                 No comparable fields found in the documents.
// // //             </div>
// // //           )}
// // //         </div> */}
// // //         <div className="divide-y divide-gray-200">
// // //           {sortedKeys.map(key => {
// // //             const value1 = cleanFile1[key];
// // //             const value2 = cleanFile2[key];
// // //             const isDiff = cleanDiff.hasOwnProperty(key);
// // //            
// // //             // Check if the value is an Array AND not the specific 'document_metadata' object
// // //             // This ensures we correctly handle nested arrays like 'academic_info.subjects'
// // //             if (Array.isArray(value1) && key !== 'document_metadata') {
// // //                 return renderArrayComparison(key, value1 as any[], value2 as any[], isDiff);
// // //             }

// // //             // Handle nested objects that are NOT arrays (like 'document_metadata' or 'student_info')
// // //             if (typeof value1 === 'object' && value1 !== null) {
// // //                 return renderFieldRow(key, value1, value2, isDiff);
// // //             }
// // //             
// // //             // Handle primitive values
// // //             return renderFieldRow(key, value1, value2, isDiff);
// // //           })}
// // //         </div>
// // //       </div>
      
// // //       {/* --- Action Buttons --- */}
// // //       <div className="flex justify-center gap-4 mt-8">
// // //         <button 
// // //           onClick={resetFlow} 
// // //           className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
// // //         >
// // //           Submit Another Document
// // //         </button>
// // //         <button 
// // //           onClick={onComplete} 
// // //           className="px-6 py-2 bg-gov-blue text-white rounded shadow hover:bg-blue-800 font-bold"
// // //         >
// // //           Go to Dashboard
// // //         </button>
// // //       </div>

// // //     </div>
// // //   );
// // // };
// // import React from 'react';
// // import { FileText, CheckCircle, XCircle } from 'lucide-react';

// // // --- Type Definitions ---
// // interface ComparisonProps {
// //   file1: any; // Document data from Source A
// //   file2: any; // Document data from Source B
// //   diff: any;  // The parsed difference object
// //   onComplete: () => void;
// //   resetFlow: () => void;
// // }

// // // --- Helper Constants ---
// // const IGNORED_KEYS = ['_id', '__v', '$oid'];

// // // --- Helper Functions ---

// // /**
// //  * Recursively flattens JSON into a single object with dot notation keys (e.g., "marksheet.academic_info.sgpa").
// //  * Used to prepare both the data and the difference object for easy comparison.
// //  */
// // const flattenDocument = (obj: any, parentKey: string = '', filePrefix: 'file1' | 'file2' | undefined = undefined): Record<string, any> => {
// //     let result: Record<string, any> = {};

// //     for (const key in obj) {
// //         if (!obj.hasOwnProperty(key)) continue;

// //         if (IGNORED_KEYS.includes(key) || key.includes('$')) {
// //             continue; // Skip MongoDB internal keys
// //         }

// //         const newKey = parentKey ? `${parentKey}.${key}` : key;
// //         const value = obj[key];

// //         if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
// //             // Recurse for nested objects
// //             Object.assign(result, flattenDocument(value, newKey, filePrefix));
// //         } else if (Array.isArray(value)) {
// //             // For arrays, treat the entire array content as one field for simplicity.
// //             result[newKey] = `[${value.length} items]`; 
// //         } else {
// //             // Primitive value (string, number, boolean, null)
            
// //             // If processing the 'diff' object, extract the specific file's value
// //             if (filePrefix && typeof value === 'object' && value !== null) {
// //                 result[newKey] = value[filePrefix] ?? 'N/A';
// //             } else {
// //                  result[newKey] = value;
// //             }
// //         }
// //     }
// //     return result;
// // };


// // /**
// //  * Renders the values for a single field, applying color highlighting based on diff status.
// //  */
// // const renderFieldRow = (key: string, value1: any, value2: any, isDiff: boolean) => {
    
// //     // Function to ensure null and complex objects are displayed gracefully
// //     const formatValue = (value: any) => {
// //         if (value === null) return 'null';
// //         if (typeof value === 'object') return '...Object / Array...';
// //         return String(value);
// //     };
    
// //     // Highlight class for mismatched values
// //     const highlightClass = isDiff ? 'bg-red-200 text-red-900 font-semibold' : 'text-gray-800';
    
// //     // Cleans up dot notation for display name (e.g., marksheet.sgpa -> marksheet sgpa)
// //     const displayKey = key.replace(/\./g, ' ').replace(/_/g, ' ');

// //     return (
// //         <div className="grid grid-cols-3 gap-4 border-b border-gray-100 py-3 items-center hover:bg-gray-50">
// //           <div className="text-sm font-medium text-gray-500 pl-4">{displayKey}</div>
          
// //           {/* Value 1 (Source A) */}
// //           <div className={`text-sm pr-4 ${highlightClass}`}>{formatValue(value1)}</div>
          
// //           {/* Value 2 (Source B) */}
// //           <div className={`text-sm pr-4 ${highlightClass}`}>{formatValue(value2)}</div>
// //         </div>
// //     );
// // };

// // // --- Main Component ---
// // export const DocumentComparisonDisplay: React.FC<ComparisonProps> = ({ 
// //   file1, 
// //   file2, 
// //   diff, 
// //   onComplete, 
// //   resetFlow 
// // }) => {
  
// //   // 1. Flatten all documents and differences for easy key-based iteration and comparison
// //   const flatFile1 = flattenDocument(file1);
// //   const flatFile2 = flattenDocument(file2);
// //   // The flatDiff object will only contain keys that differ, holding the file1 value from the diff structure
// //   const flatDiff = flattenDocument(diff, '', 'file1'); 
  
// //   const isMatch = Object.keys(flatDiff).length === 0;
  
// //   // 2. Create a combined list of unique flattened keys for iteration
// //   const allKeys = new Set([...Object.keys(flatFile1), ...Object.keys(flatFile2)]);
// //   const sortedKeys = Array.from(allKeys).sort();

// //   return (
// //     <div className="max-w-7xl mx-auto p-4 md:p-8 bg-slate-50">
      
// //       {/* --- Header Summary --- */}
// //       <div className={`rounded-lg shadow-xl p-6 mb-8 border-l-8 ${isMatch ? 'border-gov-green bg-white' : 'border-red-600 bg-red-50'}`}>
// //         <div className="flex items-center gap-4">
// //           {isMatch 
// //             ? <CheckCircle size={32} className="text-gov-green flex-shrink-0" /> 
// //             : <XCircle size={32} className="text-red-600 flex-shrink-0" />
// //           }
// //           <div>
// //             <h2 className="text-2xl font-bold text-gray-900">
// //               {isMatch ? "Verification Successful: Documents Match" : "Verification Failed: Mismatch Found"}
// //             </h2>
// //             <p className="text-sm text-gray-500 mt-1">
// //               {isMatch 
// //                 ? "The two documents' core data fields are a 100% database match." 
// //                 : `Found ${Object.keys(flatDiff).length} mismatching field(s). Review the highlighted values below.`
// //               }
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* --- Comparison Table --- */}
// //       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
// //         {/* Table Header */}
// //         <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 font-bold text-sm text-gray-700 uppercase">
// //           <div>Field Path</div>
// //           <div className="flex items-center gap-2"><FileText size={16} /> Document 1 (Source A)</div>
// //           <div className="flex items-center gap-2"><FileText size={16} /> Document 2 (Source B)</div>
// //         </div>

// //         {/* Table Body - Iterating over all flattened fields */}
// //         <div className="divide-y divide-gray-200">
// //           {sortedKeys.map(key => {
// //             const value1 = flatFile1[key];
// //             const value2 = flatFile2[key];
            
// //             // Check if the flattened key exists in the flattened diff object
// //             const isDiff = flatDiff.hasOwnProperty(key); 
            
// //             return renderFieldRow(key, value1, value2, isDiff);
// //           })}

// //            {sortedKeys.length === 0 && (
// //             <div className="p-8 text-center text-gray-500">
// //                 No comparable fields found in the documents.
// //             </div>
// //           )}
// //         </div>
// //       </div>
      
// //       {/* --- Action Buttons --- */}
// //       <div className="flex justify-center gap-4 mt-8">
// //         <button 
// //           onClick={resetFlow} 
// //           className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
// //         >
// //           Submit Another Document
// //         </button>
// //         <button 
// //           onClick={onComplete} 
// //           className="px-6 py-2 bg-gov-blue text-white rounded shadow hover:bg-blue-800 font-bold"
// //         >
// //           Go to Dashboard
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // DocumentComparisonDisplay.tsx

// import React from 'react';
// import { FileText, CheckCircle, XCircle } from 'lucide-react';

// // --- Type Definitions ---
// interface ComparisonProps {
//   file1: any; // Document data from Source A
//   file2: any; // Document data from Source B
//   diff: any;  // The parsed difference object
//   onComplete: () => void;
//   resetFlow: () => void;
// }

// // --- Helper Constants ---
// const IGNORED_KEYS = ['_id', '__v', '$oid'];

// // --- Helper Functions ---

// /**
//  * Recursively flattens JSON into a single object with dot notation keys (e.g., "marksheet.academic_info.sgpa").
//  * Used to prepare both the data and the difference object for easy comparison.
//  */
// const flattenDocument = (obj: any, parentKey: string = '', filePrefix: 'file1' | 'file2' | undefined = undefined): Record<string, any> => {
//     let result: Record<string, any> = {};

//     for (const key in obj) {
//         if (!obj.hasOwnProperty(key)) continue;

//         if (IGNORED_KEYS.includes(key) || key.includes('$')) {
//             continue; // Skip MongoDB internal keys
//         }

//         const newKey = parentKey ? `${parentKey}.${key}` : key;
//         const value = obj[key];

//         if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
//             // Recurse for nested objects
//             Object.assign(result, flattenDocument(value, newKey, filePrefix));
//         } else if (Array.isArray(value)) {
//             // For arrays, treat the entire array content as one field for simplicity.
//             result[newKey] = `[${value.length} items]`; 
//         } else {
//             // Primitive value (string, number, boolean, null)
            
//             // If processing the 'diff' object, extract the specific file's value
//             if (filePrefix && typeof value === 'object' && value !== null) {
//                 result[newKey] = value[filePrefix] ?? 'N/A';
//             } else {
//                  result[newKey] = value;
//             }
//         }
//     }
//     return result;
// };


// /**
//  * Renders the values for a single field, applying color highlighting based on diff status.
//  */
// const renderFieldRow = (key: string, value1: any, value2: any, isDiff: boolean) => {
    
//     const formatValue = (value: any) => {
//         if (value === null) return 'null';
//         if (typeof value === 'object') return '...Object / Array...';
//         return String(value);
//     };
    
//     const highlightClass = isDiff ? 'bg-red-200 text-red-900 font-semibold' : 'text-gray-800';
    
//     const displayKey = key.replace(/\./g, ' ').replace(/_/g, ' ');

//     return (
//         <div className="grid grid-cols-3 gap-4 border-b border-gray-100 py-3 items-center hover:bg-gray-50">
//           <div className="text-sm font-medium text-gray-500 pl-4">{displayKey}</div>
          
//           <div className={`text-sm pr-4 ${highlightClass}`}>{formatValue(value1)}</div>
          
//           <div className={`text-sm pr-4 ${highlightClass}`}>{formatValue(value2)}</div>
//         </div>
//     );
// };

// // --- Main Component ---
// export const DocumentComparisonDisplay: React.FC<ComparisonProps> = ({ 
//   file1, 
//   file2, 
//   diff, 
//   onComplete, 
//   resetFlow 
// }) => {
  
//   // 1. Flatten all documents and differences for easy key-based iteration and comparison
//   const flatFile1 = flattenDocument(file1);
//   const flatFile2 = flattenDocument(file2);
//   const flatDiff = flattenDocument(diff, '', 'file1'); 
  
//   const isMatch = Object.keys(flatDiff).length === 0;
  
//   // 2. Create a combined list of unique flattened keys for iteration
//   const allKeys = new Set([...Object.keys(flatFile1), ...Object.keys(flatFile2)]);
//   const sortedKeys = Array.from(allKeys).sort();

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-8 bg-slate-50">
      
//       {/* --- Header Summary --- */}
//       <div className={`rounded-lg shadow-xl p-6 mb-8 border-l-8 ${isMatch ? 'border-gov-green bg-white' : 'border-red-600 bg-red-50'}`}>
//         <div className="flex items-center gap-4">
//           {isMatch 
//             ? <CheckCircle size={32} className="text-gov-green flex-shrink-0" /> 
//             : <XCircle size={32} className="text-red-600 flex-shrink-0" />
//           }
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {isMatch ? "Verification Successful: Documents Match" : "Verification Failed: Mismatch Found"}
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               {isMatch 
//                 ? "The two documents' core data fields are a 100% database match." 
//                 : `Found ${Object.keys(flatDiff).length} mismatching field(s). Review the highlighted values below.`
//               }
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* --- Comparison Table --- */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
//         {/* Table Header */}
//         <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 font-bold text-sm text-gray-700 uppercase">
//           <div>Field Path</div>
//           <div className="flex items-center gap-2"><FileText size={16} /> Document 1 (Source A)</div>
//           <div className="flex items-center gap-2"><FileText size={16} /> Document 2 (Source B)</div>
//         </div>

//         {/* Table Body - Iterating over all flattened fields */}
//         <div className="divide-y divide-gray-200">
//           {sortedKeys.map(key => {
//             const value1 = flatFile1[key];
//             const value2 = flatFile2[key];
            
//             const isDiff = flatDiff.hasOwnProperty(key); 
            
//             return renderFieldRow(key, value1, value2, isDiff);
//           })}

//            {sortedKeys.length === 0 && (
//             <div className="p-8 text-center text-gray-500">
//                 No comparable fields found in the documents.
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* --- Action Buttons --- */}
//       <div className="flex justify-center gap-4 mt-8">
//         <button 
//           onClick={resetFlow} 
//           className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
//         >
//           Submit Another Document
//         </button>
//         <button 
//           onClick={onComplete} 
//           className="px-6 py-2 bg-gov-blue text-white rounded shadow hover:bg-blue-800 font-bold"
//         >
//           Go to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };
// DocumentComparisonDisplay.tsx

import React from 'react';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

// --- Type Definitions ---
interface ComparisonProps {
  file1: any; // Document data from Source A
  file2: any; // Document data from Source B
  diff: any;  // The parsed difference object
  onComplete: () => void;
  resetFlow: () => void;
}

// --- Helper Constants ---
const IGNORED_KEYS = ['_id', '__v', '$oid'];

// --- Helper Functions ---

/**
 * Recursively flattens JSON into a single object with dot notation keys (e.g., "marksheet.academic_info.sgpa").
 * Used to prepare both the data and the difference object for easy comparison.
 */
const flattenDocument = (obj: any, parentKey: string = '', filePrefix: 'file1' | 'file2' | undefined = undefined): Record<string, any> => {
    let result: Record<string, any> = {};

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        if (IGNORED_KEYS.includes(key) || key.includes('$')) {
            continue; // Skip MongoDB internal keys
        }

        const newKey = parentKey ? `${parentKey}.${key}` : key;
        const value = obj[key];

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Recurse for nested objects
            Object.assign(result, flattenDocument(value, newKey, filePrefix));
        } else if (Array.isArray(value)) {
            // For arrays, treat the entire array content as one field for simplicity.
            result[newKey] = `[${value.length} items]`; 
        } else {
            // Primitive value (string, number, boolean, null)
            
            // If processing the 'diff' object, extract the specific file's value
            if (filePrefix && typeof value === 'object' && value !== null) {
                result[newKey] = value[filePrefix] ?? 'N/A';
            } else {
                 result[newKey] = value;
            }
        }
    }
    return result;
};


/**
 * Renders the values for a single field, applying color highlighting based on diff status.
 */
const renderFieldRow = (key: string, value1: any, value2: any, isDiff: boolean) => {
    
    const formatValue = (value: any) => {
        if (value === null) return 'null';
        if (typeof value === 'object') return '...Object / Array...';
        return String(value);
    };
    
    // The highlight class is applied to the data cells (value1 and value2)
    const highlightClass = isDiff ? 'bg-red-200 text-red-900 font-semibold' : 'text-gray-800';
    
    // FIX 2: Extract the clean display name (last segment of the dot notation key)
    const keySegments = key.split('.');
    const rawDisplayKey = keySegments[keySegments.length - 1];
    const displayKey = rawDisplayKey.replace(/_/g, ' '); // Clean up underscores

    return (
        // FIX 1: The key prop is added here to resolve the warning
        <div 
          key={key} 
          className="grid grid-cols-3 gap-4 border-b border-gray-100 py-3 items-center hover:bg-gray-50"
        >
          <div className="text-sm font-medium text-gray-500 pl-4">{displayKey}</div>
          
          {/* FIX 3: Ensure the highlight class is applied to the data cells for visibility */}
          <div className={`text-sm pr-4 ${isDiff ? highlightClass : 'text-gray-800'}`}>{formatValue(value1)}</div>
          
          <div className={`text-sm pr-4 ${isDiff ? highlightClass : 'text-gray-800'}`}>{formatValue(value2)}</div>
        </div>
    );
};

// --- Main Component ---
export const DocumentComparisonDisplay: React.FC<ComparisonProps> = ({ 
  file1, 
  file2, 
  diff, 
  onComplete, 
  resetFlow 
}) => {
  
  // 1. Flatten all documents and differences for easy key-based iteration and comparison
  const flatFile1 = flattenDocument(file1);
  const flatFile2 = flattenDocument(file2);
  const flatDiff = flattenDocument(diff, '', 'file1'); 
  
  const isMatch = Object.keys(flatDiff).length === 0;
  
  // 2. Create a combined list of unique flattened keys for iteration
  const allKeys = new Set([...Object.keys(flatFile1), ...Object.keys(flatFile2)]);
  const sortedKeys = Array.from(allKeys).sort();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-slate-50">
      
      {/* --- Header Summary --- */}
      <div className={`rounded-lg shadow-xl p-6 mb-8 border-l-8 ${isMatch ? 'border-gov-green bg-white' : 'border-red-600 bg-red-50'}`}>
        <div className="flex items-center gap-4">
          {isMatch 
            ? <CheckCircle size={32} className="text-gov-green flex-shrink-0" /> 
            : <XCircle size={32} className="text-red-600 flex-shrink-0" />
          }
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isMatch ? "Verification Successful: Documents Match" : "Verification Failed: Mismatch Found"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isMatch 
                ? "The two documents' core data fields are a 100% database match." 
                : `Found ${Object.keys(flatDiff).length} mismatching field(s). Review the highlighted values below.`
              }
            </p>
          </div>
        </div>
      </div>

      {/* --- Comparison Table --- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 font-bold text-sm text-gray-700 uppercase">
          <div>Field</div>
          <div className="flex items-center gap-2"><FileText size={16} /> Document 1 (Source A)</div>
          <div className="flex items-center gap-2"><FileText size={16} /> Document 2 (Source B)</div>
        </div>

        {/* Table Body - Iterating over all flattened fields */}
        <div className="divide-y divide-gray-200">
          {sortedKeys.map(key => {
            const value1 = flatFile1[key];
            const value2 = flatFile2[key];
            
            const isDiff = flatDiff.hasOwnProperty(key); 
            
            // The renderFieldRow function now includes the key prop on its root element
            return renderFieldRow(key, value1, value2, isDiff);
          })}

           {sortedKeys.length === 0 && (
            <div className="p-8 text-center text-gray-500">
                No comparable fields found in the documents.
            </div>
          )}
        </div>
      </div>
      
      {/* --- Action Buttons --- */}
      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={resetFlow} 
          className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
        >
          Submit Another Document
        </button>
        <button 
          onClick={onComplete} 
          className="px-6 py-2 bg-gov-blue text-white rounded shadow hover:bg-blue-800 font-bold"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};