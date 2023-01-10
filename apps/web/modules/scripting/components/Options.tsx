import { useMemo, useState } from 'react'
import { ApolloError } from '@apollo/client'
import { Box, styled } from '@mui/system'
import TuneIcon from '@mui/icons-material/Tune'
import { Button, CircularProgress, Grid } from '@mui/material'

import { LuminaDrawer } from 'modules/utils/LuminaDrawer'
import { GetScriptQuery } from 'modules/admin/scripts/queries'
import { Loader } from 'modules/admin/scripts/ScriptEdit/Resources'
import { LuminaErrorText } from 'modules/utils/LuminaErrorText'
import GlobalField from './GlobalField'
import { Layers } from '@lumina/render/src/Script/Script'

const Root = styled(Button)(({ theme }) => ({
  border: `1px solid #D9D9D9`,
  borderRadius: `4px`,
  padding: theme.spacing(2),
  display: 'flex',
  placeContent: 'flex-start',
}))

const PREFIX = 'Script-Options'

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

const Options = ({
  script,
  onSubmit,
  updating,
  error,
  layers,
}: {
  script: GetScriptQuery
  onSubmit: () => void
  updating: boolean
  error: ApolloError | undefined
  layers: Layers
}) => {
  const [open, setOpen] = useState(false)
  const Globals = useMemo(() => {
    if (script?.globals) {
      return script?.globals.map((global, i) => {
        const layer = layers![global]
        if (layer.fieldType === 'audio') return
        return (
          <GlobalField
            layer={layer}
            global={global}
            key={`global-${i}-${global}`}
            aeNames={true}
            mode={'script'}
            updateForm={() => {}}
          />
        )
      })
    }
    return <Loader />
  }, [script, layers])

  const applyChanges = async () => {
    await onSubmit()
    setOpen(false)
  }

  return (
    <>
      <LuminaDrawer
        title={`Global variables`}
        open={open}
        anchor="right"
        onClose={() => setOpen(false)}
      >
        <Box width={1} py={1}>
          <Grid container item spacing={5} xs={12}>
            {Globals}
          </Grid>
        </Box>
        <Box>
          {error ? (
            <LuminaErrorText>Something went Wrong!</LuminaErrorText>
          ) : (
            ''
          )}
        </Box>
        <StyledButtonBox className={classes.buttonBox}>
          <Button
            disabled={updating}
            className={classes.accept}
            onClick={applyChanges}
          >
            {updating ? (
              <CircularProgress color="secondary" size={'1rem'} />
            ) : (
              'Apply Changes'
            )}
          </Button>
          <Button
            disabled={updating}
            className={classes.close}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </StyledButtonBox>
      </LuminaDrawer>
      <Root
        variant="text"
        startIcon={<TuneIcon />}
        onClick={() => setOpen(true)}
      >
        Global Variables
      </Root>
    </>
  )
}

export default Options
