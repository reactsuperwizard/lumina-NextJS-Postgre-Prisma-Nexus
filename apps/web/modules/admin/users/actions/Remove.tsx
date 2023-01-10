import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CircularProgress } from '@mui/material'
import { RemoveCircleOutline } from '@mui/icons-material'
import { UPDATE_USER_PERMISSIONS } from './UPDATE_USER_PERMISSIONS'

export const Remove = ({
  customerTenant,
  refetchCustomers,
  authId,
}: {
  customerTenant: string
  refetchCustomers: any
  authId: string
}) => {
  const [removingPermissions, setRemovingPermissions] = useState(false)
  const [updateUserPermissions] = useMutation(UPDATE_USER_PERMISSIONS)
  const handleOnClick = async (
    _event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    setRemovingPermissions(true)
    await updateUserPermissions({
      variables: { customerTenant, authId, role: [] },
    })
    refetchCustomers()
    setRemovingPermissions(false)
  }
  if (removingPermissions) {
    return <CircularProgress />
  }
  return <RemoveCircleOutline onClick={handleOnClick} />
}
