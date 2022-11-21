import { io } from 'socket.io-client'
import Console from './console'

const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`

const Socket = {
  Current: undefined,
  InitializeConnection: () => {
    Socket.Current = io(url)
    Console.Log('Socket: Connected...}')
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
    if (Socket.Current) {
      Socket.Current.disconnect()
    }
  },
  AddUser: ({ name, room }) => {
    Socket.Current.emit('new-user', { name, room })
  },
  JoinRoom: ({ name, room }) => {
    Socket.Current.emit('join', { name, room })
  },
  LeaveRoom: ({ name, room }) => {
    Socket.Current.emit('leave', { name, room })
  },
  SubscribeToMessages: (callBack) => {
    if (!Socket.Current) return true

    Socket.Current.on('message', (data) => {
      return callBack(data)
    })
  },
  SendMessage: ({ room, message }) => {
    if (Socket.Current) Socket.Current.emit('send-message', { room, message })
  },
}

export default Socket
