import { UserContext } from 'context/UserProvider'
import { useContext } from 'react'

export default function useAuth() {
  return useContext(UserContext)
}
