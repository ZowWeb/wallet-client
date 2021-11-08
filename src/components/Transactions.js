import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, Table, Divider, Tag, Button } from 'antd'
import { CSVLink } from 'react-csv'

import { GlobalContext } from '../context/GlobalState'

const { Title } = Typography
const { Column } = Table

const Transactions = () => {
  const { wallet, setMessage } = useContext(GlobalContext)
  const [ transactions, setTransactions ] = useState([])

  // Prepare CSV data
  const csvData = [
    [ 'Date', 'Type', 'Amount (₹)', 'Description', 'Balance (₹)' ],
  ]
  transactions.forEach(({ date, type, amount, description, balance }) => csvData.push(
    [ new Date(date).toLocaleDateString(), type, amount, description, balance ],
  ))

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
    return () => {}
  }, [ wallet ])
  return (
    <>
      <Divider><Title level={2}>Transactions</Title></Divider>
      <Table dataSource={transactions} bordered loading={!transactions.length}>
        <Column
          title="Date"
          dataIndex="date"
          key="date"
          sorter={(a, b) => new Date(a.date) - new Date(b.date)}
          render={date => <div>{new Date(date).toLocaleDateString()}</div>}
        />
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
        <Column title="Amount (&#8377;)" dataIndex="amount" key="amount" sorter={(a, b) => a.amount - b.amount} />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Balance (&#8377;)" dataIndex="balance" key="balance" />
      </Table>
      <Button type="primary" loading={!transactions.length}>
        <CSVLink data={csvData} filename={`wallet-${wallet._id}-transactions.csv`}>Export to CSV</CSVLink>
      </Button>
    </>
  )
}

export default Transactions
