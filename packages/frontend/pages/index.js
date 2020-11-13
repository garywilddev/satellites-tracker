import { useState } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import Head from 'next/head'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from '../styles/Home.module.css'
import SatelliteInfoList from '../components/SatelliteInfoList'
import SatellitePositionMap from '../components/SatellitePositionMap'
import { OBSERVER_LAT, OBSERVER_LNG, OBSERVER_ALT } from '../constants'
import { initializeApollo } from '../lib/apolloClient'

export const ALL_SATELLITES = gql`
  query allSatellites {
    satellites: allSatellites {
      id
      name
      meanMotion
    }
  }
`

const ALL_POSITIONS = gql`
  query allPositions(
    $ids: [ID!]!
    $observerLat: Float!
    $observerLng: Float!
    $observerAlt: Float!
  ) {
    positions: allPositions(
      ids: $ids
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

  const {
    loading: satellitesLoading,
    error: satellitesError,
    data: satellitesData,
  } = useQuery(ALL_SATELLITES)

  const [
    getPositions,
    {
      loading: positionsLoading,
      error: positionsError,
      data: positionsData,
      refetch: refetchPositions,
    },
  ] = useLazyQuery(ALL_POSITIONS, {
    variables: {
      ids: satellitesData.satellites.map(({ id }) => id),
      observerLat: OBSERVER_LAT,
      observerLng: OBSERVER_LNG,
      observerAlt: OBSERVER_ALT,
    },
    notifyOnNetworkStatusChange: true,
  })

  function handleOnClick() {
    count === 0 ? getPositions() : refetchPositions()
    setCount(count + 1)
  }

  // Sort satellites info by mean motion
  let infos = [...satellitesData.satellites].sort(
    (a, b) => a.meanMotion - b.meanMotion,
  )

  // Attribute a position to a satellite when positions are available
  if (positionsData && positionsData.positions) {
    infos = infos.map(info => ({
      ...info,
      ...positionsData.positions.find(({ id }) => id === info.id),
    }))
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
        {infos && (
          <div className={styles.grid}>
            <SatelliteInfoList
              satellitesLoading={satellitesLoading}
              satellitesError={satellitesError}
              satellitesInfos={infos}
            />
          </div>
        )}
        {positionsError && <div>`failed to load: {positionsError}`</div>}
        {positionsLoading && <CircularProgress />}
        {positionsData && (
          <>
            <SatellitePositionMap positions={infos} />
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

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_SATELLITES,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}
