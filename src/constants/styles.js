//COLOR
const basicGray = '#37363d';
const basicBlack = '#222222';
const lightGray = '#f7f7f7';
const brandColor = '#ed4036';
const charcoalGrey = 'rgba(55, 54, 60, 0.6)';
const charcoalGreyTwo = 'rgba(55, 54, 61, 0.8)';
const darkCharcoalGrey = '#37363c';
const lightCharcoalGrey = 'rgba(55, 54, 60, 0.7)';
const gainsboroColor = '#DCDCDC';
const basicWhite = 'rgba(255, 255, 255, 0.8)';
const basicDarkWhite = 'rgba(255, 255, 255, 0.5)';
const veryLightPink = 'rgba(235, 235, 235, 0.3)';

const selectStyle = {
  menu: (styles) => {
    return {
      ...styles,
      boxShadow: 'none',
    }
  },
  menuList: (styles) => {
    return {
      ...styles,
      borderRadius: '0px 20px 20px 20px',
      fontFamily: 'Roboto'
    }
  },
  option: (styles, { data, isSelected, isFocused, options }) => {
    const lastIndex = options.length - 1;

    return {
      ...styles,
      background: isSelected ? lightGray : isFocused ? lightGray : 'none',
      ':active': {
        backgroundColor: lightGray,
      },
      borderBottom: options[lastIndex].label === data.label ? 'none' : `1px solid ${lightGray}`
    }
  }
};

export const styles = {
  cursor: {
    cursor: 'pointer'
  },
  rightSpace: {
    margin: '0em 0em 0em 1em'
  },
  grey: {
    backgroundColor: '#f8f9fa'
  },
  show: {
    display: 'inline'
  },
  hide: {
    display: 'none'
  },
  white: {
    backgroundColor: 'white'
  },
  listingPage: {
    searchResult: {
      borderStyle: 'solid',
      borderWidth: 'thin'
    }
  },
  select: {
    ...selectStyle
  },
  selectForm: {
    ...selectStyle,
    menuList: (styles) => {
      return {
        ...styles,
        borderRadius: '0px 0px 20px 20px',
        fontFamily: 'Roboto'
      }
    },
  }
}

export const colors = {
  basicGray,
  basicBlack,
  lightGray,
  brandColor,
  charcoalGrey,
  charcoalGreyTwo,
  darkCharcoalGrey,
  lightCharcoalGrey,
  gainsboroColor,
  basicWhite,
  basicDarkWhite,
  veryLightPink,
}