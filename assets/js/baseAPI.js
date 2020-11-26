var baseAPI = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter( function( options) { 
    options.url = baseAPI + options.url
  })