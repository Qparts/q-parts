export const getComponentName = (component) => {
 return component;
}

export const getConnectedPlatforms = (platforms) => {
 return platforms.map(name => {
  return {
   platform: name.platform
  }
 })
}

export const smConnectionStatus = (platforms, target) => {
 const status = platforms.find(name => name.platform === target);
 return status ? 'disconnect' : 'connect';
}