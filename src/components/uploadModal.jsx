import React, { useState } from 'react';

const PitchUploader = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log('Uploading:', file);
      // Add your upload logic here (API call etc.)
      setShowModal(false);
      setFile(null);
    } else {
      alert('Please select a file!');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Pitch Materials</h2>

      <p className="text-gray-500 mb-4">No pitch materials uploaded yet.</p>

      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-900 text-white px-4 py-2 rounded-md"
      >
        + Add New
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Pitch Material</h3>
            <input
              type="file"
              accept=".pdf, .xls, .xlsx, .csv, .doc, .docx"
              onChange={handleFileChange}
              className="mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PitchUploader;
