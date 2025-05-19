import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";

const SEPOLIA_RPC = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;

const MetaMaskLogin = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("0.0000");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      logout();
    } else {
      setWalletAddress(accounts[0]);
      fetchBalance(accounts[0]);
    }
  };

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          fetchBalance(accounts[0]);
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
      fetchBalance(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleChangeWallet = async () => {
    const confirmed = window.confirm("Do you want to change your MetaMask account?");
    if (confirmed) {
      setWalletAddress("");
      setBalance("0.0000");
      await connectWallet();
    }
  };

  const fetchBalance = async (address) => {
    try {
      const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC);
      const balanceBigNumber = await provider.getBalance(address);
      setBalance(parseFloat(ethers.formatEther(balanceBigNumber)).toFixed(4));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const logout = async () => {
    const confirmed = window.confirm(
      "Do you want to disconnect from MetaMask? (Note: You may still need to disconnect manually from MetaMask)"
    );
    if (confirmed) {
      setWalletAddress("");
      setBalance("0.0000");
      setDropdownOpen(false);
    }
  };

  return (
    <div className="relative">
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 border-gray-200 border-[1px] rounded"
        >
          Login with MetaMask
        </button>
      ) : (
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center cursor-pointer p-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <span className="text-sm font-medium">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <span className="ml-2 text-sm font-semibold">({balance} ETH)</span>
          </div>

          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3 z-10">
              <div className="border-b pb-2 flex justify-between items-center">
                <p className="text-sm text-gray-700">Wallet:</p>
                <p className="text-sm font-medium">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>

              <div className="py-2 flex justify-between text-sm">
                <span className="text-gray-700">Balance:</span>
                <span className="font-semibold">{balance} ETH</span>
              </div>

              
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MetaMaskLogin;
