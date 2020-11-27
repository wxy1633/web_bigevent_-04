$(function () {
    // 1表单校验
    var form = layui.form
    // 提示
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return '用户昵称的长度不能超过6个字符'
        }
    })

    //2渲染
    initUserInfo()
    // 获取用户信息并赋值
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.status)
                //  layer.msg('获取信息成功！')
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.表单重置  需要的是修改前的数据  不是初始数据
    $('#btnReset').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault()
        initUserInfo()
    })

    // 修改用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止浏览器默认行为
        e.preventDefault()
        // ajax发起请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function (res) {
                console.log(res);
                if(res.status !== 0) return layer.msg(res.status)
                layer.msg('更新信息成功！')
                // 重新渲染  个人中心区域
                window.parent.getUserInof()
            }
        })
    })
})