import React from 'react';
import NextArrow from '../components/UI/NextArrow/NextArrow';
import PrevArrow from '../components/UI/PrevArrow/PrevArrow';
import _ from 'lodash'
import { ltr } from '.';

//COLOR
const basicGray = '#37363d';
const basicBlack = '#222222';
const lightGray = '#f7f7f7';
const darkGray = '#efeeee';
const veryLightGrey = '#e2e2e2';
const brandColor = '#ed4036';
const charcoalGrey = 'rgba(55, 54, 60, 0.6)';
const charcoalGreyTwo = 'rgba(55, 54, 61, 0.8)';
const charcoalGreyTwo40 = 'rgba(55, 54, 61, 0.4)';
const charcoalGrey80 = 'rgba(55, 54, 60, 0.8)';
const darkCharcoalGrey = '#37363c';
const lightCharcoalGrey = 'rgba(55, 54, 60, 0.7)';
const lighterGrey = 'rgba(55, 54, 61, 0.5)';
const gainsboroColor = '#DCDCDC';
const basicWhite = 'rgba(255, 255, 255, 0.8)';
const basicDarkWhite = 'rgba(255, 255, 255, 0.5)';
const veryLightPink = 'rgba(235, 235, 235, 0.3)';
const facebookColor = '#475993';
const twitterColor = '#03a9f4';
const dark50 = 'rgba(39, 39, 52, 0.5)';
const dark70 = 'rgba(39, 39, 52, 0.7)';
const dark80 = 'rgba(39, 39, 52, 0.8)';

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
    }
  },

  groupHeading: (styles) => {
    return {
      ...styles,

    }
  },
  option: (styles, { data, isSelected, isFocused, options }) => {
    const lastIndex = options.length - 1;

    return {
      ...styles,
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
  return touched && error;
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
    display: 'inline-block'
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
  },
  arrow_right: {
    color: "black"
  },
  spinner: `
      border-color: ${brandColor} !important;
			border-bottom-color: transparent !important;
        `,
  loading: {
    textAlign: 'center'
  }
}

export const sliderSetting = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  variableWidth: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
}
export const starsRating = {
  edit: false,
  color1: '#cfcfcf',
  color2: '#fabb12'
}

export const swiperParams = (direction) => {
  return {
    containerClass: `swiper-container products-list`,
    slidesPerView: 5,
    spaceBetween: 30,
    grabCursor: true,
    lazy: true,
    rebuildOnUpdate: true,
    navigation: {
      nextEl: direction === ltr ? '.swiper-button-next' : '.swiper-button-prev',
      prevEl: direction === ltr ? '.swiper-button-prev' : '.swiper-button-next'
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 15
      },
    }
  }
}

export const colors = {
  basicGray,
  basicBlack,
  lightGray,
  darkGray,
  veryLightGrey,
  brandColor,
  charcoalGrey,
  charcoalGreyTwo,
  charcoalGreyTwo40,
  charcoalGrey80,
  darkCharcoalGrey,
  lightCharcoalGrey,
  lighterGrey,
  gainsboroColor,
  basicWhite,
  basicDarkWhite,
  veryLightPink,
  facebookColor,
  twitterColor,
  dark50,
  dark70,
  dark80,
  error,
  invalid,
  success
}

export const helpers = {
  isSucceed, isRequired, isInvalid
}
