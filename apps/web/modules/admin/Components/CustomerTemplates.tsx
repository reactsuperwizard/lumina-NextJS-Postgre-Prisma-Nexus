import { gql, useMutation } from '@apollo/client'
import { MasterTemplate, TemplateFlavor } from '@lumina/api'
import {
  Checkbox,
  Radio,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  styled,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useEffect, useState } from 'react'
import { TemplateDetails } from '../customers/Customer'
import { toDateTimeString } from '../utils'
import router from 'next/router'

interface CustomerTemplatesProps {
  templateList: TemplateDetails[]
  approvedTemplates: TemplateFlavor[]
  requestedTemplates: TemplateFlavor[]
  defaultTemplate: TemplateFlavor
  id: number
  mappings: Pick<MasterTemplate, 'id' | 'flavor' | 'updatedAt'>[]
  refetch: () => void
}
const PREFIX = 'CustomerTemplate'

const classes = {
  header: `${PREFIX}-header`,
  decline: `${PREFIX}-decline`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.header}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`& .${classes.decline}`]: {
    backgroundColor: '#f44336',
    color: '#fff',
    paddingRight: '1rem',
    paddingLeft: '1rem',
    '&:hover': {
      backgroundColor: '#f44336',
      color: '#fff',
    },
  },
}))

const UPDATE_CUSTOMER = gql`
  mutation updateOneCustomer(
    $where: CustomerWhereUniqueInput!
    $data: CustomerUpdateInput!
  ) {
    resource: updateOneCustomer(where: $where, data: $data) {
      id
      approvedTemplates
      defaultTemplate
    }
  }
`

export const CustomerTemplates = ({
  templateList,
  approvedTemplates,
  defaultTemplate,
  requestedTemplates,
  id,
  mappings,
  refetch,
}: CustomerTemplatesProps) => {
  const [doMutation, { loading, error }] = useMutation(UPDATE_CUSTOMER)
  const [approved, setApproved] = useState<string[]>([])
  const [requested, setRequested] = useState<string[]>([])
  const [defaultT, setDefault] = useState('')
  const [loadingTemplate, setLoadingTemplate] = useState<string>()

  useEffect(() => {
    setApproved(approvedTemplates)
    setDefault(defaultTemplate)
    setRequested(requestedTemplates)
  }, [])

  const handleRequestedTemplateChange = async (
    val: string,
    action: 'APPROVE' | 'DECLINE',
  ) => {
    let updatedApproved = [...approved]
    let updatedRequested = [...requested]
    setLoadingTemplate(val)
    if (action == 'APPROVE') {
      updatedApproved = [...new Set<string>([...approved, val])]
    }
    updatedRequested = requested.filter((template) => template != val)
    await doMutation({
      variables: {
        where: {
          id,
        },
        data: {
          approvedTemplates: { set: updatedApproved },
          defaultTemplate: { set: defaultT },
          requestedTemplates: { set: updatedRequested },
        },
      },
    })

    setLoadingTemplate(undefined)
    if (error) return
    setApproved(updatedApproved)
    setRequested(updatedRequested)
    await refetch()
  }
  const handleDefaultTemplateChange = (val: string) => {
    setDefault(val)
    setApproved(approved.filter((template) => template != val))
  }
  const handleApprovedTeplateChange = (val: string, state: string) => {
    if (val == defaultT) return
    if (approved.indexOf(val) != -1) {
      setApproved(approved.filter((template) => template != val))
    } else {
      setApproved([...new Set<string>([...approved, val])])
    }
  }

  const submit = async () => {
    await doMutation({
      variables: {
        where: {
          id,
        },
        data: {
          approvedTemplates: { set: approved },
          defaultTemplate: { set: defaultT },
        },
      },
    })
    await refetch()
  }
  return (
    <Root>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <>
                <TableCell className={classes.header} key={1}>
                  Template Name
                </TableCell>
                <TableCell className={classes.header} key={2}>
                  Approved
                </TableCell>
                <TableCell className={classes.header} key={3}>
                  Default
                </TableCell>
                <TableCell className={classes.header} key={4}>
                  Requested
                </TableCell>
                <TableCell className={classes.header} key={4}>
                  Script Last Published
                </TableCell>
                <TableCell className={classes.header} key={4}>
                  Master Script
                </TableCell>
              </>
            </TableRow>
          </TableHead>
          <TableBody>
            {templateList.map((row) => {
              const masterScriptData = mappings.find(
                (mapping) => mapping.flavor == row.id,
              )
              return (
                <TableRow key={'row-' + row.id}>
                  <TableCell key={'label-' + row.id}>
                    {row.id + ' - ' + row.name}
                  </TableCell>
                  <TableCell key={'check-' + row.id}>
                    <Checkbox
                      checked={approved.indexOf(row.id as TemplateFlavor) != -1}
                      disabled={defaultT == row.id}
                      onChange={(e) =>
                        handleApprovedTeplateChange(row.id, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell key={'radio-' + row.id}>
                    <Radio
                      checked={defaultT == row.id}
                      onChange={() => handleDefaultTemplateChange(row.id)}
                    />
                  </TableCell>
                  <TableCell key={'requested-' + row.id}>
                    {requested.includes(row.id as TemplateFlavor) && (
                      <>
                        <LoadingButton
                          loading={loadingTemplate == row.id}
                          onClick={() =>
                            handleRequestedTemplateChange(row.id, 'APPROVE')
                          }
                          variant="contained"
                          sx={{ marginRight: '1rem' }}
                        >
                          Approve
                        </LoadingButton>
                        <LoadingButton
                          loading={loadingTemplate == row.id}
                          onClick={() =>
                            handleRequestedTemplateChange(row.id, 'DECLINE')
                          }
                          className={classes.decline}
                        >
                          Decline
                        </LoadingButton>
                      </>
                      // <Button
                      //   variant="contained"
                      //   onClick={() => handleRequestedTemplateChange(row.id)}
                      // >
                      //   Approve
                      // </Button>
                    )}
                  </TableCell>
                  <TableCell key={'lastUpdated-' + row.id}>
                    {toDateTimeString(masterScriptData?.updatedAt)}
                  </TableCell>
                  <TableCell key={'masterScript-' + row.id}>
                    {masterScriptData &&
                    (approvedTemplates.indexOf(row.id as TemplateFlavor) !=
                      -1 ||
                      defaultTemplate == row.id) ? (
                      <Button
                        variant="contained"
                        onClick={() =>
                          router.push(`/admin/customers/${id}/${row.id}`)
                        }
                      >
                        Edit
                      </Button>
                    ) : (
                      ''
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign={'right'} mt={2}>
        <LoadingButton loading={loading} onClick={submit} variant="contained">
          SAVE TEMPLATE DETAILS
        </LoadingButton>
      </Box>
    </Root>
  )
}
