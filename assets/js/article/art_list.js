$(function () {

    // 3.优化时间
    template.defaults.imports.dataFormat = function (dtStr) {
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = perZero(dt.getMonth() + 1)
        var d = perZero(dt.getDate())
        var hh = perZero(dt.getHours())
        var mm = perZero(dt.getMinutes())
        var ss = perZero(dt.getSeconds())
        return y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss
    }
    // 补0函数
    function perZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 1定义数值
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态，可选值有：已发布、草稿
    }
    // 提示信息
    var layer = layui.layer
    // 表单赋值
    var form = layui.form

    //   2 渲染表格
    initTable()
    //    封装
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    initCate()
    // 渲染文章类别
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr = template('tpl-cate', res)
                $('#form-serach [name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    //3 筛选文章   按钮写错了
    $('#form-serach').on('submit', function (e) {
        console.log(1);
        e.preventDefault()
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    // 4分页
    var laypage = layui.laypage;

    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 5删除功能
    $('tbody').on('click','.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            $.ajax({
                method: "GET",
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
                    initTable()
                }
            })
            layer.close(index);
        })

    })
})