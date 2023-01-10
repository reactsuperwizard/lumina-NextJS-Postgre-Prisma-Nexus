import { GraphQLClient as IGraphQLClient } from 'graphql-request'
import { makeRGBColor } from '../utils/makeRGBColor'

import path from 'path'

import {
  T1,
  T2,
  T4,
  T6,
  T7,
  T8,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
} from '../flavors'

import { TemplateFlavor } from '@lumina/api'

import {
  INexrenderTemplate,
  INexrenderDataAsset,
  INexrenderFootageAsset,
  IJob,
  IRenderMap,
  // IVariable,
  // IMapsUnion,
} from '../types'
import type { Layers } from '../Script/Script'
import { Asset } from '@lumina/api'
import { ScriptQuery } from '../Script'
import { updateRender } from '../queue'
import { RenderStatus } from '@lumina/api'

const _makeTemplate = (flavor: TemplateFlavor) => {
  let templateDefinitions: INexrenderTemplate
  switch (flavor) {
    case TemplateFlavor.T1:
      templateDefinitions = T1.template
      break
    case TemplateFlavor.T2:
      templateDefinitions = T2.template
      break
    case TemplateFlavor.T4:
      templateDefinitions = T4.template
      break
    case TemplateFlavor.T6:
      templateDefinitions = T6.template
      break
    case TemplateFlavor.T7:
      templateDefinitions = T7.template
      break
    case TemplateFlavor.T8:
      templateDefinitions = T8.template
      break
    case TemplateFlavor.T10:
      templateDefinitions = T10.template
      break
    case TemplateFlavor.T11:
      templateDefinitions = T11.template
      break
    case TemplateFlavor.T12:
      templateDefinitions = T12.template
      break
    case TemplateFlavor.T13:
      templateDefinitions = T13.template
      break
    case TemplateFlavor.T14:
      templateDefinitions = T14.template
      break
    case TemplateFlavor.T15:
      templateDefinitions = T15.template
      break
    case TemplateFlavor.T16:
      templateDefinitions = T16.template
      break
    default:
      throw new Error(
        `${flavor} not found. Are you using one of ${Object.keys(
          TemplateFlavor,
        )}??`,
      )
  }
  return templateDefinitions
}

const _makeFootageAsset = async (
  client: IGraphQLClient,
  layerName: string,
  assetId: number,
  type: INexrenderFootageAsset['type'],
) => {
  // const id = variablesByName[variable].value
  const assetQuery = `query asset($where: AssetWhereUniqueInput!){
    asset(where: $where) {
      url
    }
  }
  `

  try {
    const assetVariables = {
      where: { id: assetId },
    }
    const { asset } = await client.request<{ asset: Pick<Asset, 'url'> }>(
      assetQuery,
      assetVariables,
    )

    const url = asset.url
    if (!url) {
      throw new Error(
        `There was a problem with asset ${assetId}.  No "secure_url" was found on asset.`,
      )
    }
    return {
      src: url,
      type,
      layerName,
    }
  } catch (e) {
    throw e
  }
}

const _makeColorAsset = (
  layerName: string,
  value: string,
  // variable: string,
  // variablesByName: any,
): INexrenderDataAsset => {
  const rgbValue = makeRGBColor(value)
  if (!rgbValue)
    throw new Error(`Couldn't parse color variable ${layerName} from script.`)

  return {
    type: 'data',
    layerName: layerName,
    property: 'Effects.Fill.Color',
    value: rgbValue,
    composition: '_control',
  }
}

const _makeTextAsset = (
  layerName: string,
  value: string,
): INexrenderDataAsset => {
  // const value = variablesByName[variable].value
  return {
    type: 'data',
    layerName,
    property: 'Text.Source Text',
    value,
    composition: '_control',
  }
}

const _makeAssets = async (
  client: IGraphQLClient,
  layers: Layers,
  // maps: IMapsUnion[],
) => {
  const assets = []
  const layerNames = Object.keys(layers)

  for (const layerName of layerNames) {
    const layer = layers[layerName]
    switch (layer.fieldType) {
      case 'color':
        layer
        // assets.push(_makeColorAsset(layer, variable, variablesByName))
        assets.push(_makeColorAsset(layerName, layer.value))
        break
      case 'textArea':
      case 'text':
        assets.push(_makeTextAsset(layerName, layer.value))
        break
      case 'image':
        assets.push(
          await _makeFootageAsset(client, layerName, +layer.id, 'image'),
        )
        break
      case 'audio':
        assets.push(
          await _makeFootageAsset(client, layerName, +layer.id, 'audio'),
        )
        break
      default:
        throw new Error(
          'Make sure you are using fieldType defined in Layers in FlavoredScript.',
        )
    }
  }
  return assets
}

const _createJob = async (client: IGraphQLClient, script: ScriptQuery) => {
  const { flavor, layers } = script
  const templateLayer: INexrenderTemplate = _makeTemplate(flavor)
  // handle odd behavior on render engine
  const isWin = process.platform === 'win32'
  if (isWin) {
    templateLayer.outputExt =
      flavor === TemplateFlavor.T7 || flavor === TemplateFlavor.T11
        ? 'mov'
        : 'avi'
  }
  // handle alternateTemplate
  if (script.layers.alternateTemplate?.value) {
    const newLocation = `../../render-templates/${script.layers.alternateTemplate.value}`
    templateLayer.src = `file://${path.join(__dirname, newLocation)}`
  }
  const { alternateTemplate: _, ...safeLayers } = layers
  const assetsLayer: (INexrenderFootageAsset | INexrenderDataAsset)[] =
    await _makeAssets(client, safeLayers)
  const scriptId: number = script.id
  const job: IJob = {
    scriptId,
    aeRenderData: {
      template: templateLayer,
      assets: assetsLayer,
    },
  }
  return job
}

const createJob = async (
  client: IGraphQLClient,
  script: ScriptQuery,
  render: IRenderMap,
): Promise<IJob | null> => {
  try {
    return await _createJob(client, script)
  } catch (e: any) {
    if (render.renderId)
      updateRender(client, {
        where: { id: render.renderId },
        data: {
          status: { set: RenderStatus.Errored },
          error: { set: e?.message || 'Failed to create job' },
        },
      })
  }
  return null
}

export default { createJob }
