import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import { GlobalProvider } from './context/GlobalState'
import LayoutWithWallet from './components/LayoutWithWallet'
import Navbar from './components/Navbar'
import WelcomeOrTransact from './components/WelcomeOrTransact'
import Transactions from './components/Transactions'

import 'antd/dist/antd.css'
import './App.css'

const { Footer, Content } = Layout

function App() {
  return (
    <GlobalProvider>
      <Router>
        <LayoutWithWallet>
          <Navbar />
          <Content className="site-layout-content">
            <Switch>
              <Route exact path="/" component={WelcomeOrTransact} />
            </Switch>
            <Switch>
              <Route exact path="/transactions" component={Transactions} />
            </Switch>
          </Content>
          <Footer>Zohaib Khan ©2021</Footer>
        </LayoutWithWallet>
      </Router>
    </GlobalProvider>
  )
}

export default App
