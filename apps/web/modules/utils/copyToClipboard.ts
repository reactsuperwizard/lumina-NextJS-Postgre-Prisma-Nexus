export const copyToClipboard = (
  text: string,
  openAlertFunc: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  navigator.clipboard.writeText(text).then(
    () => openAlertFunc(true),
    (e) => console.error(e),
  )
}
