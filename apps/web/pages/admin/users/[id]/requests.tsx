import React from 'react'
import { UserRequests } from 'modules/admin/users'
import { AdminMain } from 'modules/layouts/admin/AdminMain'

const UserRequestsPage = () => <UserRequests />

UserRequestsPage.Layout = AdminMain

export default UserRequestsPage
