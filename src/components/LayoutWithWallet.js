import { useContext, useEffect } from 'react'
import { Layout, Spin } from 'antd'

import { GlobalContext } from '../context/GlobalState'

const LayoutWithWallet = ({ children }) => {
  const { isLoading, setWallet, error } = useContext(GlobalContext)

  useEffect(() => {
    if (localStorage.walletId) {
      setWallet(localStorage.walletId)
    }
    return () => {}
  }, [ localStorage.walletId ])

  return (
    <Layout className="layout" error={error}>
      {isLoading ? <Spin /> : children}
    </Layout>
  )
}

export default LayoutWithWallet
