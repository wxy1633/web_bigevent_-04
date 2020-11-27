$(function () {
    // 1.表单校验
    var form = layui.form
    // 自定义校验
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            // value  是 调用这个方法的元素的值
            if (value === $('[name=oldPwd]').val()) return '新旧密码不能相同'
        },
        reqPwd:function (value) {
            // value是确认密码框的值，在那些就是那的值
            if(value !== $('[name=newPwd]').val())  return '两次输入的密码不一致'
        }
    })

    // 修改密码
    $('.layui-form').on('submit',function (e) {
        // 阻止浏览器默认行为
        e.preventDefault()
        // ajax发送
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:{
                oldPwd:$('[name=oldPwd]').val(),
                newPwd:$('[name=newPwd]').val()
            },
            success:function (res) {
                if(res.status !== 0) return layer.msg(res.status)
                layer.msg('修改密码成功！')
                $('.layui-form')[0].reset()
            }
        })
    })
})