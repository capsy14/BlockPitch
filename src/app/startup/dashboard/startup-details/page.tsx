import StartupDetails from "@/components/startupDetailFill"
import React from 'react'
import Layout from "@/components/Layout";
const StartForm = () => {
  return (
    <Layout>
     <div className="flex flex-1">
     
        <main className="flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 md:px-8">
      <StartupDetails/>
      </main>
    </div>
    
    </Layout>
  )
}

export default StartForm;
