// TODO: remove unused objects (vin, part selected)
export const initialState = {
  id: null,
  name: '',
  nameAr: '',

  partsSelected: [{ itemName: '', condition: '', quantity: 1 }],
  itemName: "",
  part: {
    id: -1,
    partNumber: "",
    makerId: -1,
    description: "",
    price: null,
    priceId: -1,
    cartType: false
  },
  purchasedItems: [],
  currentSearchVehicle: {},
  quantity: 1
}