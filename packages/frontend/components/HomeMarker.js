const K_SIZE = 5

const style = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,
  display: 'table',

  border: '5px solid black',
  borderRadius: 3 * K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#f44336',
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
}

export default function HomeMarker({ text }) {
  return <div style={style}>{text}</div>
}
