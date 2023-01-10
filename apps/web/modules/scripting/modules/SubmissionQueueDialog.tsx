import { gql, useMutation } from '@apollo/client'
import { Script, TemplateFlavor } from '@lumina/api'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  styled,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material'
import { LuminaDrawer } from 'modules/utils/LuminaDrawer'
import { LuminaErrorText } from 'modules/utils/LuminaErrorText'
import router from 'next/router'
import { Compensation } from './Compensation'
import { DialogRow } from './TableRow'

const PREFIX = 'SubmissionQueue-Dialog'

const classes = {
  compensation: `${PREFIX}-compensation`,
  compensationText: `${PREFIX}-compensationText`,
  buttonBox: `${PREFIX}-buttonBox`,
  accept: `${PREFIX}-accept`,
  close: `${PREFIX}-close`,
}

const StyledButtonBox = styled(Box)(({ theme }) => ({
  [`&.${classes.buttonBox}`]: { marginTop: '2rem', display: 'flex' },
  [`& .${classes.accept}`]: {
    marginRight: '0.75rem',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'blue',
      color: '#fff',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  [`& .${classes.close}`]: {
    textTransform: 'none',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
}))

const ACCEPT_REQUEST = gql`
  mutation Mutation($where: RequestWhereUniqueInput!) {
    acceptRequest(where: $where) {
      id
      name
    }
  }
`
interface Props {
  id: number
  title: string
  customer: string
  customerId: number
  specialInstructions: string
  rescheduledBy?: string | undefined
  createdAt: Date
  template: TemplateFlavor
  baseCompensation: number
  bonusCompensation: number
  open: boolean
  setOpen: (open: boolean) => void
}
export const SubmissionQueueDialog = ({
  id,
  title,
  customer,
  customerId,
  createdAt,
  template,
  specialInstructions,
  baseCompensation,
  bonusCompensation,
  open,
  setOpen,
  rescheduledBy,
}: Props) => {
  const [acceptRequestMutation, { loading, error }] = useMutation<{
    acceptRequest: Pick<Script, 'id'>
  }>(ACCEPT_REQUEST)

  const acceptRequest = async () => {
    const { data, errors } = await acceptRequestMutation({
      variables: {
        where: { id },
      },
    })
    if (!errors) router.push(`/scripting/${data?.acceptRequest.id}`)
  }
  return (
    <LuminaDrawer
      title={`Accept Request #${id}`}
      open={open}
      anchor="right"
      onClose={() => setOpen(false)}
    >
      <Box>
        {error ? <LuminaErrorText>Something went Wrong!</LuminaErrorText> : ''}
        {rescheduledBy ? (
          <Alert severity="info">
            This script was edited by {rescheduledBy} before being returned to
            the submission queue.
          </Alert>
        ) : (
          ''
        )}
        <TableContainer component={Box}>
          <Table>
            <TableBody>
              <DialogRow
                title="Customer:"
                body={
                  <Link
                    component="button"
                    onClick={() => {
                      router.push(`/admin/customers/${customerId}`)
                    }}
                  >
                    {customer}
                  </Link>
                }
              />
              <DialogRow title="Job Title:" body={title} />
              <DialogRow
                title="Submitted:"
                body={
                  new Date(createdAt).toLocaleDateString() +
                  ' ' +
                  new Date(createdAt).toLocaleTimeString()
                }
              />
              <DialogRow title="Template Selection:" body={template} />
              <DialogRow
                title="Special Instructions:"
                body={specialInstructions}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <Compensation
          baseCompensation={baseCompensation}
          bonusCompensation={bonusCompensation}
        />
      </Box>
      <StyledButtonBox className={classes.buttonBox}>
        <Button
          disabled={loading}
          className={classes.accept}
          onClick={acceptRequest}
        >
          {loading ? (
            <CircularProgress color="secondary" size={'1rem'} />
          ) : (
            'Accept Request'
          )}
        </Button>
        <Button
          disabled={loading}
          className={classes.close}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </StyledButtonBox>
    </LuminaDrawer>
  )
}
