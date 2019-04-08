import $ from 'jquery';

export default function loadStyle(direction) {
  
  if (direction === 'ltr') {
    $("link[href*='main-ar']").prop('disabled', true);
    $("link[href*='main-en']").prop('disabled', false);
  } else {
    $("link[href*='main-en']").prop('disabled', true);
    $("link[href*='main-ar']").prop('disabled', false);
  }
}