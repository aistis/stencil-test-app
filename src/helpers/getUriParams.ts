export const getUriParam = (key: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has(key)) {
    return urlParams.get(key);
  } else {
    return null;
  }
}
export const getUriParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const serchParams = {}
  if (!urlParams) {
    console.log('no params are observed')
    return null;
  }
  urlParams.forEach((el, key) => {
    switch (key) {
      case 'brand':
        return serchParams[key] = el.toLowerCase()
      case 'price':
        return serchParams[key] = parseFloat(el)
      case 'internalMemoryGB':
        return serchParams[key] = el.split(',').map(i => parseFloat(i))
      case 'dualSIM':
        return serchParams[key] = Boolean(el)
      case 'networkTechnology':
        return serchParams[key] = el.split(',')
      default:
        console.log('wrong params been set')
        return null
    }
  });
  return serchParams
}