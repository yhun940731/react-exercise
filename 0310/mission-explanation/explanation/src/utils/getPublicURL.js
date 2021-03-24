export function getPublicURL(fileNameWithExt) {
  return `${process.env.PUBLIC_URL}/${fileNameWithExt}`
}

export function getPublicAssets(path) {
  return getPublicURL(`assets/${path}`)
}
