import { useContext } from 'react'
import { Layout, Menu, Badge } from 'antd'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

const { Header } = Layout

const Navbar = () => {
  const { wallet } = useContext(GlobalContext)
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '0' ]}>
        <Menu.Item key="create-wallet">
          <Link to="/">Create new wallet</Link>
        </Menu.Item>
        {wallet?._id ? (
          <Menu.Item key="transactions">
            <Link to="/transactions">Transactions</Link>
          </Menu.Item>
        ) : null}
        <Menu.Item key="balance" className="balance">
          Balance <Badge.Ribbon text={`Wallet ${wallet?.balance}`} />
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default Navbar
