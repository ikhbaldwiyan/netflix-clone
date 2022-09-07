import React from 'react'
import Head from "next/head"
import Header from "./Header"

function Layout({children}: any) {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-800/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home - Netflix Clone</title>
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-10">
        {children}
      </main>
    </div>
  )
}

export default Layout