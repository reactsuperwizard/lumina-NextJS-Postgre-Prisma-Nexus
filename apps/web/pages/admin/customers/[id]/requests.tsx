import React from 'react'
import { CustomerRequests } from 'modules/admin/customers'
import { AdminMain } from 'modules/layouts/admin/AdminMain'

const CustomerRequestsPage = () => <CustomerRequests />

CustomerRequestsPage.Layout = AdminMain

export default CustomerRequestsPage