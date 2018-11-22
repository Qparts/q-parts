import React from 'react';
import NextArrow from '../components/UI/NextArrow/NextArrow';
import PrevArrow from '../components/UI/PrevArrow/PrevArrow';
import _ from 'lodash'

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
const error = '#fbc0bd';
const invalid = '#e8d59a';
const success = 'rgba(48, 213, 118, 0.3)';

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

const isSucceed = (error, touched) => {
  return touched && _.isUndefined(error)
}

const isRequired = (error, touched) => {
  return touched && error;
}

const isInvalid = (error, touched) => {
  return touched && error.includes('Invalid');
}

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

export const sliderSetting = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
}
export const starsRating = {
  edit: false,
  color1: '#cfcfcf',
  color2: '#fabb12'
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
  error,
  invalid,
  success
}

export const helpers = {
  isSucceed, isRequired, isInvalid
}