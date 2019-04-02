import { getTranslatedObject } from './string';

export const getComponentName = (component) => {
  return component;
}

export const getConnectedPlatforms = (platforms = []) => {
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

export const getFormattedVehicles = (vehicles = [], defaultLang) => {
  return vehicles.map(veh => {
    return {
      ...veh,
      value: veh.id,
      label: `${getTranslatedObject(veh.vehicle.make, defaultLang, 'name', 'nameAr')} ${getTranslatedObject(veh.vehicle.model, defaultLang, 'name', 'nameAr')} ${veh.vehicle.year}`
    }
  });
}

export const getFormattedSelect = (array, defaultLang) => {
  return array.map(obj => {
    return {
      ...obj,
      value: obj.id,
      label: getTranslatedObject(obj, defaultLang, 'name', 'nameAr')
    }
  });
}
