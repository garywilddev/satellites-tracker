import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SatellitePosition from '../components/SatellitePosition'

const satelliteIds = [
  '43567',
  '43566',
  '43565',
  /*'43564',
  '43058',
  '43057',
  '43056',
  '43055',
  '41862',
  '41861',
  '41860',
  '41859',
  '41550',
  '41549',
  '41175',
  '41174',
  '40890',
  '40129',
  '40128',
  '38858',
  '38857',
  '37847',
  '37846',*/
]

export default function Home() {
  const [count, setCount] = useState(0)

  function handleOnClick() {
    setCount(count + 1)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Satellites Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.grid}>
          <button
            type="submit"
            onClick={() => {
              console.log('click!')
              handleOnClick()
            }}
          >
            Get Satellites Position {`Clicked ${count} times`}
          </button>
          {count > 0 &&
            satelliteIds.map(id => <SatellitePosition id={id} count={count} />)}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
