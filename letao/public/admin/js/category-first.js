$(function () {
    let totalPage = '';
    let page = 1;
    getData();

    $('#next').on('click', function () {
        page++;
        if (page > totalPage) {
            page = totalPage;
            alert('已经是最后一页了！');
            return
        }
        getData();
    })
    $('#prev').on('click', function () {
        page--;
        if (page < 1) {
            page = 1;
            alert('已经是第一页了！');
            return
        }
        getData();
    })

    $('#save').on('click', function () {
        let categoryName = $.trim($('#category-f').val());
        if (categoryName == '') {
            alert('请输入分类名称');
            return
        }
        $.ajax({
            type: 'post',
            url: "/category/addTopCategory",
            data: {
                categoryName,
            },
            success: function (res) {
                if (!res.success) {
                    alert('添加失败！');
                    return
                }
                location.reload();//页面重新加载
            }
        })
    })

    function getData() {
        let pageSize = 5;
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                totalPage = Math.ceil(res.total / pageSize);
                let html = template('first-tpl', res);
                $('#first-box').html(html);
            }
        })
    }
})

