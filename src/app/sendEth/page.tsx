// src/app/send-eth/page.js
'use client';
import React, { Suspense } from "react";
import SendEth from "@/components/SendEth";

export default function SendEthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SendEth />
    </Suspense>
  );
}
