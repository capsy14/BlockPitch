"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import html2canvas from "html2canvas";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Send,
  Wallet,
  LinkIcon
} from "lucide-react";
// import {Link} from 'react-router-dom'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 
const SendETH = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [startupId, setStartupId] = useState("");
  const [startupName, setStartupName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedLinks, setUploadedLinks] = useState([]);
  const API_KEY = "94fd116fe26934e0a286";
  const API_SECRET =
    "b1ffafe6e06b8e8b07bca4284ce045d9087eab4a4040394d0e5ea29f9e34586d";
  const searchParams = useSearchParams();
  const startupIdFromQuery = searchParams.get("startupId") || "";
  const walletAddressFromQuery = searchParams.get("walletAddress") || "";
  const startupNameFromQuery = searchParams.get("startupName") || "";
  const { user } = useAuth();
   if (!user) {
    setStatus("You must be logged in as an investor to invest.");
    return;
  }
 



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
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const takeScreenshot = async () => {
    const canvas = await html2canvas(document.body, {
      scale: 2,
      useCORS: true
    });
    return new Promise((res) => canvas.toBlob(res, "image/png"));
  };

  const uploadToIPFS = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, `tx_${Date.now()}.png`);
    const resp = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Number.POSITIVE_INFINITY,
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET
        }
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
      setIsLoading(true);
      setStatus("Initiating transaction...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount)
      });
      setStatus(`Sent! Hash: ${tx.hash}`);
      await tx.wait();
      setStatus("Transaction confirmed! Taking screenshot...");

      const blob = await takeScreenshot();
      setStatus("Uploading to IPFS...");
      const ipfsUrl = await uploadToIPFS(blob);
      setStatus("Transaction recorded successfully!");

      const entry = {
        startupId,
        startupName,
        recipient,
        amount,
        ipfsUrl,
        timestamp: new Date().toISOString()
      };
      const updated = [...uploadedLinks, entry];
      setUploadedLinks(updated);
      localStorage.setItem("uploadedLinks", JSON.stringify(updated));

      // Clear form fields after successful transaction
      setStartupId("");
      setStartupName("");
      setRecipient("");
      setAmount("");

      // After transaction and IPFS upload succeed:
      await fetch("/api/investment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId,
          investorId: user.id, // get from your auth context
          name: user.name,
          email: user.email,
          amount,
          walletAddress
        })
      });
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  useEffect(() => {
    if (startupIdFromQuery) setStartupId(startupIdFromQuery);
    if (walletAddressFromQuery) setRecipient(walletAddressFromQuery);
    if (startupNameFromQuery) setStartupName(startupNameFromQuery);
  }, [startupIdFromQuery, walletAddressFromQuery, startupNameFromQuery]);

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="animate-spin mr-2" size={18} />;
    if (status.includes("Error"))
      return <AlertCircle className="mr-2 text-red-500" size={18} />;
    if (status.includes("confirmed") || status.includes("success"))
      return <CheckCircle className="mr-2 text-green-500" size={18} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mb-4 flex">
        <Link
          href="/investor/dashboard/startups"
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Startups
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center mb-6"
          >
            <Wallet className="h-10 w-10 text-slate-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              Ethereum Wallet
            </h1>
          </motion.div>

          {!walletAddress ? (
            <motion.div
              className="flex justify-center my-12"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-3 bg-slate-600 text-white font-medium rounded-lg shadow-md hover:bg-slate-700 transition-all duration-200 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />{" "}
                    Connecting...
                  </>
                ) : (
                  <>Login with MetaMask</>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-800 rounded-full">
                <Wallet className="h-4 w-4 mr-2" />
                <span className="font-medium">Connected: </span>
                <span className="ml-2 font-mono">
                  {formatAddress(walletAddress)}
                </span>
              </div>
            </motion.div>
          )}

          {walletAddress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                Transaction Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <motion.div whileHover={{ y: -2 }} className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1 group-hover:text-slate-600 transition-colors">
                    Startup ID
                  </label>
                  {/* <input
                    type="text"
                    placeholder="Enter startup ID"
                    value={startupId}
                    onChange={(e) => setStartupId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200"
                  /> */}
                  <input
                    type="text"
                    placeholder="Enter startup ID"
                    value={startupId}
                    onChange={(e) => setStartupId(e.target.value)}
                    readOnly={!!startupIdFromQuery}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg ... "
                  />
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1 group-hover:text-slate-600 transition-colors">
                    Startup Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter startup name"
                    value={startupName}
                    readOnly={!!startupNameFromQuery}
                    onChange={(e) => setStartupName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1 group-hover:text-slate-600 transition-colors">
                    Recipient Address
                  </label>
                  {/* <input
                    type="text"
                    placeholder="0x..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 font-mono text-sm"
                  /> */}
                  <input
                    type="text"
                    placeholder="0x..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    readOnly={!!walletAddressFromQuery}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg ... font-mono text-sm"
                  />
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1 group-hover:text-slate-600 transition-colors">
                    Amount (ETH)
                  </label>
                  <input
                    type="text"
                    placeholder="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </motion.div>
              </div>

              <div className="flex justify-center mt-8">
                <motion.button
                  onClick={sendETH}
                  disabled={isLoading}
                  className="flex items-center justify-center px-6 py-3 bg-slate-600 text-white font-medium rounded-lg shadow-md hover:bg-slate-700 transition-all duration-200 disabled:opacity-70"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />{" "}
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} /> Send ETH
                    </>
                  )}
                </motion.button>
              </div>
              <div>
                {status.includes("Transaction recorded successfully") && (
                  <div className="flex justify-center mt-8">
                    <Link href="/investor/dashboard/investments">
                      <Button className="bg-slate-600 text-white font-medium rounded-lg shadow-md hover:bg-slate-700 transition-all duration-200">
                        Go to Investment History
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${
                      status.includes("Error")
                        ? "bg-red-100 text-red-800"
                        : status.includes("confirmed") ||
                          status.includes("success")
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {getStatusIcon()}
                    <span>{status}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {uploadedLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 border-t border-gray-200 bg-gray-50 p-8"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Transaction History
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {[
                      "#",
                      "Startup ID",
                      "Startup Name",
                      "Recipient",
                      "Amount (ETH)",
                      "Proof"
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-t-lg"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uploadedLinks.map((item, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className={`${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-slate-50 transition-colors duration-150`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                        {item.startupId}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {item.startupName}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600">
                        {formatAddress(item.recipient)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {item.amount}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <motion.a
                          href={item.ipfsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <LinkIcon size={14} className="mr-1" />
                          View
                        </motion.a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SendETH;

// "use client"
// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const SendETH = () => {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [startupId, setStartupId] = useState("");
//   const [startupName, setStartupName] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [status, setStatus] = useState("");
//   const [uploadedLinks, setUploadedLinks] = useState([]);

//   const API_KEY = "94fd116fe26934e0a286";
//   const API_SECRET = "b1ffafe6e06b8e8b07bca4284ce045d9087eab4a4040394d0e5ea29f9e34586d";

//   useEffect(() => {
//     checkWalletConnection();
//     const stored = JSON.parse(localStorage.getItem("uploadedLinks")) || [];
//     setUploadedLinks(stored);
//   }, []);

//   const checkWalletConnection = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const accounts = await provider.send("eth_accounts", []);
//         if (accounts.length) setWalletAddress(accounts[0]);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   };

//   const connectWallet = async () => {
//     if (!window.ethereum) return alert("MetaMask required");
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       setWalletAddress(accounts[0]);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const takeScreenshot = async () => {
//     const canvas = await html2canvas(document.body, { scale: 2, useCORS: true });
//     return new Promise((res) => canvas.toBlob(res, "image/png"));
//   };

//   const uploadToIPFS = async (blob) => {
//     const formData = new FormData();
//     formData.append("file", blob, `tx_${Date.now()}.png`);
//     const resp = await axios.post(
//       "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       formData,
//       {
//         maxBodyLength: Infinity,
//         headers: {
//           "Content-Type": "multipart/form-data",
//           pinata_api_key: API_KEY,
//           pinata_secret_api_key: API_SECRET,
//         },
//       }
//     );
//     return `https://gateway.pinata.cloud/ipfs/${resp.data.IpfsHash}`;
//   };

//   const sendETH = async () => {
//     if (!window.ethereum) {
//       setStatus("MetaMask required");
//       return;
//     }
//     if (!startupId || !startupName || !recipient || !amount) {
//       setStatus("Fill in all fields");
//       return;
//     }
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const tx = await signer.sendTransaction({
//         to: recipient,
//         value: ethers.parseEther(amount),
//       });
//       setStatus(`Sent! Hash: ${tx.hash}`);
//       await tx.wait();
//       setStatus("Confirmed!");

//       const blob = await takeScreenshot();
//       const ipfsUrl = await uploadToIPFS(blob);

//       const entry = { startupId, startupName, recipient, amount, ipfsUrl };
//       const updated = [...uploadedLinks, entry];
//       setUploadedLinks(updated);
//       localStorage.setItem("uploadedLinks", JSON.stringify(updated));
//     } catch (e) {
//       setStatus(`Error: ${e.message}`);
//     }
//   };

//   return (
//     <div style={{ padding: 20, textAlign: "center" }}>
//       <h2>Ethereum Wallet</h2>
//       {!walletAddress ? (
//         <button onClick={connectWallet} style={btnStyle}>
//           Login with MetaMask
//         </button>
//       ) : (
//         <p>Connected: <b>{walletAddress}</b></p>
//       )}

//       {walletAddress && (
//         <>
//           <h3>Transaction Details</h3>
//           <input
//             type="text"
//             placeholder="Startup ID"
//             value={startupId}
//             onChange={(e) => setStartupId(e.target.value)}
//             style={inputStyle}
//           /><br/>
//           <input
//             type="text"
//             placeholder="Startup Name"
//             value={startupName}
//             onChange={(e) => setStartupName(e.target.value)}
//             style={inputStyle}
//           /><br/>
//           <input
//             type="text"
//             placeholder="Recipient Address"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//             style={inputStyle}
//           /><br/>
//           <input
//             type="text"
//             placeholder="Amount (ETH)"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             style={inputStyle}
//           /><br/>
//           <button onClick={sendETH} style={btnStyle}>
//             Send ETH
//           </button>
//           <p>{status}</p>
//         </>
//       )}

//       {uploadedLinks.length > 0 && (
//         <div style={{ marginTop: 40 }}>
//         <h2 style={{ fontFamily: "'Inter', sans-serif", color: "#222", marginBottom: "1rem" }}>
//           Previous Transaction Records
//         </h2>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               {["#", "Startup ID", "Startup Name", "Recipient", "Amount", "IPFS Image"].map((text) => (
//                 <th key={text} style={thStyle}>{text}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {uploadedLinks.map((item, i) => (
//               <tr
//                 key={i}
//                 style={ i % 2 === 0 ? { ...rowHoverStyle } : undefined }
//                 onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f7f8fa"}
//                 onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? "#fafbfc" : "white"}
//               >
//                 <td style={tdStyle}>{i + 1}</td>
//                 <td style={tdStyle}>{item.startupId}</td>
//                 <td style={tdStyle}>{item.startupName}</td>
//                 <td style={tdStyle}>{item.recipient}</td>
//                 <td style={tdStyle}>{item.amount}</td>
//                 <td style={tdStyle}>
//                   <a href={item.ipfsUrl} target="_blank" rel="noreferrer">
//                     Link
//                     {/* <img
//                       src={item.ipfsUrl}
//                       alt="tx"
//                       style={imgStyle}
//                       onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
//                       onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
//                     /> */}
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       )}
//     </div>
//   );
// };

// const inputStyle = {
//   padding: "10px",
//   width: "300px",
//   marginBottom: "10px",
// };

// const btnStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#008CBA",
//   color: "white",
//   border: "none",
//   cursor: "pointer",
// };

// // const tableStyle = {
// //   margin: "auto",
// //   borderCollapse: "collapse",
// //   width: "90%",
// //   textAlign: "center",
// // };

// // const imgStyle = {
// //   maxWidth: "200px",
// //   height: "auto",
// //   borderRadius: "8px",
// //   boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
// // };

// // At the top of your component file:
// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//   borderRadius: "8px",
//   overflow: "hidden",
//   marginTop: "2rem",
//   fontFamily: "'Inter', sans-serif",
// };

// const thStyle = {
//   backgroundColor: "#f5f7fa",
//   color: "#333",
//   textTransform: "uppercase",
//   fontSize: "0.875rem",
//   letterSpacing: "0.05em",
//   fontWeight: 600,
//   padding: "0.75rem 1rem",
//   textAlign: "left",
//   borderBottom: "2px solid #e1e4e8",
// };

// const tdStyle = {
//   padding: "0.75rem 1rem",
//   fontSize: "0.9rem",
//   color: "#555",
//   borderBottom: "1px solid #e1e4e8",
// };

// const imgStyle = {
//   width: "60px",
//   height: "60px",
//   objectFit: "cover",
//   borderRadius: "4px",
//   transition: "transform 0.2s ease",
//   cursor: "pointer",
// };

// const rowHoverStyle = {
//   backgroundColor: "#fafbfc",
// };

// export default SendETH;
