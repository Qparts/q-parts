import $ from 'jquery';

export default function loadStyle(direction) {
  
  if (direction === 'ltr') {
    $('link[href="/static/css/main-ar.css"]').prop('disabled', true);
    $('link[href="/static/css/main.css"]').prop('disabled', false);
  } else {
    $('link[href="/static/css/main.css"]').prop('disabled', true);
    $('link[href="/static/css/main-ar.css"]').prop('disabled', false);
  }
}