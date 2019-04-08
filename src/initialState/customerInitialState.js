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
    passwordScore: 0,
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
    tokenExpire: null,
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
    isOrderCompleted: false,
    recentViewedProducts: [],
    wishlist: [],
    direction: 'rtl',
    isShippingCompleted: false,
    isPaymentCompleted: false,
    defaultLang: 'ar',
    quotations: {
        pending: [],
        completed: []
    },
    isModalAddToCart: false,
    isQuotationorderCompleted: true,
    isLoading: false
}
