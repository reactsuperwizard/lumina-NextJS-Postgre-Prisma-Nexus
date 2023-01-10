import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
  CircularProgress,
} from '@mui/material'
import { AddRounded, HighlightOffRounded } from '@mui/icons-material'
import { TemplateDetails } from 'modules/portal/components/NewVideo/interface'
import { TemplateSelection } from 'modules/portal/components/NewVideo/TemplateSelection'
import { Preview } from 'modules/portal/components/NewVideo/Preview'
import { NewRequestContent } from 'modules/portal/components/NewVideo/NewRequestContent'
const PREFIX = 'NewRequest'

const classes = {
  tableBox: `${PREFIX}-tableBox`,
  dialog: `${PREFIX}-dialog`,
  closeButton: `${PREFIX}-closeButton`,
  title: `${PREFIX}-title`,
  transparent: `${PREFIX}-transparent`,
  loadingWrap: `${PREFIX}-loadingWrap`,
  loader: `${PREFIX}-loader`,
  addRequestButton: `${PREFIX}-addRequestButton`,
  addIcon: `${PREFIX}-addIcon`,
  textField: `${PREFIX}-textField`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const StyleButton = styled(Button)(({ theme }) => ({
  maxHeight: '3rem',
  minWidth: '10rem',
  backgroundColor: theme.palette.primary.light,
  '&:hover': {
    backgroundColor: '#9B00F0',
  },
  textTransform: 'none',
  fontSize: '1rem',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}))

const StyledAddRoundedIcon = styled(AddRounded)({
  fontSize: '1.8rem !important',
  marginTop: '-3px',
})

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.tableBox}`]: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
  },

  [`& .${classes.dialog}`]: {
    borderRadius: 20,
    padding: '1rem',
    maxWidth: '700px',
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
  },

  [`& .${classes.title}`]: {
    // marginTop: theme.spacing(2),
    // marginLeft: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: '1.8rem',
  },

  [`& .${classes.transparent}`]: {
    opacity: 0,
  },

  [`& .${classes.loadingWrap}`]: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  [`& .${classes.loader}`]: {
    minWidth: '19rem',
    height: '20rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

interface Props {
  loading: boolean
  addingRequest: boolean
  setAddingRequest: React.Dispatch<React.SetStateAction<boolean>>
  userTemplate: TemplateDetails | undefined
  submit: (props: {
    jobTitle: string
    url: string
    message: string
    template?: string
  }) => Promise<boolean>
}

export const NewRequest = (props: Props) => {
  const { addingRequest, setAddingRequest, loading, submit, userTemplate } =
    props
  const [jobTitle, setJobTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  // const [validTitle, setValidTitle] = useState(true)
  // const [validUrl, setValidUrl] = useState(true)
  // const [templateSelection, setTemplateSeclection] = useState(false)
  const [formDetails, setFormDetails] = useState(false)
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateDetails | null>(null)
  // const [preview, setPreview] = useState<TemplateDetails | null>(null)

  useEffect(() => {
    resetFormStats()
  }, [userTemplate])

  const resetFormStats = () => {
    // if (!userTemplate) {
    //   setFormDetails(true)
    //   return
    // } else {
    //   setFormDetails(false)
    // }

    if (!userTemplate) {
      setFormDetails(true)
    } else {
      setSelectedTemplate(userTemplate)
      setFormDetails(true)
    }
  }
  const cancelEdit = () => {
    reset()
    // setValidTitle(true)
    setAddingRequest(false)
    if (jobTitle) setJobTitle('')
    if (url) setUrl('')
    if (message) setMessage('')
  }

  const reset = () => {
    setAddingRequest(false)
    // setPreview(null)
    // setTemplateSeclection(false)
    setFormDetails(false)
    resetFormStats()
  }

  // const handleTemplateSelection = (template: TemplateDetails) => {
  //   setSelectedTemplate(template)
  //   setTemplateSeclection(false)
  //   setPreview(null)
  //   setFormDetails(true)
  // }

  // const handlePreview = (template: TemplateDetails) => {
  //   setPreview(template)
  //   setTemplateSeclection(false)
  // }

  // const handlePreviewSelection = (template: TemplateDetails) => {
  //   setSelectedTemplate(template)
  //   setPreview(null)
  //   setFormDetails(true)
  // }

  // const validateJobTitle = () => {
  //   setValidTitle(jobTitle.trim().length > 0)
  // }
  // const validateUrl = () => setValidUrl(url.trim().length > 0)

  const handleSave = async (props: {
    jobTitle: string
    url: string
    message: string
  }): Promise<boolean> => {
    const { jobTitle, url, message } = props
    const success = await submit({
      jobTitle,
      url,
      message,
      template: selectedTemplate?.id,
    })
    if (success) cancelEdit()
    return success
  }

  return (
    <>
      <StyledDialog
        open={addingRequest}
        onBackdropClick={() => cancelEdit()}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle
          style={{ width: '100%', minWidth: '18rem', paddingLeft: '1rem' }}
        >
          <Typography variant="h5" className={classes.title}>
            New Video
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => cancelEdit()}
            size="large"
          >
            <HighlightOffRounded fontSize="large" />
          </IconButton>
        </DialogTitle>
        {loading && (
          <div className={classes.loadingWrap}>
            <div className={classes.loader}>
              <CircularProgress size="10rem" />
            </div>
          </div>
        )}
        {/* {preview && (
          <Preview
            handlePreviewSelection={handlePreviewSelection}
            template={preview}
          />
        )} */}
        {/* {templateSelection && (
          <TemplateSelection
            userTemplate={userTemplate}
            handleTemplateSelection={handleTemplateSelection}
            handlePreview={handlePreview}
          />
        )} */}
        {formDetails && (
          <NewRequestContent
            submit={handleSave}
            template={selectedTemplate}
            marketingFlow={false}
          />
        )}
      </StyledDialog>
      <StyleButton
        variant="contained"
        onClick={() => setAddingRequest(true)}
        startIcon={<StyledAddRoundedIcon />}
      >
        Add Video
      </StyleButton>
    </>
  )
}
