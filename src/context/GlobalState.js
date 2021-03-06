import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import AppReducer from './AppReducer'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

// Initial State
const initialState = {
  isLoading: false,
  message: {},
  wallet: {},
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(AppReducer, initialState)

  // Actions
  function setLoading() {
    dispatch({
      type: 'IS_LOADING',
    })
  }

  function setMessage(message) {
    dispatch({
      type: 'SET_MESSAGE',
      payload: message,
    })
  }

  async function setWallet(walletId) {
    try {
      dispatch({
        type: 'IS_LOADING',
      })
      // Get wallet details
      const res = await axios.get(`/api/wallet/${walletId}`)
      dispatch({
        type: 'SET_WALLET',
        payload: res.data,
      })
    } catch (error) {
      setMessage(error.response?.data)
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        isLoading: state.isLoading,
        message: state.message,
        wallet: state.wallet,
        setLoading,
        setWallet,
        setMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
