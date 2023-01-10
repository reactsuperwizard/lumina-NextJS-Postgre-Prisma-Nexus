import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  Grid,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Box,
} from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import type {
  Asset,
  Customer,
  MasterTemplate,
  MutationUpdateOneMasterTemplateArgs,
  MutationUpdateOneScriptArgs,
  QueryAssetsArgs,
  QueryMasterTemplateArgs,
  QueryScriptArgs,
  ScriptUpdateInput,
  TemplateFlavor,
} from '@lumina/api'
import {
  GET_SCRIPT,
  GetScriptQuery,
  SaveScriptMutation,
  SAVE_SCRIPT,
  GetFlavorQuery,
  GET_FLAVOR,
} from 'modules/admin/scripts/queries'

import {
  SlideTypeMatcher,
  SlidePanel,
  CompensationPanel,
  DetailPanel,
  CustomerInstructions,
  CustomerNotes,
  AudioPanel,
  Options,
  ScriptHeader,
  StickyFooter,
} from './components'
import { Layer, Layers } from '@lumina/render/src/Script/Script'
import ChangeLog from './components/ChangeLog'
import { FormErrorDialog } from './modules/FormErrorDialog'
import { RenderVideoDialog } from './modules/RenderVideoDialog'
import MasterScriptDetailPanel from './components/MasterScriptDetailPanel'
import { toDateTimeString } from 'modules/admin/utils'
import GlobalField from './components/GlobalField'
import {
  SaveMasterScriptMutation,
  SAVE_MASTER_SCRIPT,
} from 'modules/admin/scripts/queries/SAVE_MASTER_SCRIPT'
import { PublishVideoDialog } from './modules/PublishVideoDialog'

type GetAssetQuery = Pick<Asset, 'id' | 'url' | 'name'>[]

const GET_ASSETS = gql`
  query assets($where: AssetWhereInput!) {
    assets(where: $where) {
      id
      url
      name
    }
  }
`

const GET_MASTER_TEMPLATE = gql`
  query Query($where: MasterTemplateWhereUniqueInput!) {
    masterTemplate(where: $where) {
      id
      layers
      updatedAt
      customer {
        name
        approvedTemplates
      }
    }
  }
`
export type GetMasterTemplateQuery = Pick<
  MasterTemplate,
  'id' | 'layers' | 'updatedAt'
> & { customer: Pick<Customer, 'name' | 'approvedTemplates'> }

interface Props {
  mode: 'script' | 'master'
}

export const Detail = ({ mode }: Props) => {
  const router = useRouter()
  const scriptId = router.query.id as string
  const customerId = Number(router.query.id as string)
  const flavor = router.query.flavor as TemplateFlavor
  const [openFormError, setOpenFormError] = useState(false)
  const [openPublishDialog, setOpenPublishDialog] = useState(false)
  const [render, setRender] = useState(false)
  const { data, refetch } = useQuery<
    { script: GetScriptQuery },
    QueryScriptArgs
  >(GET_SCRIPT, {
    variables: { where: { id: +scriptId } },
    skip: !scriptId || mode == 'master',
  })

  const { data: masterTemplateData } = useQuery<
    { masterTemplate: GetMasterTemplateQuery },
    QueryMasterTemplateArgs
  >(GET_MASTER_TEMPLATE, {
    variables: {
      where: {
        customerId_flavor: {
          customerId:
            mode === 'master' ? customerId : data?.script?.customer?.id!,
          flavor: mode === 'master' ? flavor : data?.script?.flavor!,
        },
      },
    },
    skip: mode == 'script',
  })

  const { data: flavorData } = useQuery<GetFlavorQuery>(GET_FLAVOR, {
    skip: !data && mode == 'script',
    variables: { name: mode == 'script' ? data?.script.flavor : flavor },
  })

  const [updateScript, { loading: updating, error }] = useMutation<
    { script: SaveScriptMutation },
    MutationUpdateOneScriptArgs
  >(SAVE_SCRIPT)

  const [
    updateMasterScript,
    { loading: updatingMasterScript, error: errorMasterScript },
  ] = useMutation<
    { masterTemplate: SaveMasterScriptMutation },
    MutationUpdateOneMasterTemplateArgs
  >(SAVE_MASTER_SCRIPT)

  const [fetchAssets] = useLazyQuery<
    { assets: GetAssetQuery },
    QueryAssetsArgs
  >(GET_ASSETS)

  const [currentSlideIndex, setCurrentSlide] = useState(0)
  const [successMessage, setSuccessMessage] = useState<string>()
  const [layers, setLayers] = useState<Layers>()
  const [slides, setSlides] = useState<string[][]>()
  const [submitError, setSubmitError] = useState(null)

  const methods = useForm({ mode: 'onChange', shouldUnregister: false })
  const { formState } = methods
  const { isDirty } = formState

  const getBgLayer = () => {
    const slideData = slides![currentSlideIndex]
    const bgKey = slideData.find((slide) => layers![slide].type === 'image')!
    if (bgKey) return { bgKey, layer: layers![bgKey!] }
    else return { bgKey: undefined, layer: undefined }
  }

  const getAudioLayer = () => {
    const keys = Object.keys(layers!)
    for (const key of keys) {
      const layer = layers![key]
      if (layer.type === 'audio') return { key, layer }
    }
    return {}
  }

  const validateForm = () => {
    const layerKeys = Object.keys(layers!)
    for (const key of layerKeys) {
      const layer = layers![key] as Layer
      if (layer.fieldType == 'image' || layer.fieldType == 'audio') {
        if (!layer.id) return false
      } else if (!layer.value) {
        return false
      }
    }
    return true
  }

  const handleRender = async () => {
    const updateData = updateForm()
    const isFormValid = validateForm()
    if (isFormValid) {
      setRender(true)
    } else {
      setOpenFormError(true)
    }
    await runUpdateScript(updateData)
  }

  const handlePublish = async () => {
    const { layers } = updateForm()
    await updateMasterScript({
      variables: {
        data: { layers },
        where: {
          customerId_flavor: {
            customerId,
            flavor,
          },
        },
      },
    })
    setOpenPublishDialog(false)
    if (!errorMasterScript) {
      setSuccessMessage('Published!')
      setTimeout(() => {
        setSuccessMessage(undefined)
      }, 4000)
    }
  }

  const handleMediaSelection = (
    asset: Pick<Asset, 'id' | 'url' | 'name'>,
    assetType: 'image' | 'audio',
  ) => {
    let key, layer
    if (assetType == 'image') {
      const { bgKey, layer: layerImg } = getBgLayer()
      key = bgKey
      layer = layerImg
    } else {
      const { key: audioKey, layer: layerAudio } = getAudioLayer()
      key = audioKey
      layer = layerAudio
    }
    layer = { ...layer, id: String(asset.id), url: asset.url, name: asset.name }
    setLayers({
      ...JSON.parse(JSON.stringify(layers)),
      ...{ [key!]: layer },
    })
  }

  const getLayerMissingAssetDetails = async (
    commonLayers: Layers,
  ): Promise<Layers> => {
    const assetIds: number[] = []
    Object.keys(commonLayers).forEach((layer) => {
      const layerDetails = commonLayers[layer] as Layer
      if (
        !layerDetails.url &&
        layerDetails.id &&
        (layerDetails.type == 'image' || layerDetails.type == 'audio')
      ) {
        assetIds.push(Number(layerDetails.id))
      }
    })
    if (assetIds.length > 0) {
      const response = await fetchAssets({
        variables: { where: { id: { in: assetIds } } },
      })
      const keys = Object.keys(commonLayers)
      const updatedLayers: Layers = {}
      for (const key of keys) {
        if (
          (commonLayers[key].type == 'image' ||
            commonLayers[key].type == 'audio') &&
          !commonLayers[key].url &&
          commonLayers[key].id
        ) {
          const updatedLayer = { ...commonLayers[key] }
          const assetData = response.data?.assets.find(
            (asset) => String(asset.id) == commonLayers[key].id,
          )
          updatedLayer.url = assetData?.url
          updatedLayer.name = assetData?.name!
          updatedLayers[key] = updatedLayer
        } else {
          updatedLayers[key] = commonLayers[key]
        }
      }
      return updatedLayers
    } else {
      return commonLayers
    }
  }

  useEffect(() => {
    if (
      (!data && mode === 'script') ||
      (mode === 'master' && !masterTemplateData)
    )
      return
    ;(async () => {
      let commonLayers: Layers
      if (mode === 'script') {
        setSlides(data?.script.slides)
        commonLayers = await getLayerMissingAssetDetails(data?.script?.layers!)
        setLayers(commonLayers)
      } else {
        setSlides(flavorData?.flavor?.slides)
        commonLayers = await getLayerMissingAssetDetails(
          flavorData?.flavor?.layers! as Layers,
        )
        const updatedLayers: Layers = {}
        Object.keys(commonLayers).forEach((layer) => {
          updatedLayers[layer] = {
            ...(commonLayers[layer] || {}),
            ...(masterTemplateData?.masterTemplate?.layers[layer] || {}),
          }
        })
        setLayers(updatedLayers)
      }
    })()
  }, [data, masterTemplateData])

  // Prevent accidental navigation while form data has not been saved
  useEffect(() => {
    if (!formState.isDirty) return

    router.events.on('routeChangeStart', handleRouteChangeStart)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [formState])

  useEffect(() => {
    methods.trigger()
  }, [currentSlideIndex])

  const updateForm = () => {
    const form = JSON.parse(JSON.stringify(methods.getValues()))
    const updateData: ScriptUpdateInput = {
      layers: JSON.parse(JSON.stringify(form.layers)),
      customerUpdate: { set: false },
    }

    if (!layers) {
      // NEVER
      throw new Error('Button should not be clickable before data is valid')
    }
    // layerName is read only
    // only layer.variableName and layer.src or layer.value is managed by form
    // merge before saving or this will overwrite the data inherited from Flavors
    // and needed at render time
    Object.keys(layers).forEach((layer) => {
      const layerType = layers[layer].fieldType
      let formLayer = form.layers[layer] || {}
      if (layerType == 'image' || layerType == 'audio') {
        if (form.layers[layer]?.id)
          formLayer = JSON.parse(form.layers[layer]?.id || {})
      }
      updateData.layers[layer] = {
        ...(layers[layer] || {}),
        ...formLayer,
      }
    })
    setLayers(updateData.layers)
    return updateData
  }

  useEffect(() => {
    if (data) updateForm()
  }, [currentSlideIndex])

  const onSubmit = async () => {
    const updateData = updateForm()
    return await runUpdateScript(updateData)
  }

  const generateChangeLog = () =>
    data?.script?.request.logs
      .map((row) => ({
        firstName: row.user.firstName!,
        createdAt: row.createdAt,
        event: row.event.replace(/([A-Z])/g, ' $1').trim(),
      }))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

  const runUpdateScript = async (updateData: ScriptUpdateInput) => {
    try {
      await updateScript({
        variables: { data: updateData, where: { id: +scriptId } },
      })
      setSuccessMessage('Saved!')
      const timer = setTimeout(() => {
        setSuccessMessage(undefined)
      }, 4000)
      return () => clearTimeout(timer)
    } catch (e: any) {
      setSubmitError(e.message)
      setTimeout(() => {
        setSubmitError(null)
      }, 4000)
    }
  }

  const handleRouteChangeStart = (url: string) => {
    const newRoute = `${router.pathname.split('[id]')[0]}${
      router.query?.id || ''
    }`
    if (url?.split('?')[0] === newRoute) return
    const isConfirmed = confirm('You have unsaved content!')
    if (!isConfirmed) {
      router.events.emit('routeChangeError')
      throw `This error can safely be ignored: Route change to was aborted to prevent unsaved changes See https://github.com/zeit/next.js/issues/2476.`
    }
  }

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault()
    if (isDirty) event.returnValue = 'You have unsaved content!'
  }

  if (!layers) return <CircularProgress />
  return (
    <>
      <FormErrorDialog
        onClose={() => setOpenFormError(false)}
        open={openFormError}
        setOpen={setOpenFormError}
      />
      <RenderVideoDialog
        refetch={refetch}
        open={render}
        setOpen={setRender}
        id={+scriptId}
      />
      <PublishVideoDialog
        open={openPublishDialog}
        setOpen={setOpenPublishDialog}
        loading={updatingMasterScript}
        error={errorMasterScript}
        handlePublish={handlePublish}
      />
      <FormProvider {...methods}>
        <form>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open
          >
            <div>
              {submitError && (
                <Alert elevation={6} variant="filled" severity="error">
                  {submitError}
                </Alert>
              )}
              {successMessage && (
                <Alert elevation={6} variant="filled" severity="success">
                  {successMessage}
                </Alert>
              )}
            </div>
          </Snackbar>
          <Grid container spacing={2} fontSize={14}>
            <Grid item xs={12}>
              <ScriptHeader
                status={data?.script.request.status!}
                mode={mode}
                title={
                  mode === 'master'
                    ? `${flavor} - ${flavorData?.flavor.name}`
                    : `Script #${scriptId}`
                }
                subtitle={
                  mode === 'master'
                    ? `Master Script`
                    : `Request #${data?.script.request.id}`
                }
              />
            </Grid>
            {mode == 'script' ? (
              <Grid item xs={8}>
                <DetailPanel script={data?.script!} />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <MasterScriptDetailPanel
                  customerId={customerId}
                  customerName={
                    masterTemplateData?.masterTemplate.customer.name!
                  }
                  lastUpdateDate={
                    masterTemplateData?.masterTemplate
                      ? toDateTimeString(
                          masterTemplateData.masterTemplate.updatedAt,
                        )
                      : ''
                  }
                />
              </Grid>
            )}
            {mode === 'script' && (
              <Grid item xs={4}>
                <CompensationPanel script={data?.script!} />
              </Grid>
            )}

            <Grid item xs={8}>
              <Stack spacing={2}>
                {flavorData && layers && Object.keys(layers).length > 0 && (
                  <>
                    <SlidePanel
                      {...{ currentSlideIndex, setCurrentSlide, slides }}
                      flavorData={flavorData?.flavor!}
                      key={currentSlideIndex}
                      handleImageSelection={(asset) =>
                        handleMediaSelection(asset, 'image')
                      }
                      imageLayer={getBgLayer()?.layer}
                      mode={mode}
                    >
                      <SlideTypeMatcher
                        {...{ slides, layers, currentSlideIndex }}
                        flavorData={flavorData?.flavor!}
                      />
                    </SlidePanel>

                    <AudioPanel
                      handleAudioSelection={(asset) =>
                        handleMediaSelection(asset, 'audio')
                      }
                      audioLayer={getAudioLayer().layer!}
                    />
                  </>
                )}
              </Stack>
            </Grid>

            <Grid item xs={4}>
              {mode === 'script' && (
                <Stack spacing={2}>
                  <CustomerInstructions script={data?.script! || {}} />
                  <CustomerNotes script={data?.script! || {}} />
                  <Options
                    script={data?.script!}
                    onSubmit={updateForm}
                    updating={updating}
                    error={error}
                    layers={layers!}
                  />
                </Stack>
              )}
              {mode == 'master' && (
                <Box sx={{ border: '1px solid #D9D9D9', padding: '1rem' }}>
                  <Typography
                    fontSize={'1.25rem'}
                    fontWeight={'bold'}
                    mb={'1rem'}
                  >
                    Global Variables
                  </Typography>
                  {flavorData?.flavor.globals.map((global, i) => {
                    const layer = layers![global]
                    if (layer.fieldType === 'audio') return
                    return (
                      <GlobalField
                        layer={layer}
                        global={global}
                        key={`global-${i}-${global}`}
                        aeNames={true}
                        mode={mode}
                        updateForm={updateForm}
                      />
                    )
                  })}
                </Box>
              )}
            </Grid>
          </Grid>
        </form>
        {mode == 'script' && data?.script?.request?.logs?.length! > 0 && (
          <>
            <Typography
              color="#090A3F"
              fontWeight={'bold'}
              fontSize={'1.25rem'}
              mt={'1rem'}
            >
              Change Log
            </Typography>
            <ChangeLog rows={generateChangeLog()!} />
          </>
        )}
        <StickyFooter
          {...{ onSubmit, handleRender }}
          lastUpdated={new Date(data?.script?.updatedAt)}
          mode={mode}
          handlePublish={() => setOpenPublishDialog(true)}
        />
      </FormProvider>
    </>
  )
}
