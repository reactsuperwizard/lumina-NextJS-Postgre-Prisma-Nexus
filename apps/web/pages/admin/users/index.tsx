import React from 'react'
import { Users } from 'modules/admin/users'
import { AdminMain } from 'modules/layouts/admin/AdminMain'

const UsersList = () => <Users />

UsersList.Layout = AdminMain

export default UsersList
