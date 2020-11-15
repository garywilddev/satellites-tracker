import React from 'react'
import GoogleMapReact from 'google-map-react'
import HomeMarker from './HomeMarker'
import PositionMarker from './PositionMarker'
import PositionHoverInfo from './PositionHoverInfo'
import { OBSERVER_LAT, OBSERVER_LNG, OBSERVER_ALT } from '../constants'

export default function SatellitePositionMap({ positions, selectedId }) {
  const defaultProps = {
    center: {
      lat: OBSERVER_LAT,
      lng: OBSERVER_LNG,
    },
    zoom: 0,
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '150vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <PositionHoverInfo
          name="The office"
          lat={OBSERVER_LAT}
          lng={OBSERVER_LNG}
          alt={OBSERVER_ALT}
        >
          <HomeMarker />
        </PositionHoverInfo>
        {positions &&
          positions.map((position, index) => {
            const rank = index + 1
            return (
              <PositionHoverInfo
                key={index}
                rank={rank}
                lat={position.lat}
                lng={position.lng}
                alt={position.alt}
                id={position.id}
                name={position.name}
              >
                <PositionMarker
                  selected={position.id === selectedId}
                  text={rank}
                />
              </PositionHoverInfo>
            )
          })}
      </GoogleMapReact>
    </div>
  )
}
