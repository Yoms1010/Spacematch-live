import React from 'react'
import DataTable from './cardsui/DataTable'
import Tabs from './cardsui/Tabs';
import { Column, ClientSubDataProps} from '@/types';


function clientSubTransactions({clientSubTransactions}: {clientSubTransactions: ClientSubDataProps[]}) {

let subTransaction: ClientSubDataProps[] | any = [];
  subTransaction = clientSubTransactions.map((item: ClientSubDataProps, i: number) => (
    {
      id: i+1, 
      title: item.title, 
      currency: item.currency, 
      amount: `${Number(item.amount).toLocaleString()}`, 
      transaction_ref: item.transaction_ref,
      payment_option: item.payment_option,
      status: item.status,
      created_at: item.created_at.split(".")[0]
    }
  ))


  const columns: Column<ClientSubDataProps>[] = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Title', accessor: 'title', sortable: true },
    { header: 'Currency', accessor: 'currency', sortable: true },
    { header: 'Amount', accessor: 'amount', sortable: true },
    { header: 'Transaction Reference', accessor: 'transaction_ref', sortable: false },
    { header: 'Payment Method', accessor: 'payment_option', sortable: false },
    { header: 'Status', accessor: 'status', sortable: false },
    { header: 'Date', accessor: 'created_at', sortable: false },
  ];
  // 1. Define the data for your tabs
  const tabData = [
    {
      label: 'SUBSCRIPTION TRANSACTION',
      content: (
        <div>
          <DataTable data={subTransaction} columns={columns} pageSize={10} title='Subscription Data Table'/> 
        </div>
      ),
    },
    {
      label: 'PROPERTY TRANSACTION',
      content: (
        <div>
          <DataTable data={[]} columns={columns} pageSize={10} title='Property Purchase Data Table'/> 
        </div>
      ),
    },
  ];

  return (
    <div className='w-full pb-5'>
      <Tabs tabs={tabData}/>
    </div>
  )
}

export default clientSubTransactions
