import React from 'react'

export const gradient: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}

export const color: React.CSSProperties = {
  width: 'calc(100% - 0.8rem)',
  height: '200px',
  margin: '0.4rem',
  position: 'relative',
  background: `hsl(var(--rpc-hue),100%, 50%)`,
  borderRadius: 'var(--rpc-border-radius)',
  border: '1px solid var(--rpc-border-color)',
  overflow: 'hidden',
}

export const pointer: React.CSSProperties = {
  position: 'absolute',
  cursor: 'hand',
  top: 'var(--rpc-saturation-pointer-top)',
  left: 'var(--rpc-saturation-pointer-left)',
}

export const circle: React.CSSProperties = {
  width: '8px',
  borderRadius: '8px',
  height: '8px',
  boxShadow: '0 0 1px rgba(0, 0, 0, .9)',
  border: '2px solid #fff',
}
