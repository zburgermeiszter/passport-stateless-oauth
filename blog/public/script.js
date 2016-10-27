if(window.location.hash) {
  var fragment = window.location.hash.substring(1);
  document.write(fragment);
  setCookie('fragment', fragment, 1);
}