"use client";

import React, { useState, useEffect } from "react";
import ImageViewer from "./ImageViewer"; // Ensure this component exists

const UploadToPinata = () => {
  const [file, setFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [status, setStatus] = useState("");
  const [account, setAccount] = useState(null);

  // Check if MetaMask is connected
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setStatus("Wallet connected");
          }
        })
        .catch((err) => console.error("Error checking wallet:", err));
    }
  }, []);

  // Connect MetaMask wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is not installed");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setStatus("Wallet connected");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setStatus("Wallet connection failed");
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Upload file to Pinata
  const handleUpload = async () => {
    if (!account) {
      setStatus("Please connect your wallet first.");
      return;
    }
    if (!file) {
      setStatus("No file selected.");
      return;
    }
    setStatus("Uploading...");

    const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT; // Use JWT for secure API calls
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Upload failed:", result);
        setStatus("Upload failed: " + (result.error || JSON.stringify(result)));
        return;
      }

      const uploadedUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
      setIpfsUrl(uploadedUrl);
      setStatus("File successfully uploaded to Pinata!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("Upload failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Upload File to IPFS via Pinata</h2>

      {!account && (
        <button
          onClick={connectWallet}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Connect Wallet
        </button>
      )}

      <div>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
      </div>

      <p>{status}</p>

      {ipfsUrl && <ImageViewer ipfsUrl={ipfsUrl} />}
    </div>
  );
};

export default UploadToPinata;
