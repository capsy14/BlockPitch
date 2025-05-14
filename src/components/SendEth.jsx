"use client"
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import html2canvas from "html2canvas";
import axios from "axios";

const SendETH = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [startupId, setStartupId] = useState("");
  const [startupName, setStartupName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [uploadedLinks, setUploadedLinks] = useState([]);

  const API_KEY = "94fd116fe26934e0a286";
  const API_SECRET = "b1ffafe6e06b8e8b07bca4284ce045d9087eab4a4040394d0e5ea29f9e34586d";

  useEffect(() => {
    checkWalletConnection();
    const stored = JSON.parse(localStorage.getItem("uploadedLinks")) || [];
    setUploadedLinks(stored);
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length) setWalletAddress(accounts[0]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask required");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const takeScreenshot = async () => {
    const canvas = await html2canvas(document.body, { scale: 2, useCORS: true });
    return new Promise((res) => canvas.toBlob(res, "image/png"));
  };

  const uploadToIPFS = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, `tx_${Date.now()}.png`);
    const resp = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET,
        },
      }
    );
    return `https://gateway.pinata.cloud/ipfs/${resp.data.IpfsHash}`;
  };

  const sendETH = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask required");
      return;
    }
    if (!startupId || !startupName || !recipient || !amount) {
      setStatus("Fill in all fields");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });
      setStatus(`Sent! Hash: ${tx.hash}`);
      await tx.wait();
      setStatus("Confirmed!");

      const blob = await takeScreenshot();
      const ipfsUrl = await uploadToIPFS(blob);

      const entry = { startupId, startupName, recipient, amount, ipfsUrl };
      const updated = [...uploadedLinks, entry];
      setUploadedLinks(updated);
      localStorage.setItem("uploadedLinks", JSON.stringify(updated));
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Ethereum Wallet</h2>
      {!walletAddress ? (
        <button onClick={connectWallet} style={btnStyle}>
          Login with MetaMask
        </button>
      ) : (
        <p>Connected: <b>{walletAddress}</b></p>
      )}

      {walletAddress && (
        <>
          <h3>Transaction Details</h3>
          <input
            type="text"
            placeholder="Startup ID"
            value={startupId}
            onChange={(e) => setStartupId(e.target.value)}
            style={inputStyle}
          /><br/>
          <input
            type="text"
            placeholder="Startup Name"
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            style={inputStyle}
          /><br/>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={inputStyle}
          /><br/>
          <input
            type="text"
            placeholder="Amount (ETH)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          /><br/>
          <button onClick={sendETH} style={btnStyle}>
            Send ETH
          </button>
          <p>{status}</p>
        </>
      )}

      {uploadedLinks.length > 0 && (
        <div style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: "'Inter', sans-serif", color: "#222", marginBottom: "1rem" }}>
          Previous Transaction Records
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              {["#", "Startup ID", "Startup Name", "Recipient", "Amount", "IPFS Image"].map((text) => (
                <th key={text} style={thStyle}>{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uploadedLinks.map((item, i) => (
              <tr
                key={i}
                style={ i % 2 === 0 ? { ...rowHoverStyle } : undefined }
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f7f8fa"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? "#fafbfc" : "white"}
              >
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{item.startupId}</td>
                <td style={tdStyle}>{item.startupName}</td>
                <td style={tdStyle}>{item.recipient}</td>
                <td style={tdStyle}>{item.amount}</td>
                <td style={tdStyle}>
                  <a href={item.ipfsUrl} target="_blank" rel="noreferrer">
                    Link
                    {/* <img
                      src={item.ipfsUrl}
                      alt="tx"
                      style={imgStyle}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    /> */}
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

const inputStyle = {
  padding: "10px",
  width: "300px",
  marginBottom: "10px",
};

const btnStyle = {
  padding: "10px 20px",
  backgroundColor: "#008CBA",
  color: "white",
  border: "none",
  cursor: "pointer",
};

// const tableStyle = {
//   margin: "auto",
//   borderCollapse: "collapse",
//   width: "90%",
//   textAlign: "center",
// };

// const imgStyle = {
//   maxWidth: "200px",
//   height: "auto",
//   borderRadius: "8px",
//   boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
// };

// At the top of your component file:
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  marginTop: "2rem",
  fontFamily: "'Inter', sans-serif",
};

const thStyle = {
  backgroundColor: "#f5f7fa",
  color: "#333",
  textTransform: "uppercase",
  fontSize: "0.875rem",
  letterSpacing: "0.05em",
  fontWeight: 600,
  padding: "0.75rem 1rem",
  textAlign: "left",
  borderBottom: "2px solid #e1e4e8",
};

const tdStyle = {
  padding: "0.75rem 1rem",
  fontSize: "0.9rem",
  color: "#555",
  borderBottom: "1px solid #e1e4e8",
};

const imgStyle = {
  width: "60px",
  height: "60px",
  objectFit: "cover",
  borderRadius: "4px",
  transition: "transform 0.2s ease",
  cursor: "pointer",
};

const rowHoverStyle = {
  backgroundColor: "#fafbfc",
};


export default SendETH;
