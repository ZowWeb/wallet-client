import { Layout, Empty } from 'antd'

import 'antd/dist/antd.css'
import './App.css'

const { Header, Footer, Content } = Layout

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content className="site-layout-content">
        <Empty description="No content yet..." />
      </Content>
      <Footer>Zohaib Khan ©2021</Footer>
    </Layout>
  )
}

export default App
