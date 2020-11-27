var baseAPI = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
  // 1.1拼接对应环境的服务器地址
  options.url = baseAPI + options.url
  // 1.2对需要权限的接口配置头信息  必须以my开头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 3.拦截所有响应，判断身份认证信息
  options.complete = function (res) {
    console.log(res.responseJSON);
    var obj = res.responseJSON
    if(obj.status == 1 && obj.message == '身份认证失败！'){
      // 1.清空本地token
      localStorage.removeItem('token')
      // 2.页面跳转
      location.href = '/login.html'
    }
  }
})