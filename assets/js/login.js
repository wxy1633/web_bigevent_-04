$(function () {
    // 1.点击事件
    $('#link_reg').on('click',function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').on('click',function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })


    // 2.表单验证
    var form = layui.form
    // 3表单提示
    var layer = layui.layer
    form.verify({
        // 表单规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd:function (value) {
            var pwd = $('.reg_box [name=password]').val()
            if(pwd !== value){
                console.log(pwd);
                return '两次输入的密码不一致'
            }
            
        }
    })

    // 4注册功能
    $("#form_reg").on('submit',function (e) {
        // 阻止表单默认事件
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:$("#form_reg").serialize(),
            success:function (res) {
                if(res.status !== 0 )  return layer.msg(res.status)
                layer.msg('登录成功')
                $("#form_reg")[0].reset()
                $('#link_login').click()
            }

        })
    })

    // 5登录功能
    $('#form_login').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$("#form_login").serialize(),
            success:function(res) {
                console.log(res);
                if(res.status !== 0)  return layer.msg(res.status)
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })

  
})