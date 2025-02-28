import { getTranslatedObject } from './string';
import _ from 'lodash';

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

export const getFormattedVehicles = (vehicles = [], defaultLang, translate) => {
  return vehicles.map(veh => {
    return {
      ...veh,
      value: veh.id,
      label: `${getTranslatedObject(veh.vehicle.make, defaultLang, 'name', 'nameAr')} ${getTranslatedObject(veh.vehicle.model, defaultLang, 'name', 'nameAr')} ${veh.vehicle.year}, ${translate("general.vin")}(${veh.vin})`
    }
  });
}

export const getVehicleInfo = (vehicles = [], customerVehicleId, defaultLang) => {
  let customerVehicle = vehicles.find(vehicle => vehicle.id === customerVehicleId);

  return !_.isUndefined(customerVehicle) ? `${getTranslatedObject(customerVehicle.vehicle.make, defaultLang, 'name', 'nameAr')} ${getTranslatedObject(customerVehicle.vehicle.model, defaultLang, 'name', 'nameAr')} ${customerVehicle.vehicle.year}` : null;
}

export const getVehicleVin = (vehicles = [], customerVehicleId) => {
  let customerVehicle = vehicles.find(vehicle => vehicle.id === customerVehicleId);

  return !_.isUndefined(customerVehicle) ? customerVehicle.vin : null;
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

export const getRegion = (regions, id) => {
  const selectedRegion = regions.find(region => {
    return region.cities.find(city => city.id === id);
  });

  return selectedRegion;
}

export const getCity = (cities, id) => {
  return cities.find(city => city.id === id);
}