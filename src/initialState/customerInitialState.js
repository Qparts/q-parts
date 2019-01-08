export const initialState = {
 detail: {
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  countryId: null,
  addresses: [],
  socialMediaId: null,
  platform: null,
  vehicles: []
 },
 address: {
  addressId: '',
  customerId: '',
  line1: '',
  line2: '',
  cityId: '',
  zipCode: '',
  title: '',
  latitude: null,
  longitude: null,
 },
 token: null,
 vehiclesFormat: [],
 selectedVehicle: {},
 selectedCountry: {},
 defaultAddress: {
  addressId: 1000,
  customerId: 12532,
  line1: "First Line Address",
  line2: "Secondd Line Address",
  cityId: 1,
  zipCode: "123VB123",
  title: "Home Address",
  latitude: 123323.4,
  longitude: 231233.5
 },
 checkout: {
  deliveryAddress: {},
  paymentMethod: {}
 },
 isOrderCompleted: false,
 recentViewedProducts: [],
 wishlist: [],
 direction: 'ltr',
 registered: null
}