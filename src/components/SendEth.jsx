"use client"
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const SendETH = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Check if MetaMask is connected
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

  // Login with MetaMask
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

  // Send ETH transaction
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

      // Wait for confirmation
      await tx.wait();
      setStatus("Transaction confirmed!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Ethereum Wallet</h2>
      {walletAddress ? (
        <p>Connected Wallet: <b>{walletAddress}</b></p>
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
    </div>
  );
};

export default SendETH;
