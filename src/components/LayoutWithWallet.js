import { useContext, useEffect } from 'react'
import { Layout, Spin } from 'antd'

import { GlobalContext } from '../context/GlobalState'

const LayoutWithWallet = ({ children }) => {
  const { isLoading, setWallet, message } = useContext(GlobalContext)

  useEffect(() => {
    if (localStorage.walletId) {
      setWallet(localStorage.walletId)
    }
  }, [ message?.id ])

  return (
    <Layout className="layout" message={message}>
      {isLoading ? <Spin /> : children}
    </Layout>
  )
}

export default LayoutWithWallet
