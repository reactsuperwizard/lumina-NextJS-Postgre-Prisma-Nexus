import React from 'react'
import { NewUser } from 'modules/admin/users'
import { AdminMain } from 'modules/layouts/admin/AdminMain'

const NewUserPage = () => <NewUser />

NewUserPage.Layout = AdminMain

export default NewUserPage