$(function () {
    // mui框架 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //发起异步请求
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (res) {
            var html = template('category-first', res);
            $('.links').html(html);
            if (res.rows.length) {
                let id = res.rows[0].id;
                $('.links').find('a').eq(0).addClass('active');
                getSecondCategory(id);
            }
        }
    })

    $('.links').on('click', 'a', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).attr('data-id');
        getSecondCategory(id);
    })

    function getSecondCategory(id) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: { id: id },
            success: function (res) {
                var html = template('category-second', res);
                $('.brand-list').html(html);

            }
        })
    }
}) 