const Notification = ({message}) => {

  const notificationStyle = {
    border: '2px solid green',
    color: 'green',
    fontSize: 16,
    padding: '10 0',
  }

  if (message === null) {
    return null
  }
  return (
    <p style={notificationStyle}>{message}</p>
  )
}

export default Notification;