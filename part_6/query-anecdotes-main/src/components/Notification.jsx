import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [value, dispatch] = useContext(NotificationContext)
  
  return value ? (
    <div style={style}>
      {value}
    </div>
  ) : null
}

export default Notification