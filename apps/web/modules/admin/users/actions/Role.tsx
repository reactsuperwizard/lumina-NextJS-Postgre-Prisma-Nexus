import React, { useEffect, useState } from 'react'

import {
  Select,
  MenuItem,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  Box,
  Chip,
} from '@mui/material'
import { useMutation } from '@apollo/client'

import { PermissionsRole } from '@lumina/api'
import type { Tenants } from '@lumina/api'

import { UPDATE_USER_PERMISSIONS } from './UPDATE_USER_PERMISSIONS'
import { SelectChangeEvent } from '@mui/material'
interface Props {
  role: PermissionsRole[]
  authId: string
  customerTenant: string
  refetchCustomers: () => Promise<void>
  reset: () => void
}

export const Role = ({
  role,
  authId,
  customerTenant,
  refetchCustomers,
  reset,
}: Props) => {
  const [localRole, setRole] = useState<PermissionsRole[]>(role)
  const [updatingRole, setUpdatingRole] = useState(false)
  const [updateUserPermissions] = useMutation<{ tenants: Tenants }>(
    UPDATE_USER_PERMISSIONS,
  )

  const handleChange = (event: SelectChangeEvent<PermissionsRole[]>) => {
    const role = event.target.value as PermissionsRole[]
    setRole(role)
  }

  const isRolesSame = (
    newRoles: PermissionsRole[],
    old: PermissionsRole[],
  ): boolean => {
    return (
      old.length == newRoles.length &&
      newRoles.every((ele) => old?.find((role) => role == ele))
    )
  }

  useEffect(() => {
    if (!isRolesSame(localRole, role)) {
      const update = async () => {
        setUpdatingRole(true)
        await updateUserPermissions({
          variables: { authId, customerTenant, role: localRole },
        })
        await refetchCustomers()
        setUpdatingRole(false)
        reset()
      }
      update()
    }
  }, [localRole])

  if (updatingRole) {
    return <CircularProgress />
  }

  return (
    <>
      <InputLabel>Role</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={localRole}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: PermissionsRole[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected?.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {[
          PermissionsRole.Admin,
          PermissionsRole.Manager,
          PermissionsRole.Scripter,
          PermissionsRole.User,
        ].map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
