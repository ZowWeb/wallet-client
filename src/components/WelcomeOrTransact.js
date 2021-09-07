import { useContext } from 'react'

import Welcome from './Welcome'
import CreateTransaction from './CreateTransaction'

import { GlobalContext } from '../context/GlobalState'

const WelcomeOrTransact = () => {
  const { wallet } = useContext(GlobalContext)
  return wallet?._id ? <CreateTransaction /> : <Welcome />
}

export default WelcomeOrTransact
