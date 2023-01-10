import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { Customer, TemplateFlavor } from '@lumina/api'
import { MultiSelect } from '../Components/MultiSelect'

const PREFIX = 'NewCustomer'

const classes = {
  formBox: `${PREFIX}-formBox`,
  findRequest: `${PREFIX}-findRequest`,
  saveButton: `${PREFIX}-saveButton`,
  customerFormInput: `${PREFIX}-customerFormInput`,
  customerFormSelectLabel: `${PREFIX}-customerFormSelectLabel`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.formBox}`]: {
    padding: '1.5rem',
  },
  [`& .${classes.findRequest}`]: {
    margin: '1.5rem 0 0.5rem',
  },
  [`& .${classes.saveButton}`]: {
    marginTop: '1.5rem',
  },
  [`& .${classes.customerFormInput}`]: {
    margin: '1.5rem 0 1.5rem',
    width: 300,
    display: 'block',
  },
  [`& .${classes.customerFormSelectLabel}`]: {
    marginTop: '1.5rem',
    display: 'block',
  },
})

const TEMPLATE_FLAVOURS_QUERY = gql`
  query Query {
    flavors
  }
`

const CREATE_CUSTOMER = gql`
  mutation createOneCustomer($data: CustomerCreateInput!) {
    customer: createOneCustomer(data: $data) {
      id
    }
  }
`
interface TemplateDetails {
  id: string
  name: string
}

export const NewCustomer = () => {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [active, setActive] = useState(true)
  const [templates, setTemplate] = useState<TemplateDetails[]>([])
  const [approvedTemplates, setApprovedTemplate] = useState<string[]>([])
  const [defaultTemplate, setDefaultTemplate] = useState<string>()
  const { data: templateData } = useQuery(TEMPLATE_FLAVOURS_QUERY)
  const [addCustomer] =
    useMutation<{ customer: Pick<Customer, 'id'> }>(CREATE_CUSTOMER)

  const createCustomer = async () => {
    setCreating(true)
    const result = await addCustomer({
      variables: {
        data: {
          name,
          active,
          approvedTemplates: {
            set: approvedTemplates.map((template) => template.split(' - ')[0]),
          },
          defaultTemplate,
        },
      },
    })
    setCreating(false)
    const newId = result.data?.customer?.id
    router.push(`./${newId}`)
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: newVal },
    } = event
    const addedValues = newVal
    setApprovedTemplate([...new Set(addedValues)])
  }

  const handleDelete = (deletedValue: string) => {
    const filteredValue = approvedTemplates?.filter(
      (val) => val !== deletedValue,
    )
    setApprovedTemplate(filteredValue)
  }

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

  return (
    <Root>
      <Paper>
        <Box className={classes.formBox}>
          <Typography variant="h4">Create Customer</Typography>
          <TextField
            variant="outlined"
            className={classes.customerFormInput}
            margin="dense"
            color="primary"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Customer Name"
          />
          <br />
          <Typography variant="h6">What is the Customer's status?</Typography>
          <div>
            <Select
              onChange={(e) => setActive(e.target.value === 'true')}
              value={active}
            >
              <MenuItem value={'true'}>Active</MenuItem>
              <MenuItem value={'false'}>Pending</MenuItem>
            </Select>
          </div>
          <Typography variant="h6">Approved Templates</Typography>
          <div>
            <MultiSelect
              handleChange={handleChange}
              handleDelete={handleDelete}
              selectedValues={approvedTemplates}
              values={templates.map(
                (template) => template.id + ' - ' + template.name,
              )}
            />
          </div>
          <Typography variant="h6">Default Template</Typography>
          <div>
            <Select
              onChange={(e) => setDefaultTemplate(e.target.value as string)}
            >
              {templates.map((template) => (
                <MenuItem value={template.id}>
                  {template.id + ' - ' + template.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          {creating ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.saveButton}
              disabled={!name}
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              onClick={createCustomer}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Root>
  )
}
