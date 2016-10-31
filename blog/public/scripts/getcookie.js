$(document).ready(function() {
  //var cookieContent = getCookie('staticman');
  var cookieContent = localStorage.getItem('staticman');
  $('#clientCookie').text(cookieContent);
});