import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className="text-red-500 text-3xl">
          Welcome to <a className="font-semibold">Netflix Clone</a>
        </p>
      </main>
    </div>
  )
}

export default Home
