import React from 'react'
import { AdminMain } from 'modules/layouts/admin/AdminMain'
import { Detail } from 'modules/scripting/detail'

const ScriptEditPage = () => <Detail mode="master" />

ScriptEditPage.Layout = AdminMain

export default ScriptEditPage
