import React from 'react'
import { CustomerUsers } from 'modules/admin/customers'
import { AdminMain } from 'modules/layouts/admin/AdminMain'

const CustomerUsersPage = () => <CustomerUsers />

CustomerUsersPage.Layout = AdminMain

export default CustomerUsersPage
