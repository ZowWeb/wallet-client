import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, Table, Divider, Tag } from 'antd'

import { GlobalContext } from '../context/GlobalState'

const { Title } = Typography
const { Column } = Table

const Transactions = () => {
  const { wallet, setMessage } = useContext(GlobalContext)
  const [ transactions, setTransactions ] = useState([])

  // Get all transactions
  useEffect(async () => {
    try {
      const res = await axios.get('/api/transactions', {
        params: { walletId: wallet._id, skip: 0 },
      })
      setTransactions(res.data)
    } catch (error) {
      setMessage(error.response?.data)
    }
  }, [])
  return (
    <>
      <Divider><Title level={2}>Transactions</Title></Divider>
      <Table dataSource={transactions}>
        <Column title="Date" dataIndex="date" key="date" />
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          render={type => (
            <Tag color={type === 'CREDIT' ? 'green' : 'red'}>
              {type}
            </Tag>
          )}
        />
        <Column title="Amount" dataIndex="amount" key="amount" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Balance" dataIndex="balance" key="balance" />
      </Table>
    </>
  )
}

export default Transactions
