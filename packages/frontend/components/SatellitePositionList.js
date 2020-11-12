export default function SatellitePositionList({ positions }) {
  return (
    <ol>
      {positions.map(({ name, id, lat, lng, alt }) => (
        <li>{`${name}${
          id ? ` (${id})` : ''
        }: lat ${lat} / lng ${lng} / alt ${alt}`}</li>
      ))}
    </ol>
  )
}
