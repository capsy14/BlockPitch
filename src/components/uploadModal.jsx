import React, { useState } from 'react';
import axios from 'axios';

const PitchUploader = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null); // Store uploaded file URL

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await axios.post('/api/upload-pitch', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Use 'path' from backend response
      setUploadedFileUrl(res.data.path);
      alert('File uploaded successfully!');
      setShowModal(false);
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('File upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-900 text-white px-4 py-2 rounded-md"
      >
        + Add New
      </button>

      {uploadedFileUrl && (
        <div className="mt-4">
          <p className="text-green-600">Uploaded File:</p>
          <a
            href={uploadedFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Uploaded File
          </a>
          <div className="mt-2">
            <embed
              src={uploadedFileUrl}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Pitch Material</h3>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PitchUploader;
