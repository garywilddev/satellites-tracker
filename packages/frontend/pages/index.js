import { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import Head from 'next/head'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from '../styles/Home.module.css'
import SatellitePositionList from '../components/SatellitePositionList'
import SatellitePositionMap from '../components/SatellitePositionMap'
import { OBSERVER_LAT, OBSERVER_LNG, OBSERVER_ALT } from '../constants'

const ALL_POSITIONS = gql`
  query allPositions(
    $observerLat: Float!
    $observerLng: Float!
    $observerAlt: Float!
  ) {
    positions: allPositions(
      observerLat: $observerLat
      observerLng: $observerLng
      observerAlt: $observerAlt
    ) {
      id
      name
      time
      lat
      lng
      alt
    }
  }
`

export default function Home() {
  const [count, setCount] = useState(0)
  const [getPositions, { loading, error, data, refetch }] = useLazyQuery(
    ALL_POSITIONS,
    {
      variables: {
        observerLat: OBSERVER_LAT,
        observerLng: OBSERVER_LNG,
        observerAlt: OBSERVER_ALT,
      },
      notifyOnNetworkStatusChange: true,
    },
  )

  function handleOnClick() {
    count === 0 ? getPositions() : refetch()
    setCount(count + 1)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Satellites Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Satellites Tracker</h1>
        <div className={styles.grid}>
          <button
            type="submit"
            onClick={() => {
              handleOnClick()
            }}
          >
            Get Satellites Positions
          </button>
        </div>
        {error && <div>`failed to load: {error}`</div>}
        {loading && <CircularProgress />}
        {data && data.positions && (
          <>
            <SatellitePositionList
              error={error}
              loading={loading}
              positions={data.positions}
            />
            <SatellitePositionMap positions={data.positions} />
          </>
        )}
      </main>
      <footer className={styles.footer}>
        <p>
          {'Made with '}
          <span className={styles.love} />
          {' by Gary'}
        </p>
      </footer>
    </div>
  )
}
