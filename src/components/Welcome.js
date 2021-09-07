import { useContext } from 'react'
import { Typography, Form, Input, InputNumber, Button, Divider, notification } from 'antd'
import axios from 'axios'

import { GlobalContext } from '../context/GlobalState'

const { Title } = Typography

const Welcome = () => {
  const { wallet, message, setMessage } = useContext(GlobalContext)
  const onFinish = async values => {
    const { name, balance = 0 } = values
    const res = await axios.post('/api/setup', { name, balance })
    localStorage.setItem('walletId', res.data.id)
    setMessage(res.data)
  }

  return (
    <>
      <Divider><Title level={2}>Welcome</Title></Divider>
      <Form
        name="wallet"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Wallet Name"
          name="name"
          rules={[ { required: true, message: 'Please input your wallet name!' } ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Initial Balance"
          name="balance"
        >
          <InputNumber size="large" min={0} max={9999} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {wallet?.id && notification.success({ message: `Wallet created succesfully. Balance is ${message.balance}` })}
    </>
  )
}

export default Welcome
