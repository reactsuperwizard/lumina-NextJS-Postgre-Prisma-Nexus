// TO DO ALL Routes
const resourceNames = ['User', 'Order']

export const isProperRoute = (resource: string) => {
  const resourceName = resource.charAt(0).toUpperCase() + resource.slice(1, -1)
  return resourceNames.find((element) => element === resourceName)
}
