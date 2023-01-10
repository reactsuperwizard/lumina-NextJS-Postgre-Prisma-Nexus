import React from 'react'
import { Orders } from 'modules/admin/orders'
import { AdminMain } from 'modules/layouts/admin/AdminMain'

const OrdersList = () => <Orders />

OrdersList.Layout = AdminMain

export default OrdersList
