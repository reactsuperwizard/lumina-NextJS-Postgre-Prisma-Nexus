# @lumina/player
This apps serves two purposes:
1. It houses the `<Player />` component to be used across `@lumina` apps
2. It hosts the embeddable iframe player used on anyone elses website, e.g. `https://player.lumina.co/someVimeoId`

## Getting Started
Run the development server:

```bash
yarn dev
```

## Usage

As component:
```typescript
import { Player } from '@lumina/player'
...
<Player
  poweredBy={{
  src: '/Negative@3x.png',
    href: 'https://www.lumina.co',
  }}
  vimeoId={1234}
/>
```

As embedded iframe:
```typescript
<iframe title="lumina-player" src="https://player.lumina.co/1234" allowfullscreen></iframe>
```