import { useEffect } from 'react'
import { gql, useQuery, NetworkStatus } from '@apollo/client'

const OBSERVER_LAT = 48.8731039
const OBSERVER_LNG = 2.3128007
const OBSERVER_ALT = 87

export const POSITION = gql`
  query position(
    $id: ID!
    $observerLat: Float!
    $observerLng: Float!
    $observerAlt: Float!
  ) {
    position(
      id: $id
      observerLat: $observerLat
      observerLng: $observerLng
      observerAlt: $observerAlt
    ) {
      id
      time
      lat
      lng
      alt
    }
  }
`

export default function SatellitePosition({ id, count }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(POSITION, {
    variables: {
      id,
      observerLat: OBSERVER_LAT,
      observerLng: OBSERVER_LNG,
      observerAlt: OBSERVER_ALT,
    },
    notifyOnNetworkStatusChange: true,
  })

  // Dirty trick to force refetching when prop count changes
  useEffect(() => {
    refetch()
  }, [count])

  if (error) {
    return <div>failed to load</div>
  }
  if (loading || networkStatus === NetworkStatus.refetch) {
    return <div>loading...</div>
  }
  return (
    <div>
      {`rendered ${count} times`}
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
