$(document).ready(function() {
  var clientCookie = getCookie('staticman');
  var serverCookie = getCookie('_staticman');
  //var clientCookie = localStorage.getItem('staticman');
  $('#clientCookie').text(clientCookie);
  $('#serverCookie').text(serverCookie);
});