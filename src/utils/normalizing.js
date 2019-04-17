export const upper = value => value && value.toUpperCase()
export const lower = value => value && value.toLowerCase()
export const lessThan = otherField =>
    (value, previousValue, allValues) => value < allValues[otherField] ? value : previousValue
export const greaterThan = otherField =>
    (value, previousValue, allValues) => value > allValues[otherField] ? value : previousValue