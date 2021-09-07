import { useContext } from 'react'
import { Typography, Form, Switch, Input, InputNumber, Button, Divider, notification } from 'antd'
import axios from 'axios'

import { GlobalContext } from '../context/GlobalState'

const { Title } = Typography

const CreateTransaction = () => {
  const { message, setMessage, setWallet } = useContext(GlobalContext)
  const [ form ] = Form.useForm()
  const onFinish = async values => {
    let { amount, type = true, description } = values
    amount = type ? +amount : -amount
    try {
      const { walletId } = localStorage
      const res = await axios.post(`/api/transact/${walletId}`, { amount, description })
      setWallet(walletId)
      form.resetFields()
      setMessage(res.data)
    } catch (error) {
      setMessage(error.response?.data)
      form.resetFields()
    }
  }

  return (
    <>
      <Divider><Title level={2}>Make a transaction</Title></Divider>
      <Form
        name="transaction"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[ { required: true, message: 'Please input amount between 0 to 9999!' } ]}
        >
          <InputNumber size="large" min={0} max={9999} />
        </Form.Item>
        <Form.Item
          label="Type of transaction"
          name="type"
        >
          <Switch
            size="large"
            checkedChildren="CREDIT"
            unCheckedChildren="DEBIT"
            defaultChecked
            className="transaction-type"
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[ { required: true, message: 'Please mention description!' } ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {message?.error && notification.error({ message: message.error })}
      {message?.balance && notification.success({ message: `Transaction successful. Balance remaining: ${message?.balance}` })}
    </>
  )
}

export default CreateTransaction
