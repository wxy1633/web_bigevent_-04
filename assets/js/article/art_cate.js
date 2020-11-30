$(function () {

    // 提示信息
    var layer = layui.layer
    // 表单赋值
    var form = layui.form
    //1 渲染文章类别
    initCate()
    // 封装文章类别
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                // 模板引擎
                var htmlStr = template('tpl-cate', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    // 2.添加分类 弹出框
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#tpl-add').html()
        });

    })

    // 2.1新增分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: {
                name: $('#form-add [name=name]').val(),
                alias: $('#form-add [name=alias]').val()
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('恭喜您，新增文章分类成功！')
                // 从新渲染文章分类
                initCate()
                layer.close(indexAdd)
            }
        })
    })

    // 3编辑功能
    // 3.1 弹出框
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        var Id = $(this).attr('data-id')
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#tpl-edit').html()
        });
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('恭喜')
                form.val('form-edit', res.data)
            }
        })
    })
    // 3.2 修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('恭喜您，修改文章类别成功！')
                initCate()
                layer.close(indexEdit)
            }
        })
    })

    // 4.删除
    $('tbody').on('click','.btn-delete',function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success:function (res) {
                    if(res.status !== 0)  return layer.msg(res.message)
                    layer.msg('恭喜您，删除文章信息成功！')
                    initCate()
                }
            })
            layer.close(index);
          })
    })
})