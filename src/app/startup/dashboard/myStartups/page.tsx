'use client'
import React from 'react'
import MyStartup from "@/components/myStartups"
import Layout from "@/components/Layout"
const MyStartups = () => {
  return (
  
    <Layout>
      <div className="flex flex-1">
     
        <main className="flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 md:px-8">
          <MyStartup />
        </main>
      </div>
    </Layout>
  )
}

export default MyStartups