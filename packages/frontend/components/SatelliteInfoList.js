import CircularProgress from '@material-ui/core/CircularProgress'
import { DataGrid } from '@material-ui/data-grid'

export default function SatelliteInfoList({
  satellitesError,
  satellitesLoading,
  satellitesInfos,
  arePositionsLoading,
  arePositionsAvailable,
  handleSelectSatellite,
}) {
  const columns = [
    { field: 'rank', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'id', headerName: 'NORAD ID', width: 130 },
    { field: 'meanMotion', headerName: 'Mean motion (rev/day)', width: 200 },
    {
      field: 'lat',
      headerName: 'Latitude (°)',
      width: 130,
      renderCell: params =>
        arePositionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'lng',
      headerName: 'Longitude (°)',
      width: 130,
      renderCell: params =>
        arePositionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'alt',
      headerName: 'Altitude (m)',
      width: 130,
      renderCell: params =>
        arePositionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'azimuth',
      headerName: 'Azimuth (°)',
      width: 130,
      renderCell: params =>
        arePositionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'elevation',
      headerName: 'Elevation (°)',
      width: 130,
      renderCell: params =>
        arePositionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'rightAscension',
      headerName: 'Right Ascension (°)',
      width: 150,
      renderCell: params =>
        arePositionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'declination',
      headerName: 'Declination (°)',
      width: 130,
      renderCell: params =>
        arePositionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'eclipsed',
      headerName: 'Eclipsed (yes/no)',
      width: 150,
      renderCell: params =>
        arePositionsAvailable && (params.value ? 'Yes' : 'No'),
    },
  ]

  return (
    <div>
      {satellitesError && <div>`failed to load: ${satellitesError}`</div>}
      {satellitesLoading && <CircularProgress />}
      {satellitesInfos && (
        <div style={{ height: 400, width: '100%' }}>
          {' '}
          <DataGrid
            rows={satellitesInfos.map((info, index) => ({
              ...info,
              rank: index + 1,
            }))}
            columns={columns}
            hideFooterPagination
            onRowSelected={param => {
              return handleSelectSatellite({ id: param.data.id })
            }}
          />
        </div>
      )}
    </div>
  )
}
