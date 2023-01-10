import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
} from '@mui/material'
import {
  CheckCircle,
  Edit,
  HighlightOffRounded,
  WarningRounded,
} from '@mui/icons-material'
import { useTenant } from 'modules/hooks'
import { OrderQuery } from '.'
import { LiveField } from 'modules/utils'
import { RequestStatus, RequestWhereUniqueInput } from '@lumina/api'

const PREFIX = 'RequestDetail'

const classes = {
  buttonStyle: `${PREFIX}-buttonStyle`,
  draftIcon: `${PREFIX}-draftIcon`,
  editIcon: `${PREFIX}-editIcon`,
  green: `${PREFIX}-green`,
  tableBox: `${PREFIX}-tableBox`,
  dialog: `${PREFIX}-dialog`,
  closeButton: `${PREFIX}-closeButton`,
  title: `${PREFIX}-title`,
  draftText: `${PREFIX}-draftText`,
  buttonText: `${PREFIX}-buttonText`,
  requestedBy: `${PREFIX}-requestedBy`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.buttonStyle}`]: {
    maxWidth: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 2rem',
    columnGap: '0.5rem',
    padding: '0.75rem 0.5rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'ellipsis',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[100]}`,
    '&:hover': {
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[200],
    },
  },

  [`& .${classes.draftIcon}`]: {
    color: 'orange',
    cursor: 'default',
  },

  [`& .${classes.editIcon}`]: {
    color: theme.palette.grey[500],
    cursor: 'default',
  },

  [`& .${classes.green}`]: { color: '#02BD1A' },

  [`& .${classes.buttonText}`]: {
    maxWidth: '100%',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textTransform: 'none',
    color: theme.palette.primary.main,
  },
}))

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.tableBox}`]: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
  },

  [`& .${classes.dialog}`]: {
    borderRadius: 20,
    cursor: 'default',
    width: '40rem'
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    cursor: 'pointer',
  },

  [`& .${classes.title}`]: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: '1.8rem',
  },

  [`& .${classes.draftText}`]: {
    textAlign: 'center',
    marginTop: '1rem',
    color: 'grey',
  },
  [`& .${classes.requestedBy}`]: {
    color: theme.palette.grey[400],
  },
}))

interface Props {
  request: OrderQuery['requests'][0]
}

export const RequestDetail = ({ request }: Props) => {
  const { isTenantAdmin, isLuminaAdmin } = useTenant()
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  const where: RequestWhereUniqueInput = {
    id: request?.id,
  }
  return (
    <Root>
      <StyledDialog
        open={detailDialogOpen}
        onBackdropClick={() => setDetailDialogOpen(false)}
        classes={{ paper: classes.dialog }}
        className={classes.dialog}
      >
        <DialogTitle style={{ width: '100%', minWidth: '18rem' }}>
          <Typography variant="h5" className={classes.title}>
            Video Details
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => setDetailDialogOpen(false)}
            size="large"
          >
            <HighlightOffRounded fontSize="large" />
          </IconButton>
        </DialogTitle>
        <div className={classes.tableBox}>
          <LiveField
            disabled={
              request.status !== RequestStatus.Draft &&
              (!(isLuminaAdmin || isTenantAdmin) ||
                request.status !== RequestStatus.Submitted)
            }
            dense
            resource="Request"
            field="jobTitle"
            where={where}
            label="Job Title"
            defaultValue={request.jobTitle || ''}
            customer
          />
          <LiveField
            disabled={
              request.status !== RequestStatus.Draft &&
              (!(isLuminaAdmin || isTenantAdmin) ||
                request.status !== RequestStatus.Submitted)
            }
            dense
            resource="Request"
            field="url"
            where={where}
            label="Link to Description"
            defaultValue={request.url || ''}
            customer
          />
          <LiveField
            disabled={
              request.status !== RequestStatus.Draft &&
              (!(isLuminaAdmin || isTenantAdmin) ||
                request.status !== RequestStatus.Submitted)
            }
            dense
            multiline
            required={false}
            resource="Request"
            field="message"
            where={where}
            label="Related Message"
            defaultValue={request.message || ''}
            customer
          />
          <Typography variant="body2" className={classes.requestedBy}>
            Requested by: {request.submittedBy?.email || 'Not stored'}
          </Typography>
          <Typography variant="h6" className={classes.draftText}>
            {request.status === RequestStatus.Draft
              ? '--- DRAFT ---'
              : request.status === RequestStatus.Submitted
              ? '--- SUBMITTED ---'
              : request.status === RequestStatus.Completed
              ? '--- COMPLETED ---'
              : '--- IN PROGRESS ---'}
          </Typography>
        </div>
      </StyledDialog>
      <Paper elevation={2} onClick={() => setDetailDialogOpen(true)}>
        <div className={classes.buttonStyle}>
          <Typography noWrap className={classes.buttonText}>
            {request.jobTitle}
          </Typography>
          <>
            {request.status === RequestStatus.Completed ? (
              <CheckCircle className={classes.green} />
            ) : (request.status === RequestStatus.Submitted ||
                request.status === RequestStatus.Draft) &&
              (isLuminaAdmin || isTenantAdmin) ? (
              <Tooltip title="EDIT">
                <Edit className={classes.editIcon} />
              </Tooltip>
            ) : request.status === RequestStatus.Draft ? (
              <Tooltip title="DRAFT">
                <WarningRounded className={classes.draftIcon} />
              </Tooltip>
            ) : (
              ''
            )}
          </>
        </div>
      </Paper>
    </Root>
  )
}
