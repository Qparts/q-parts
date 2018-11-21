export default function loadStyle (direction) {
  if (direction === 'ltr') {    
    return require('../../scss/app.scss');
  } else if(direction === 'rtl') {
      return require('../../scss/app-rtl.scss');
  }
}