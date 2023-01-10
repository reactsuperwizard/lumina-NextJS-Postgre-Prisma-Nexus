import React, { useState, useEffect, useMemo, useReducer } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import {
  useMutation,
  useQuery,
  ApolloQueryResult,
  useApolloClient,
  gql,
} from '@apollo/client'
import { useRouter } from 'next/router'

import { Paper, Box, CircularProgress, Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import { MissingAssetsDialog } from './Resources/MissingAssetsDialog'

import { Layers } from '@lumina/render/src/Script/Script'

import type {
  MutationUpdateOneScriptArgs,
  ScriptUpdateInput,
  QueryScriptArgs,
  Render as RenderType,
  Asset,
  QueryAssetsArgs,
} from '@lumina/api'

import {
  Global,
  ScriptDetails,
  ButtonsAndModals,
  Render,
  Slide,
  Loader,
  ScriptEditLayout,
} from './Resources'
import {
  GET_RENDERS,
  GET_SCRIPT,
  SAVE_SCRIPT,
  GetScriptQuery,
  SaveScriptMutation,
  GET_FLAVOR,
  GetFlavorQuery,
} from '../queries'

export type RefetchRenders = (
  variables?: Partial<Record<string, any>> | undefined,
) => Promise<
  ApolloQueryResult<{
    renders: RenderType[]
  }>
>

export type SetQueuedRender = React.Dispatch<
  React.SetStateAction<RenderType | null>
>
export type SetRefetchRenders = React.Dispatch<
  React.SetStateAction<RefetchRenders | null>
>

type GetAssetQuery = Pick<Asset, 'id'>[]

const GET_ASSETS = gql`
  query assets($where: AssetWhereInput!) {
    assets(where: $where) {
      id
    }
  }
`

export const ScriptEdit = () => {
  const router = useRouter()
  const client = useApolloClient()

  const scriptId = router.query.id as string
  const [submitCountz, dispatchCountz] = useReducer(
    (currentCount) => (currentCount += 1),
    0,
  )
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [aeNames, setAeNames] = useState(false)
  const [assetIds, setAssetIds] = useState<number[] | null>(null)
  const [missingIds, setMissingIds] = useState<number[] | null>(null)
  const [missingAssetsDialogOpen, setMissingAssetsDialogOpen] = useState(false)
  const [customerUpdated, setCustomerUpdated] = useState<boolean>(false)

  const { data, loading } = useQuery<
    { script: GetScriptQuery },
    QueryScriptArgs
  >(GET_SCRIPT, {
    variables: { where: { id: +scriptId } },
    skip: !scriptId,
  })

  const [updateScript, { loading: updating }] = useMutation<
    { script: SaveScriptMutation },
    MutationUpdateOneScriptArgs
  >(SAVE_SCRIPT)

  const {
    data: rendersData,
    loading: loadingRenders,
    refetch: refetchRenders,
  } = useQuery<{ renders: RenderType[] }>(GET_RENDERS, {
    variables: {
      where: {
        script: { id: { equals: +scriptId } },
      },
    },
    skip: !scriptId,
  })

  const { data: assetQuery, refetch: refetchAssets } = useQuery<
    { assets: GetAssetQuery },
    QueryAssetsArgs
  >(GET_ASSETS, {
    variables: {
      where: {
        id: {
          in: assetIds,
        },
      },
    },
  })

  const { globals, slides, layers, customerUpdate } = data?.script || {}

  // Set up for react-hook-form
  const methods = useForm({ mode: 'onChange' })
  const { trigger, formState, reset, getValues } = methods
  const { isValid, isDirty } = formState

  useEffect(() => {
    if (customerUpdate) {
      return setCustomerUpdated(true)
    } else return
  }, [customerUpdate])
  // Redirect if script does not exist
  useEffect(() => {
    if (!loading && data?.script === null) {
      const redirect = setTimeout(() => router.replace('./'), 2000)
      return () => {
        clearTimeout(redirect)
      }
    }
  }, [loading, data])

  // Reset default form data on every successful update
  useEffect(() => {
    if (submitCountz > 0) {
      reset({ ...data?.script })
    }
  }, [submitCountz])

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

  // When script loads, get id for any assets currently in use
  useEffect(() => {
    if (!layers) return
    const currentAssetIds = getListOfAssetIds(layers)
    setAssetIds(currentAssetIds || null)
  }, [layers])

  // On script load and asset query, check if any used assets are missing
  useEffect(() => {
    if (!assetQuery || !assetIds) return
    const assetExist = assetQuery.assets.map((a) => a.id)
    const getMissingIds = checkForDeletedAssets(assetIds, assetExist)
    if (getMissingIds.length > 0) {
      setMissingIds(getMissingIds)
    }
  }, [assetQuery, assetIds])

  // Trigger dialog with missing assets when missingIds has values
  useEffect(() => {
    if (missingIds && missingIds.length > 0) setMissingAssetsDialogOpen(true)
  }, [])

  const getListOfAssetIds = (layers: Layers) => {
    const arrayOfAssetIds = Object.entries(layers)
      .filter((layer) => layer[1].id)
      .map((l) => parseInt(l[1].id || ''))
    return arrayOfAssetIds
  }

  const checkForDeletedAssets = (inUse: number[], exist: number[]) =>
    inUse.filter((id) => !exist.includes(id))

  const handleSubmit = async () => {
    const form = getValues()
    const updateData: ScriptUpdateInput = {
      layers: form.layers,
      customerUpdate: { set: false },
    }
    if (!layers || !data) {
      // NEVER
      throw new Error('Button should not be clickable before data is valid')
    }
    const currentIds = getListOfAssetIds(form.layers)
    setAssetIds(currentIds || null)
    const assetsRefetched = await refetchAssets({
      where: { id: { in: currentIds } },
    })
    const assetsThatExist = assetsRefetched.data.assets.map((a) => a.id)
    const missing = checkForDeletedAssets(
      currentIds || [],
      assetsThatExist || [],
    )
    if (missing.length > 0) {
      setMissingAssetsDialogOpen(true)
      return
    }
    // layerName is read only
    // only layer.variableName and layer.src or layer.value is managed by form
    // merge before saving or this will overwrite the data inherited from Flavors
    // and needed at render time
    Object.keys(layers).forEach((layer) => {
      updateData.layers[layer] = {
        ...data.script.layers[layer],
        ...form.layers[layer],
      }
    })
    return await runUpdateScript(updateData)
  }

  const runUpdateScript = async (updateData: ScriptUpdateInput) => {
    try {
      await updateScript({
        variables: { data: updateData, where: { id: +scriptId } },
      })
      setSuccess(true)
      dispatchCountz()
      const timer = setTimeout(() => {
        setSuccess(false)
      }, 4000)
      return () => clearTimeout(timer)
    } catch (e: any) {
      setSubmitError(e.message)
      setTimeout(() => {
        setSubmitError(null)
      }, 4000)
    }
  }

  const repair = async () => {
    if (isDirty) confirm(`Save content before repairing!`)
    if (!data?.script || isDirty) return
    const { data: flavorData } = await client.query<GetFlavorQuery>({
      query: GET_FLAVOR,
      variables: { name: data.script.flavor },
    })
    const { layers: flavorLayers, slides, globals } = flavorData.flavor
    const layers: any = {}
    Object.keys(flavorLayers).forEach((l) => {
      const flavorLayer = flavorLayers[l]
      const scriptVariable =
        data.script.layers[l]?.scriptVariable ||
        flavorLayer.scriptVariable ||
        ''
      const scriptLayer = {
        ...data.script.layers[l],
        ...flavorLayer,
        scriptVariable,
      }
      if (data.script.layers[l]?.id) scriptLayer.id = data.script.layers[l].id
      if (data.script.layers[l]?.value)
        scriptLayer.value = data.script.layers[l].value
      layers[l] = scriptLayer
    })
    const updateData: ScriptUpdateInput = { layers, slides, globals }
    await runUpdateScript(updateData)
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

  const handleUpdateProducer = (producerId: number) => {
    updateScript({
      variables: {
        data: { producer: { connect: { id: producerId } } },
        where: { id: +scriptId },
      },
    })
  }

  const Slides = useMemo(() => {
    if (slides) {
      return slides.map((slide, i) => (
        <Slide
          slide={slide}
          i={i}
          layers={layers}
          key={`slide-${i}`}
          aeNames={aeNames}
        />
      ))
    }
    return <Loader />
  }, [slides, aeNames])
  const Globals = useMemo(() => {
    if (globals) {
      return globals.map((global, i) => {
        const layer = layers![global]
        return (
          <Global
            layer={layer}
            global={global}
            key={`global-${i}-${global}`}
            aeNames={aeNames}
          />
        )
      })
    }
    return <Loader />
  }, [globals, aeNames])

  if (data?.script === null) {
    return <h1>Script not found... Redirecting to scripts page.</h1>
  }

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <>
              {submitError && (
                <Alert elevation={6} variant="filled" severity="error">
                  {submitError}
                </Alert>
              )}
              {success && (
                <Alert elevation={6} variant="filled" severity="success">
                  Saved!
                </Alert>
              )}
            </>
          </Snackbar>
          <ScriptEditLayout
            title={`Script #${data?.script.id}
            ${
              data?.script?.request?.id &&
              ` for Request #${data.script.request.id}`
            }`}
            loadingIcon={loading || updating ? <CircularProgress /> : null}
            scriptDetails={
              <ScriptDetails
                data={data}
                scriptId={scriptId}
                connectProducer={handleUpdateProducer}
                aeNames={aeNames}
                toggleAE={() => setAeNames(!aeNames)}
                validate={() => trigger()}
              />
            }
            globals={Globals}
            slides={Slides}
            buttonsAndModals={
              <ButtonsAndModals
                data={data}
                scriptId={scriptId}
                isDirty={isDirty}
                isValid={isValid}
                updating={updating}
                success={success}
                handleSubmit={handleSubmit}
                rendersData={rendersData}
                refetchRenders={refetchRenders}
                loadingRenders={loadingRenders}
                repair={repair}
                customerUpdated={customerUpdated}
              />
            }
          />
        </form>
      </FormProvider>
      <MissingAssetsDialog
        open={missingAssetsDialogOpen}
        onClose={() => {
          setMissingAssetsDialogOpen(false)
          setMissingIds(null)
        }}
        missingAssetIds={missingIds}
      />
      <Box m={4}>
        <Paper>
          <Render loading={loadingRenders} renders={rendersData?.renders} />
        </Paper>
      </Box>
    </>
  )
}
