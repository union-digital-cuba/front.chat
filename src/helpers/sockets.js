import { io } from 'socket.io-client'
import Console from './console'

const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`

const Socket = {
  Current: undefined,
  InitializeConnection: () => {
    Socket.Current = io(url)
    Console.Log('Socket: Connected...')
  },
  Reconnection: () => {
    Socket.Current.on('connect_error', () => {
      Console.Log('Socket: Reconnecting...')
      setTimeout(() => {
        Socket.Current.connect()
      }, 1000)
    })
  },
  Disconnect: () => {
    Console.Log('Socket: Disconnected...')
    if (Socket.Current) Socket.Current.disconnect()
  },
  JoinRoom: (room) => {
    Console.Log('Socket: Add Room...')
    Socket.Current.emit('join', room)
  },
  LeaveRoom: () => {
    Console.Log('Socket: Leave Room...')
    Socket.Current.emit('leave')
  },
  AddUser: (user) => {
    Console.Log('Socket: Add User...')
    Socket.Current.emit('add-user', user)
  },
  SubscribeToMessages: (callBack) => {
    if (!Socket.Current) return true

    Socket.Current.on('message', (data) => {
      return callBack(data)
    })
  },
  SendMessage: ({ data, type }) => {
    if (Socket.Current) Socket.Current.emit('send-message', { data, type })
  },
}

export default Socket
