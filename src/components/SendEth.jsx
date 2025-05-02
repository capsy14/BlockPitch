"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import html2canvas from "html2canvas";
import axios from "axios";

const SendETH = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [uploadedLinks, setUploadedLinks] = useState([]);

  const API_KEY = "94fd116fe26934e0a286";
  const API_SECRET = "b1ffafe6e06b8e8b07bca4284ce045d9087eab4a4040394d0e5ea29f9e34586d";

  useEffect(() => {
    checkWalletConnection();
    const storedLinks = JSON.parse(localStorage.getItem("uploadedLinks")) || [];
    setUploadedLinks(storedLinks);
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const takeScreenshot = async () => {
    const element = document.body;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });
    return new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
  };

  const uploadToIPFS = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, `transaction_${Date.now()}.png`);

    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: API_KEY,
        pinata_secret_api_key: API_SECRET,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  };

  const sendETH = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is required!");
      return;
    }
    if (!recipient || !amount) {
      setStatus("Enter recipient and amount.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      setStatus(`Transaction sent! Hash: ${tx.hash}`);
      await tx.wait();
      setStatus("Transaction confirmed!");

      const blob = await takeScreenshot();
      const ipfsUrl = await uploadToIPFS(blob);

      const newLinks = [...uploadedLinks, { ipfsUrl, recipient, amount }];
      setUploadedLinks(newLinks);
      localStorage.setItem("uploadedLinks", JSON.stringify(newLinks));
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Ethereum Wallet</h2>
      {walletAddress ? (
        <p>
          Connected Wallet: <b>{walletAddress}</b>
        </p>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login with MetaMask
        </button>
      )}

      {walletAddress && (
        <>
          <h2>Send ETH</h2>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
          />
          <br />
          <input
            type="text"
            placeholder="Amount (ETH)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
          />
          <br />
          <button
            onClick={sendETH}
            style={{
              padding: "10px 20px",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Send ETH
          </button>
          <p>{status}</p>
        </>
      )}

      {uploadedLinks.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>Transaction Screenshots</h2>
          <table style={{ margin: "auto", borderCollapse: "collapse", width: "90%" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid black", padding: "10px" }}>#</th>
                <th style={{ borderBottom: "1px solid black", padding: "10px" }}>Recipient</th>
                <th style={{ borderBottom: "1px solid black", padding: "10px" }}>Amount (ETH)</th>
                <th style={{ borderBottom: "1px solid black", padding: "10px" }}>Screenshot</th>
              </tr>
            </thead>
            <tbody>
              {uploadedLinks.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px" }}>{index + 1}</td>
                  <td style={{ padding: "10px" }}>{item.recipient}</td>
                  <td style={{ padding: "10px" }}>{item.amount}</td>
                  <td style={{ padding: "10px" }}>
                    <a href={item.ipfsUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={item.ipfsUrl}
                        alt={`Screenshot ${index + 1}`}
                        style={{
                          maxWidth: "300px",
                          maxHeight: "200px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SendETH;
