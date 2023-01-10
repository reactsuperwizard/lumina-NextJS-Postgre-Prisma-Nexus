# Lumina Render

This is where the core rendering engine for Lumina lives.

## Overview

After Effects is the program that we use to create video Templates which are then customized by our render app. Within AE there is something called a comp (short for composition) that represents a video timeline. All Lumina videos have two primary comps that are used to handle core app behavior: `_control` and `Main`. The `Main` comp is what is actually rendered and represents the layout of the video. The `_control` comp is what our application directly edits and contains fields for text and colors that are used as variables throughout the video via expressions (code snippets inside the AE Template).

Our application functions by:

- Creating a folder in `/videos` with a unique hash name where all files will be stored
- Converting the provided script to a job (Lumina asset ID’s converted to asset urls, etc.)
- Downloading all necessary assets (video/audio files)
- Making a copy of the needed AE Template that will be used for this video
- Using the `@nexrender` package, variables are updated by `Layer Name` matching
- Images are replaced directly, also by `Layer Name`
- The now complete AE Template is rendered to a lossless `mov`/`avi` file (mac/win)
- The app converts the huge lossless file into a smaller `.mp4` for uploading
- The file is uploaded to Vimeo (replacing previous version if it exists)
- All files are removed except for a local copy of the `.mp4` and `.log` file

## Outputs

1. `/dist` this includes any types or other files consumed by another package. For example, `src/flavors`. Built with `dist.tsconfig.json`.
1. `/build` this includes the entire application needed for rendering that is packaged into a binary and deployed. Built with `build.tsconfig.json`.

## Terminology

- **job**: Refers to a `.json` description of instructions for Adobe After Effects to use in rendering a video. For example, photos, music, dynamic text, an AE Template, etc.
- **rendering**: this application uses nexrender to render videos based on the instructions received from `some-job.json`.
- **template**: is an AE Template that includes the bones for a final video. Templates need to define specific things - for example `title`, `description`, `brandPrimary`, `audio`, etc.
- **flavor**: Refers to a object representation of all fields needed to populate a template with their descriptions and type.

## Getting Started

```
yarn
yarn start
// you may have to use sudo the first time, and only the first time, since
// nexrender needs admin privileges to bootstrap the use of `aerender`
```

## Developing

Adding new AE Templates is a multi-step process:

#### Wiring An AE Template

- Create a `_control` comp with all necessary text fields and rectangles for all needed colors
- For each text field in the video, add an expression to the `Text > Source Text` field connecting it to the corresponding `_control` field
  - For a field named `position`, the expression would be :`comp("_control").layer("position").text.sourceText`
- For each item that needs to be colored, add `Effect > Generate > Fill` then in `Effects > Fill > Color` add the expression pointing to the proper color
  - For a color that is named `primaryTextColor`, the expression would be: `comp("_control").layer("primaryTextColor").effect("Fill")("Color")`
- Name all images to have a Layer Name that exactly matches the corresponding field name in the Flavor
- Replace all placeholder text in `_control` with zeroes to determine the max character length
- Use existing animation presets (found in `ae-animation-presets` folder via Adobe Bridge) to vertically center bullet text and scale images (`Scale.fit` for logos for example)
- When in doubt about a way to solve a tricky issue, refer to existing templates to locate the most similar challenge and use that solution as a starting point

## Scaffolding

- Add the template name to `../api/prisma/schema.prisma` in `TemplateFlavor`
- Connect template in `../api/src/types/Flavor/resolvers`
- Create a new Flavor file in `src/flavors` following the format of existing Flavors and connect it in `src/flavors/index`
- Double check that the Flavor is properly formatted:
  - In `template` make sure that `src` matches the actual location of the AE template
  - In `layers` make sure that every field from `_control` is spelled the same way as the Layer Name and that all images and audio fields are represented
  - Verify that every field from `layers` is represented in EITHER `globals` or `slides` depending in where it is used in AE
- Connect the template in the following locations following the pattern used for previous templates:
  - `src/types`
  - `src/Job/index`
- Run `yarn render dist` to add the template to the generated definitions referenced by the API
- Migrate the DB and generate the API (see API documentation if not clear on how to do this)
- Create mock Script and Job for the template in the `sample-data` folder and connect in `scripts/render-local`
- Render the sample data to verify the template was wired correctly
  - To render the sample Script for a template called `T0`, run `yarn render render:local -t=T0 -s`
  - See comments in `scripts/render-local` for more details
- Connect the new Flavor in web:
  - Add to select options in `../web/modules/admin/requests/AddScriptDialog.tsx`
  - Add to select options in `../web/modules/admin/scripts/NewScript.tsx`

### ./src

`index`: manages the script process and takes multiple scripts as a parameter to render videos from.
`jobs`: uses the data from a `script` and its associated `flavor` to create a `job` object.
`render`: uses job data to render videos

### ./docs

Documentation. Yea. Document things, and read things other people have documented. TODO: per SOP.

# Jobs

Job structure has more fields, that we haven't checked out yet. The detailed version of the structure looks like this:

```js
{
    "template": {
        "src": String,
        "composition": String,

        "frameStart": Number,
        "frameEnd": Number,
        "frameIncrement": Number,

        "continueOnMissing": Boolean,
        "settingsTemplate": String,
        "outputModule": String,
        "outputExt": String,
    },
    "assets": [],
    "actions": {
        "prerender": [],
        "postrender": [],
    },
    "onChange": Function,
    "onRenderProgress": Function
}
```

Majority of the fields are just proxied to the `aerender` binary, and their descriptions and default
values can be checked [here](https://helpx.adobe.com/after-effects/using/automated-rendering-network-rendering.html).

- `onChange` is a [callback](https://github.com/inlife/nexrender/blob/master/packages/nexrender-core/src/helpers/state.js) which will be triggered every time the job state is changed (happens on every task change).

- `onRenderProgress` is a [callback](https://github.com/inlife/nexrender/blob/master/packages/nexrender-core/src/tasks/render.js) which will be triggered every time the rendering progress has changed.

Note: Callback functions are only available via programmatic use. For more information, please refer to the source code.

# Template rendering

One of the main benefits of using nexrender is an ability to render projects using data other than what has been used while the project has been created.
Data means any sort of source/footage material, it can be images, audio tracks, video clips, text strings, values for colors/positions, even dynamic animations using expressions.
All of those things can be replaced for every job without even opening a project file or starting After Effects.

> Note: Also this process can be called in other ways: **templated**, **data-driven** or **dynamic** video generation.

This approach allows you to create a .aep file once, and then reuse it for as many target results as you need to.
However, what is needed to get started?

## Footage items

Footage item replacement is what briefly has been covered in the `Job` section of this document.
The idea is quite simple, you describe which asset will replace existing described footage item in a specific layer,
by specifying `src`, and one of the `layerName` or `layerIndex` options.

### Fields

- `src`: string, a URI pointer to the specific resource, check out [supported protocols](#protocols)
- `type`: string, for footage items, is one of (`image`, `audio`, `video`)
- `layerName`: string, target layer name in the After Effects project
- `layerIndex`: integer, can be used instead of `layerName` to select a layer by providing an index, starting from 1 (default behavior of AE jsx scripting env)
- `composition`: string, composition where the layer is, useful for searching layer in pre-compositions. If none is provided, it uses the default composition set in the template.
  Providing `"*"` will result in a wildcard compostion matching, and will apply this data to every matching layer in every matching composition.

Specified asset from `src` field will be downloaded/copied to the working directory, and just before rendering will happen,
a fotage item with specified `layerName` or `layerIndex` in the original project will be replaced with the freshly downloaded asset.

This way you (if you are using network rendering) you can not only deliver assets to the target platform but also dynamically replace them.

> Note: if `layerName` is used for footage file asset, it should always contain the extension in the name as well.

### Example

```json
{
  "assets": [
    {
      "src": "https://example.com/assets/image.jpg",
      "type": "image",
      "layerName": "MyNicePicture.jpg"
    },
    {
      "src": "file:///home/assets/audio.mp3",
      "type": "audio",
      "layerIndex": 15
    }
  ]
}
```

## Data items

The second important point for the dynamic data-driven video generation is the ability to replace/change/modify non-footage data in the project.
To do that a special asset of type `data` can be used.

### Fields

- `type`: string, for data items, is always `data`
- `layerName`: string, target layer name in the After Effects project
- `layerIndex`: integer, can be used instead of `layerName` to select a layer by providing an index, starting from 1 (default behavior of AE jsx scripting env)
- `property`: string, indicates which layer property you want to change
- `value`: mixed, optional, indicates which value you want to be set to a specified property
- `expression`: string, optional, allows you to specify an expression that can be executed every frame to calculate the value
- `composition`: string, composition where the layer is, useful for searching layer in pre-compositions. If none is provided, it uses the default composition set in the template.

Since both `value` and `expression` are optional you can provide them in any combination, depending on the effect you want to achieve.
Providing value will set the exact value for the property right after execution, and providing an expression will make sure it will be evaluated every frame.

> Note: If you are not sure what expressions are, and how to use them, please refer [to this page](https://helpx.adobe.com/after-effects/using/expression-basics.html)

And if you are not sure what is a `property` and where to get it you can refer to this image:

<details>
<summary><b>Property Example</b></summary>

> As you can see there are a few `Property Groups` like Text, Masks, Transform that include actual properties. Those properties are what can be used as a target.

![](https://user-images.githubusercontent.com/2182108/52443468-7270dd00-2b2e-11e9-8336-255349279c43.png)

In case you need to change some **deep properties**, like show on this image:

![](https://user-images.githubusercontent.com/7440211/59557356-6fa45e00-8fe0-11e9-84d4-f4e8152f2913.png)

You can do that by providing the property name using a dot `.` separator. (Example: "Effects.Skin_Color.Color")
In case your property already has `.` in the name, and you are sure it will lead to a collision, while parsing, you can also use arrow symbol `->` instead.

You can also change the deeper attributes of properties, for example the font of a text layer using "Source Text.font" or the font size by "Source Text.fontSize".

</details>

### Example

```json
{
  "assets": [
    {
      "type": "data",
      "layerName": "MyNicePicture.jpg",
      "property": "Position",
      "value": [500, 100]
    },
    {
      "type": "data",
      "layerName": "my text field",
      "property": "Source Text",
      "expression": "time > 100 ? 'Bye bye' : 'Hello world'"
    },
    {
      "type": "data",
      "layerName": "my text field",
      "property": "Source Text.font",
      "value": "Arial-BoldItalicMT"
    },
    {
      "type": "data",
      "layerName": "background",
      "property": "Effects.Skin_Color.Color",
      "value": [1, 0, 0]
    },
    {
      "type": "data",
      "layerIndex": 15,
      "property": "Scale",
      "expression": "[time * 0.1, time * 0.1]"
    }
  ]
}
```

> Note: any error in expression will prevent the project from rendering. Make sure to read error messages reported by After Effects binary carefully.

## Deployment

1. Create AWS Windows Server Instance (t3 Medium or Large for now)
1. Use AMI with AE Pre Installed on it or Recommend uploading creative cloud to server, and then downloading AE Directly to Server. Windows RDP upload speeds are 1 MBS at good times - 3GB takes a while
1. Assign key pair to system (e.g. `lumina-render.pem`)
1. Click "connect" and download RDP File
1. Use RDP to remote connect to Machine
1. `yarn render build` to build `@lumina/render`
1. Map local folder to remote server instance
1. Copy `./apps/render/fonts` and `./apps/render/package` to remote server - anywhere is fine, including desktop
1. Install fonts
1. Run render binary on server, e.g. `\Administrator\package\bin\render --production` (`--production` is aliased to `-p`)
1. Pray...
