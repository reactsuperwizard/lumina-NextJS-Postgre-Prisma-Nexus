import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import {
  AdminViewGrid,
  DeleteResourceDialog,
  LuminaAutocomplete,
  QueryField,
  ReturnField,
  SubTable,
  LinkButton,
} from '../Components'
import { LiveField, LiveSelect } from 'modules/utils'
import {
  QueryCustomerArgs,
  Customer as CustomerType,
  Scalars,
  CustomerWhereUniqueInput,
  Order,
  Video,
  Script,
  Request,
  Platform,
  MutationUpdateOneCustomerArgs,
  User,
  MasterTemplate,
} from '@lumina/api'
import { CustomerTemplates } from '../Components/CustomerTemplates'

const PREFIX = 'Customer'

const classes = {
  paper: `${PREFIX}-paper`,
  loadingBox: `${PREFIX}-loadingBox`,
  loadingAnimation: `${PREFIX}-loadingAnimation`,
  deleteButtonBox: `${PREFIX}-deleteButtonBox`,
  deleteButton: `${PREFIX}-deleteButton`,
  templatesWrap: `${PREFIX}-templatesWrap`,
}

const Root = styled('div')({
  [`& .${classes.paper}`]: { minHeight: '15rem' },
  [`& .${classes.loadingBox}`]: {
    height: '15rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.loadingAnimation}`]: {
    height: '10rem !important',
    width: '10rem !important',
  },
  [`& .${classes.deleteButtonBox}`]: { padding: '1rem 0.5rem' },
  [`& .${classes.deleteButton}`]: { color: 'red', border: '1px solid red' },
  [`& .${classes.templatesWrap}`]: { height: '250px', overflow: 'scroll' },
})

const CUSTOMER_QUERY = gql`
  query customer($where: CustomerWhereUniqueInput!) {
    customer(where: $where) {
      id
      createdAt
      updatedAt
      name
      slug
      quickbooksId
      pipedriveId
      hsCompanyId
      active
      canRevise
      approvedTemplates
      requestedTemplates
      defaultTemplate
      isPaid
      notes
      mappings {
        id
        flavor
        updatedAt
      }
      orders(take: 5, orderBy: { updatedAt: desc }) {
        id
        name
        status
        createdAt
        updatedAt
      }
      requests(take: 5, orderBy: { updatedAt: desc }) {
        id
        jobTitle
        status
        createdAt
        updatedAt
      }
      videos(take: 5, orderBy: { updatedAt: desc }) {
        id
        name
        status
        createdAt
        updatedAt
      }
      scripts(take: 5, orderBy: { updatedAt: desc }) {
        id
        name
        createdAt
        updatedAt
      }
      users(take: 5) {
        id
        firstName
        lastName
        email
      }
      platform {
        id
        name
      }
    }
  }
`

const TEMPLATE_FLAVOURS_QUERY = gql`
  query Query {
    flavors
  }
`

export interface TemplateDetails {
  id: string
  name: string
}
interface GetCustomerQuery
  extends Pick<
    CustomerType,
    | 'name'
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'slug'
    | 'pipedriveId'
    | 'quickbooksId'
    | 'active'
    | 'hsCompanyId'
    | 'canRevise'
    | 'approvedTemplates'
    | 'requestedTemplates'
    | 'defaultTemplate'
    | 'isPaid'
    | 'notes'
  > {
  orders: Pick<Order, 'id' | 'name' | 'status' | 'createdAt' | 'updatedAt'>[]
  requests: Pick<
    Request,
    'id' | 'status' | 'jobTitle' | 'createdAt' | 'updatedAt'
  >[]
  videos: Pick<Video, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'name'>[]
  platform: Pick<Platform, 'id' | 'name'>
  scripts: Pick<Script, 'id' | 'name' | 'createdAt' | 'updatedAt'>[]
  users: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>[]
  mappings: Pick<MasterTemplate, 'id' | 'flavor' | 'updatedAt'>[]
}

const SAVE_CUSTOMER = gql`
  mutation updateOneCustomer(
    $where: CustomerWhereUniqueInput!
    $data: CustomerUpdateInput!
  ) {
    request: updateOneCustomer(where: $where, data: $data) {
      id
    }
  }
`

export const Customer = () => {
  const router = useRouter()

  const { id } = router.query
  const customerId = parseInt(id?.toString())
  const [openDelete, setOpenDelete] = useState(false)
  const [templates, setTemplate] = useState<TemplateDetails[]>([])
  const [platform, setPlatform] = useState<Pick<
    Platform,
    'id' | 'name'
  > | null>(null)

  const where: CustomerWhereUniqueInput = { id: customerId }

  const {
    data: customerQuery,
    loading,
    error,
    refetch,
  } = useQuery<{ customer: GetCustomerQuery }, QueryCustomerArgs>(
    CUSTOMER_QUERY,
    {
      variables: { where: { id: customerId } },
      skip: !customerId,
    },
  )

  const { data: templateData } = useQuery(TEMPLATE_FLAVOURS_QUERY)

  const [updateCustomer] = useMutation<
    {
      customer: Pick<CustomerType, 'id'>
    },
    MutationUpdateOneCustomerArgs
  >(SAVE_CUSTOMER)

  useEffect(() => {
    if (!platform && customerQuery?.customer?.platform?.id) {
      setPlatform(customerQuery?.customer?.platform)
      return
    }
    if (!platform || platform.id === customerQuery?.customer?.platform?.id)
      return
    updateCustomer({
      variables: {
        data: { platform: { connect: { id: platform.id } } },
        where: { id: +customerId },
      },
    })
  }, [platform, customerQuery])

  useEffect(() => {
    if (templates.length == 0 && templateData?.flavors) {
      const templateDetails = Object.keys(templateData.flavors).map(
        (flavor) => ({
          id: flavor,
          name: templateData.flavors[flavor].name,
        }),
      )
      setTemplate(templateDetails)
    }
  }, [templateData])

  const formatDate = (value: Scalars['DateTime']) =>
    new Date(value).toLocaleString('en-US')

  const {
    hsCompanyId,
    quickbooksId,
    pipedriveId,
    name,
    slug,
    createdAt,
    updatedAt,
    orders,
    requests,
    videos,
    scripts,
    users,
    approvedTemplates,
    defaultTemplate,
    requestedTemplates,
    mappings,
  } = customerQuery?.customer || {}

  return (
    <Root>
      <AdminViewGrid heading={name || `Customer #${id}`}>
        <Paper className={classes.paper}>
          {loading ? (
            <Box className={classes.loadingBox}>
              <CircularProgress className={classes.loadingAnimation} />
            </Box>
          ) : (
            customerQuery?.customer &&
            !error && (
              <Box m={2}>
                <Box p={1}>
                  <LiveField
                    dense
                    disabled
                    label="Customer Id"
                    defaultValue={(id as string) || ''}
                  />
                </Box>
                <Box p={1}>
                  <LiveField
                    dense
                    label="Customer Name"
                    resource="Customer"
                    field="name"
                    where={where}
                    defaultValue={customerQuery.customer.name || ''}
                  />
                </Box>
                <Box p={1}>
                  <LiveField
                    dense
                    label="Customer Slug"
                    resource="Customer"
                    field="slug"
                    where={where}
                    defaultValue={slug || ''}
                  />
                </Box>
                {/* <Box p={1}>
                  <Typography variant="subtitle1">Default Template:</Typography>
                  <LiveSelect
                    dense
                    resource="Customer"
                    field="defaultTemplate"
                    where={where}
                    defaultValue={customerQuery?.customer?.defaultTemplate}
                    options={templates.map((template) => ({
                      label: template.id + ' - ' + template.name,
                      value: template.id,
                    }))}
                  />
                </Box>
                <Box p={1}>
                  <LiveMultiSelect
                    field="approvedTemplates"
                    where={where}
                    values={templates.map(
                      (template) => template.id + ' - ' + template.name,
                    )}
                    title="Approved Templates"
                    resource="Customer"
                    selectedValues={approvedTemplates?.map(
                      (template) =>
                        template.toString() +
                        ' - ' +
                        templateData.flavors[template].name,
                    )}
                  />
                </Box> */}
                <Box p={1}>
                  <Typography variant="subtitle1">Template details:</Typography>
                  <Box>
                    <CustomerTemplates
                      approvedTemplates={approvedTemplates!}
                      requestedTemplates={requestedTemplates!}
                      defaultTemplate={defaultTemplate!}
                      templateList={templates!}
                      id={Number(id)}
                      mappings={mappings!}
                      refetch={refetch}
                    />
                  </Box>
                </Box>
                <Box p={1}>
                  <LiveField
                    dense
                    label="Internal Notes"
                    resource="Customer"
                    field="notes"
                    where={where}
                    multiline
                    defaultValue={customerQuery.customer.notes || ''}
                    notes={
                      'Notes will display to scripters as bullets. Insert a line break to start a new bullet'
                    }
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="subtitle1">Paid:</Typography>
                  <LiveSelect
                    dense
                    resource="Customer"
                    field="isPaid"
                    where={where}
                    defaultValue={customerQuery.customer.isPaid}
                    options={[
                      { label: 'Paid', value: true },
                      { label: 'Free', value: false },
                    ]}
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="subtitle1">Status:</Typography>
                  <LiveSelect
                    dense
                    resource="Customer"
                    field="active"
                    where={where}
                    defaultValue={customerQuery.customer.active}
                    options={[
                      { label: 'Active', value: true },
                      { label: 'Pending', value: false },
                    ]}
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="subtitle1">
                    Allow Video Revision:
                  </Typography>
                  <LiveSelect
                    dense
                    resource="Customer"
                    field="canRevise"
                    where={where}
                    defaultValue={customerQuery.customer.canRevise}
                    options={[
                      { label: 'True', value: true },
                      { label: 'False', value: false },
                    ]}
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="subtitle1">Customer Portal:</Typography>

                  <LinkButton
                    href={`${window.location.origin}/${slug}`}
                    blank
                  />
                </Box>
                <Box p={1}>
                  <LiveField
                    dense
                    label="Hubspot Company Id"
                    resource="Customer"
                    field="hsCompanyId"
                    where={where}
                    defaultValue={hsCompanyId || 0}
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="subtitle1">View in Hubspot:</Typography>
                  {hsCompanyId ? (
                    <LinkButton
                      href={`https://app.hubspot.com/contacts/20184043/company/${hsCompanyId}`}
                      blank
                    />
                  ) : (
                    <Typography color="primary">
                      &nbsp; Enter a Hubspot Company Id to create a link.
                    </Typography>
                  )}
                </Box>
                <Box p={1}>
                  <LiveField
                    dense
                    label="QuickBooks Id"
                    resource="Customer"
                    field="quickbooksId"
                    where={where}
                    defaultValue={quickbooksId || 0}
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="subtitle1">
                    View in Quickbooks:
                  </Typography>
                  {quickbooksId ? (
                    <LinkButton
                      href={`https://qbo.intuit.com/app/customerdetail?nameId=${quickbooksId}`}
                      blank
                    />
                  ) : (
                    <Typography color="primary">
                      &nbsp; Enter a QuickBooks Id to create a link.
                    </Typography>
                  )}
                </Box>
                <Box p={1}>
                  <LiveField
                    dense
                    label="Pipedrive Id"
                    resource="Customer"
                    field="pipedriveId"
                    where={where}
                    defaultValue={pipedriveId || 0}
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="subtitle1">
                    View in Pipedrive:
                  </Typography>
                  {pipedriveId ? (
                    <LinkButton
                      href={`https://midashealth-7678d1.pipedrive.com/organization/${pipedriveId}`}
                      blank
                    />
                  ) : (
                    <Typography color="primary">
                      &nbsp; Enter a Pipedrive Id to create a link.
                    </Typography>
                  )}
                </Box>
                <Box p={1}>
                  <LiveField
                    dense
                    disabled
                    label="Created At"
                    defaultValue={formatDate(createdAt)}
                  />
                </Box>
                {updatedAt && (
                  <Box p={1}>
                    <LiveField
                      dense
                      disabled
                      label="Updated At"
                      defaultValue={formatDate(updatedAt)}
                    />
                  </Box>
                )}
                <Box p={1}>
                  <LuminaAutocomplete
                    fullWidth
                    label="ATS Platform Name"
                    getOptionLabel="name"
                    resourceName="Platform"
                    fieldName="name"
                    queryFields={[QueryField.name]}
                    returnFields={[ReturnField.id, ReturnField.name]}
                    source="user.id"
                    initValue={customerQuery.customer.platform}
                    parse={(v: any) => {
                      return v.id
                    }}
                    onChange={(value: any) =>
                      value?.id ? setPlatform(value) : null
                    }
                  />
                </Box>
                <Box p={2}>
                  <Typography variant="subtitle1">Orders:</Typography>
                  {orders && orders.length > 0 ? (
                    <SubTable
                      columns={[
                        'id',
                        'name',
                        'status',
                        'createdAt',
                        'updatedAt',
                      ]}
                      labels={['Id', 'Name', 'Status', 'Created', 'Updated']}
                      values={customerQuery.customer.orders}
                      connectedType="orders"
                    />
                  ) : (
                    'No orders yet'
                  )}
                </Box>
                <Box p={2}>
                  <Typography variant="subtitle1">Requests:</Typography>
                  {requests && requests.length > 0 ? (
                    <SubTable
                      columns={[
                        'id',
                        'jobTitle',
                        'status',
                        'createdAt',
                        'updatedAt',
                      ]}
                      labels={[
                        'Id',
                        'Job Title',
                        'Status',
                        'Created',
                        'Updated',
                      ]}
                      values={customerQuery.customer.requests}
                      connectedType="requests"
                    />
                  ) : (
                    'No requests yet'
                  )}
                </Box>
                <Box p={2}>
                  <Typography variant="subtitle1">Videos:</Typography>
                  {videos && videos.length > 0 ? (
                    <SubTable
                      columns={[
                        'id',
                        'name',
                        'status',
                        'createdAt',
                        'updatedAt',
                      ]}
                      labels={['Id', 'Name', 'Status', 'Created', 'Updated']}
                      values={customerQuery.customer.videos}
                      connectedType="videos"
                    />
                  ) : (
                    'No videos yet'
                  )}
                </Box>
                <Box p={2}>
                  <Typography variant="subtitle1">Scripts:</Typography>
                  {scripts && scripts.length > 0 ? (
                    <SubTable
                      columns={['id', 'name', 'createdAt', 'updatedAt']}
                      labels={['Id', 'Name', 'Created', 'Updated']}
                      values={customerQuery.customer.scripts}
                      connectedType="scripts"
                    />
                  ) : (
                    'No scripts yet'
                  )}
                </Box>
                <Box p={2}>
                  <Typography variant="subtitle1">Users:</Typography>
                  {users && users.length > 0 ? (
                    <SubTable
                      columns={['id', 'firstName', 'lastName', 'email']}
                      labels={['Id', 'First Name', 'Last Name', 'Email']}
                      values={users}
                      connectedType="users"
                    />
                  ) : (
                    'No scripts yet'
                  )}
                </Box>
                <Box className={classes.deleteButtonBox}>
                  <Button
                    disabled={
                      customerQuery.customer.orders?.length > 0 ||
                      customerQuery.customer.videos?.length > 0
                    }
                    variant="outlined"
                    onClick={() => setOpenDelete(true)}
                    fullWidth
                    className={classes.deleteButton}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            )
          )}
        </Paper>
        <DeleteResourceDialog
          open={openDelete}
          cancel={() => setOpenDelete(false)}
          id={customerId}
          resource="Customer"
        />
      </AdminViewGrid>
    </Root>
  )
}
