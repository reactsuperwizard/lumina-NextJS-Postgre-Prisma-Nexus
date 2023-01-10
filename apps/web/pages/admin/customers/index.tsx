import React from 'react'
import { Customers } from 'modules/admin/customers'
import { AdminMain } from 'modules/layouts/admin/AdminMain'

const CustomersList = () => <Customers />

CustomersList.Layout = AdminMain

export default CustomersList
