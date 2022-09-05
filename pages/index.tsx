import type { NextPage } from 'next'
import Head from "next/head"
import Header from "../components/Header"

const Home: NextPage = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-800/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix Clone</title>
      </Head>
      <Header />
    </div>
  )
}

export default Home
