$(function () {
    // 1.获取用户信息并渲染
    getUserInof()
    // 2.引入提示信息
    var layer = layui.layer

    // 3.退出按钮
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //3.1清空本地存储的token
            localStorage.removeItem('token')
            // 3.2页面跳转
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })
})

// 4封装在外面的原因，后面更改信息会用到
function getUserInof() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) return layer.msg(res.status)
            //    渲染图片
            renderAvatar(res.data)
        }
    })
}

// 5渲染
function renderAvatar(user) {
    //  5.1  渲染文字
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //  5.2 渲染图片
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(name[0].toUpperCase())
    }
}