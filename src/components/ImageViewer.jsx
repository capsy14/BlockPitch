import React from "react";

const ImageViewer = ({ ipfsUrl }) => {
  if (!ipfsUrl) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Uploaded Image:</h3>
      <img
        src={ipfsUrl}
        alt="Uploaded file from IPFS"
        style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default ImageViewer;
