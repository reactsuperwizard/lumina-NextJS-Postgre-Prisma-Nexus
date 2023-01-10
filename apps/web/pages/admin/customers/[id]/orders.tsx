import React from 'react'
import { CustomerOrders } from 'modules/admin/customers'
import { AdminMain } from 'modules/layouts/admin/AdminMain'

const CustomerOrdersPage = () => <CustomerOrders />

CustomerOrdersPage.Layout = AdminMain

export default CustomerOrdersPage