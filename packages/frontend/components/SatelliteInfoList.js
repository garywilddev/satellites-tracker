import CircularProgress from '@material-ui/core/CircularProgress'
import { DataGrid } from '@material-ui/data-grid'

export default function SatelliteInfoList({
  satellitesError,
  satellitesLoading,
  satellitesInfos,
  positionsLoading,
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
        positionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'lng',
      headerName: 'Longitude (°)',
      width: 130,
      renderCell: params =>
        positionsLoading ? <CircularProgress /> : params.value,
    },
    {
      field: 'alt',
      headerName: 'Altitude (m)',
      width: 130,
      renderCell: params =>
        positionsLoading ? <CircularProgress /> : params.value,
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
