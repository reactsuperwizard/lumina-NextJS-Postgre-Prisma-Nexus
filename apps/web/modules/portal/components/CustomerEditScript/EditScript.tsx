import React, { useEffect, useState } from 'react'
import { useMutation, gql, useQuery } from '@apollo/client'
import {
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  styled,
  Button,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material/'
import { SAVE_SCRIPT, SaveScriptMutation } from 'modules/admin/scripts/queries'
import type {
  MutationUpdateOneScriptArgs,
  Script,
  ScriptWhereUniqueInput,
  User,
  QueryUserArgs,
  Maybe,
} from '@lumina/api'
import { useAuth0 } from 'modules/hooks'

const PREFIX = 'CustomerEditScript'

const classes = {
  descriptionAndForm: `${PREFIX}-descriptionAndForm`,
  descriptionFont: `${PREFIX}-descriptionFont`,
}

const Root = styled('div')(({ theme }) => ({
  paddingTop: 20,
  maxWidth: '100%',
}))
const FormContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  columnGap: '2rem',
  padding: '1rem',
  [`& .${classes.descriptionAndForm}`]: {
    display: 'grid',
    padding: '1rem',
  },
  [`& .${classes.descriptionFont}`]: {
    paddingBottom: '0.5rem',
    fontWeight: 600,
  },
}))
const StyledSubmitButton = styled(Button)(({ theme }) => ({
  width: '40rem',
  margin: 'auto',
  marginBottom: '2rem',
  display: 'grid',
}))

const SEND_CUSTOMER_EDIT_SCRIPT = gql`
  mutation sendCustomerScriptEdit(
    $where: ScriptWhereUniqueInput!
    $customerId: Int!
    $userId: Int!
  ) {
    script: customerScriptEdit(
      where: $where
      customerId: $customerId
      userId: $userId
    ) {
      id
    }
  }
`
const GET_USER = gql`
  query me($where: UserWhereUniqueInput!) {
    me(where: $where) {
      id
    }
  }
`
interface MockLayer {
  [key: string]: any
  property?: string
  value?: string
  scriptVariable?: string
  maxLength?: number
  lineLength?: number
}
interface SendCustomerEditMutationInput {
  where: ScriptWhereUniqueInput
  customerId: number
  userId: number | undefined
}

export const EditScript = (props: {
  scriptLayers: MockLayer
  customerId: Maybe<number> | undefined
  scriptId: Maybe<number> | undefined
  setSubmitScriptOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { scriptLayers, customerId, scriptId, setSubmitScriptOpen } = props
  const [layers, setLayers] = useState<{ [key: string]: MockLayer }>(
    JSON.parse(JSON.stringify(scriptLayers)),
  )
  const [editableLayers, setEditableLayers] = useState<
    [string, MockLayer][] | null
  >(null)
  const [submitted, setSubmitted] = useState(false)

  const { user } = useAuth0()

  const { data } = useQuery<{ me: Pick<User, 'id'> }, QueryUserArgs>(GET_USER, {
    variables: {
      where: { email: user?.email },
    },
  })

  const [updateOneScript] = useMutation<
    { script: SaveScriptMutation },
    MutationUpdateOneScriptArgs
  >(SAVE_SCRIPT)

  const [notifyCustomerScriptEdit] = useMutation<
    { script: Pick<Script, 'id'> },
    SendCustomerEditMutationInput
  >(SEND_CUSTOMER_EDIT_SCRIPT)

  useEffect(() => {
    getEditableScriptFields()
  }, [submitted])

  const getEditableScriptFields = async () => {
    const rawLayers = layers
    const arrayOfScriptTextFields: [string, MockLayer][] = []
    Object.keys(rawLayers).forEach((layer) => {
      const { property, maxLength } = rawLayers[layer]
      if (maxLength) {
        if (property === 'Text.Source Text' && maxLength > 5) {
          arrayOfScriptTextFields.push([layer, rawLayers[layer]])
        }
      }
    })
    setEditableLayers(arrayOfScriptTextFields)
  }

  const updateLayers = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name
    const newValue = event.target.value
    if (submitted) setSubmitted(false)
    layers[name].currentCount = event.target.value.length
    layers[name].value = newValue
    getEditableScriptFields()
  }

  const runUpdateScript = async (updateData: MockLayer) => {
    if (scriptId) {
      try {
        await updateOneScript({
          variables: {
            data: { layers: updateData, customerUpdate: { set: true } },
            where: { id: +scriptId },
          },
        })
        setSubmitted(true)
        setSubmitScriptOpen(true)
        notifyCustomerScriptEdit({
          variables: {
            where: { id: scriptId },
            customerId: customerId || 0,
            userId: data?.me.id,
          },
        })
      } catch (e: any) {
        throw e
      }
    }
  }

  const wordCount = (value: MockLayer) => {
    if (value.maxLength) {
      return value.currentCount > value?.maxLength ? true : false
    }
  }

  return (
    <Root>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5" color="textPrimary">
            Edit Text
          </Typography>
        </AccordionSummary>
        <FormContainer>
          {editableLayers?.map(([key, value], i) => {
            return (
              <div
                key={`${value.scriptVariable}-${i}`}
                className={classes.descriptionAndForm}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.descriptionFont}
                >
                  {value.scriptVariable}:
                </Typography>
                <TextField
                  id={`${value.scriptVariable}-${i}`}
                  key={`${value.scriptVariable}-${i}`}
                  label={`${value.value}`}
                  name={`${key}`}
                  value={`${value.value}`}
                  error={wordCount(value)}
                  onChange={(event) => updateLayers(event)}
                  helperText={`Character Count: ${value.currentCount || 0}/${
                    value.maxLength
                  }`}
                />
              </div>
            )
          })}
        </FormContainer>
        <StyledSubmitButton
          onClick={() => {
            runUpdateScript(layers)
          }}
          size="large"
          variant="contained"
          color="primary"
          type="submit"
        >
          Update Video
        </StyledSubmitButton>
      </Accordion>
    </Root>
  )
}
