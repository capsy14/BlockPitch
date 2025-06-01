import React from 'react'
import Layout from '@/components/Layout'
import InvestorChatPage from '@/components/investorDashboard'
const InvestorChat = () => {
  return (
    <Layout>
        <div className="flex flex-col ">
          <main className="flex-1 p-6 space-y-6">
            
                <InvestorChatPage />
            
              
            
          </main>
        </div>
        </Layout>
  )
}

export default InvestorChat;