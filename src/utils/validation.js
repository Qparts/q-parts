export const required = value => (value ? undefined : 'Required');
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);
export const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

// const minLength = min => value =>
//   value && value.length < min ? `Must be ${min} characters or more` : undefined

const matchDigits = digits => value =>
  value && value.length !== digits ? `Must be ${digits} digits` : undefined

export const match17Digits = matchDigits(17);
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const minValue18 = minValue(18)
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export const confirmPassword = (value, allValues) => {
  return value !== allValues.password ? 'The password does not match'
    : undefined
}

export const mobileCountryCode = (value, allValues) => {
  const mobileRegex = allValues.countryId !== -1 ? allValues.countryId.mobileRegex : null;
  const regex = RegExp(mobileRegex);

  return !regex.test(value) ?
    'Invalid mobile' : undefined
}

export const vin = (value) => {
  return value && !/^[a-zA-Z0-9]*$/.test(value)
    ? 'Invalid VIN'
    : undefined;
}

export const allUpperCase = value => {
  return value && !/^[^a-z]*$/.test(value)
    ? 'Must contain only upper case letters'
    : undefined;
}

export const passwordScore = (score, value) => {
  return value && score >= 2 ? undefined : 'Required';
}