// src/app/send-eth/page.js
import React from "react";
import SendEth from "@/components/UploadIPFS"; 
import { Upload } from "lucide-react";
import UploadToPinata from "@/components/UploadIPFS";
// ^ If this import path doesn't work, try: 
// import SendEth from "../../components/ui/SendEth";

export default function SendEthPage() {
  return (
    <div>
      <UploadToPinata/>
    </div>
  );
}
