export const isMouseEvent = (
  e: React.TouchEvent | React.MouseEvent,
): e is React.MouseEvent => {
  return e && 'screenX' in e
}
