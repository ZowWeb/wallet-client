import { useContext, useEffect } from 'react'
import { Layout, Spin, notification } from 'antd'

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
      {message?.error429 && notification.error({ message: message.error429 })}
    </Layout>
  )
}

export default LayoutWithWallet
