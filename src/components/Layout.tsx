import React from "react";
import Header from "@/components/header"; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Header />
       */}
       
       <div className=" top-0 z-50 bg-white shadow">
        <Header />
      </div>
      <main>{children}</main>
    </>
  );
}
