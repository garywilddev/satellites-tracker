const K_SIZE = 5
const FONT_SIZE = 12

const style = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: FONT_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,
  display: 'table',

  border: '5px solid #f44336',
  borderRadius: 3 * K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: FONT_SIZE,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
}

export default function PositionMarker({ text }) {
  return <div style={style}>{text}</div>
}
