const country = 'country';
const city = 'locality';

export const parseGoogleResponse = (components) => {
 const { address_components, formatted_address, geometry } = components;
 let result = { country: '', city: '' };
 const findCountry = address_components.find(countryId => countryId.types[0] === country);
 const findCity = address_components.find(cityId => cityId.types[0] === city);

 return { 
  ...result, 
  country: findCountry.long_name, 
  city: findCity? findCity.long_name : undefined, 
  line1: formatted_address,
  latitude: geometry.location.lat(),
  longitude: geometry.location.lng()
 }

}