$(function () {

    // 提示信息
    var layer = layui.layer
    var form = layui.form
    // 1渲染文章分类
    initCate()
    //    封装
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 2// 初始化富文本编辑器
    initEditor()

    // 3.裁剪图片
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 4.上传图片
    $('#coverFile').on('click', function () {
        $('#btnChooseImage').click()
    })

    // 4.1 设置图片
    $('#coverFile').on('change', function (e) {
        // 拿到用户文件
        var file = e.tarfet.files[0]
        // 非空校验
        if (file == undefined) {
            return
        }
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //5 定义类型
    var state = '已发布'
    $('#btnsave2').on('click', function () {
        state = '草稿'
    })

    // 6添加文章
    $('#form-serach').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        //添加状态
        fd.append('state', state)
        // 添加图片
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)
            })

    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('恭喜您，发表文章成功！')
                // 跳转页面
                
                location.href = '/atrticle/art_list.html'
                console.log(1);
            }
        })
    }

})