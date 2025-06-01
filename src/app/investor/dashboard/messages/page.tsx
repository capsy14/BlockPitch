"use client";
import React from "react";
import InvestorMessages from "@/components/investorMessages";
import Layout from "@/components/Layout";

const InvestorMessage = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen ">
        <main className="flex-1 p-6 space-y-6 min-h-[70vh]">
          <InvestorMessages />
        </main>
      </div>
    </Layout>
  );
};

export default InvestorMessage;
