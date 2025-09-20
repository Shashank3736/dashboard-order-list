import React from 'react'
import { OrderTable } from './_component/order-table'

const OrderPage = () => {
  return (
    <div className='p-4'>
      <p className='font-medium'>Order List</p>
      <OrderTable />
    </div>
  )
}

export default OrderPage