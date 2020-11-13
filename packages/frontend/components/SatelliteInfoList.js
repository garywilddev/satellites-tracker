import CircularProgress from '@material-ui/core/CircularProgress'

export default function SatelliteInfoList({
  satellitesError,
  satellitesLoading,
  satellitesInfos,
}) {
  return (
    <>
      {satellitesError && <div>`failed to load: ${satellitesError}`</div>}
      {satellitesLoading && <CircularProgress />}
      <ol>
        {satellitesInfos.map(({ name, id, meanMotion, lat, lng, alt }) => (
          <li>{`${name}${
            id ? ` (${id})` : ''
          }: meanMotion ${meanMotion} /  lat ${lat} / lng ${lng} / alt ${alt}`}</li>
        ))}
      </ol>
    </>
  )
}
