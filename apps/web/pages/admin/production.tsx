import React from 'react'
import { Production } from 'modules/admin/production'
import { AdminMain } from 'modules/layouts/admin/AdminMain'
import { Dashboard } from 'modules/scripting/modules/dashboard'

const ProductionPage = () => <Dashboard />

ProductionPage.Layout = AdminMain

export default ProductionPage
