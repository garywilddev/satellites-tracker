import React from 'react'
import GoogleMapReact from 'google-map-react'
import HomeMarker from './HomeMarker'
import PositionMarker from './PositionMarker'
import PositionHoverInfo from './PositionHoverInfo'
import { OBSERVER_LAT, OBSERVER_LNG, OBSERVER_ALT } from '../constants'

export default function SatellitePositionMap({ positions }) {
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
          positions.map((position, index) => (
            <PositionHoverInfo
              index={index}
              lat={position.lat}
              lng={position.lng}
              alt={position.alt}
              id={position.id}
              name={position.name}
            >
              <PositionMarker text={index + 1} />
            </PositionHoverInfo>
          ))}
      </GoogleMapReact>
    </div>
  )
}
