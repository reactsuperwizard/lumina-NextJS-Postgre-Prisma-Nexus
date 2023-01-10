import { useMemo, useState } from 'react'
import { styled } from '@mui/system'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import { Button } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Asset } from '@lumina/api'
import { Layer } from '@lumina/render/src/Script/Script'
import { Flavor } from '@lumina/render/src/flavors'
import SlideNavigator from './SlideNavigator'
import ValidationInfo from './ValidationInfo'
import { MediaModal } from './MediaModal'

type Props = {
  currentSlideIndex: number
  setCurrentSlide: (func: (slideNumberToSet: number) => number) => void
  handleImageSelection: (
    asset: Pick<Asset, 'id' | 'publicId' | 'assetType' | 'url' | 'name'>,
  ) => void
  imageLayer: Layer | undefined
  mode: 'master' | 'script'
  flavorData: Flavor
}

const prefix = `SLIDE_PANEL`
const classes = {
  validation: `${prefix}-validation-div`,
}

const Root = styled('div')(({ theme }) => ({
  border: `1px solid #D9D9D9`,
  borderRadius: `4px`,
  width: '100%',
  [`& .${classes.validation}`]: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    color: '#0A0A0A',
    gap: theme.spacing(2),
    '> div': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
  },
}))

const getValidationMessages = (
  imageLayer: Layer | undefined,
  emptyFieldsCount: number,
) => {
  const result = [
    {
      isValid: emptyFieldsCount ? false : true,
      text: emptyFieldsCount
        ? `${emptyFieldsCount} field does not have input`
        : 'All fields have input',
    },
  ]
  if (imageLayer)
    result.push({
      isValid: imageLayer.id ? true : false,
      text: imageLayer.id ? 'Image selected' : 'No image selected',
    })
  return result
}

const SlidePanel = ({
  children,
  setCurrentSlide,
  currentSlideIndex,
  flavorData,
  handleImageSelection,
  imageLayer,
  mode,
}: React.PropsWithChildren<Props>) => {
  const { formState } = useFormContext()
  const { errors } = formState
  const [dialogOpen, setDialogOpen] = useState(false)
  const emptyFieldsCount = Object.keys(errors.layers || {}).filter(
    (layerName) => flavorData.slides[currentSlideIndex].includes(layerName),
  ).length

  const validationMessages = useMemo(() => {
    return getValidationMessages(imageLayer, emptyFieldsCount)
  }, [imageLayer, emptyFieldsCount])
  return (
    <Root>
      {children}
      <div className={`${classes.validation}`}>
        <div>
          <MediaModal
            open={dialogOpen}
            setOpen={setDialogOpen}
            assetType="image"
            onSelect={handleImageSelection}
          />
          {imageLayer && (
            <Button
              variant="contained"
              startIcon={<InsertPhotoIcon />}
              onClick={() => setDialogOpen(true)}
            >
              Select Image
            </Button>
          )}
          {imageLayer?.id && (
            <>
              <strong>Image Anchor</strong>
              <span>
                {imageLayer.name} (ID {imageLayer.id})
              </span>
              {/* <CloseIcon /> */}
            </>
          )}
        </div>
        <div>
          {mode === 'script' &&
            validationMessages.map((item, index) => (
              <ValidationInfo key={index} data={item} />
            ))}
          <div style={{ marginLeft: 'auto' }} />
          <SlideNavigator {...{ currentSlideIndex, setCurrentSlide }} />
        </div>
      </div>
    </Root>
  )
}

export default SlidePanel
