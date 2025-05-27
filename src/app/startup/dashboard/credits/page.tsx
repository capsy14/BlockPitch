'use client'
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import AllCredits from '@/components/AllCredits'
import axios from 'axios'

const Credits = () => {
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    axios.get('/api/startupdata').then(res => {
      const startups = res.data.startups || [];
      // Flatten all transactions with startup name
      const allTx = startups.flatMap((startup) =>
        (startup.currentInvestors ?? []).map((investor) => ({
          ...investor,
          startupName: startup.startupName,
        }))
      );
      setAllTransactions(allTx);
    });
  }, []);

  return (
    <Layout>
      <div className="flex flex-1">
        <main className="flex-1 max-w-6xl mx-auto my-4 w-full px-2 sm:px-4 md:px-8">
          <AllCredits allTransactions={allTransactions} />
        </main>
      </div>
    </Layout>
  )
}

export default Credits