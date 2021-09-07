import { useContext } from 'react'
import { Layout, Menu, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'
import constants from '../constant'

const { Header } = Layout
const { Title } = Typography

const Navbar = () => {
  const { wallet } = useContext(GlobalContext)
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '0' ]}>
        {wallet?._id ? (
          <>
            <Menu.Item key="home">
              <Link to="/">Create transaction</Link>
            </Menu.Item>
            <Menu.Item key="transactions">
              <Link to="/transactions">Transactions</Link>
            </Menu.Item>
            <Menu.Item key="balance" className="wallet">
              <img src={constants.walletIcon} alt="wallet-icon" /><Title level={5}>&#8377;{wallet?.balance}</Title>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="create-wallet">
            <Link to="/">Create new wallet</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  )
}

export default Navbar
