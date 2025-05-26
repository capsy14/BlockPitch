// src/app/send-eth/page.js
'use client';
import React from "react";
import SendEth from "@/components/SendEth"; 
// ^ If this import path doesn't work, try: 
// import SendEth from "../../components/ui/SendEth";

export default function SendEthPage() {
  return (
    <div>
      <SendEth />
    </div>
  );
}
