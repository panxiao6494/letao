$(function () {
    let id = getParamsUrl(location.href, 'id');
    let storageNum = '';
    let size = null;
    $.ajax({
        url: '/product/queryProductDetail',
        data: { id: id },
        success: function (res) {
            console.log(res);
            storageNum = res.num;
            var html = template("product-tpl", res);
            $('#product-box').html(html);

            //重新初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    $('#product-box').on('tap', '.size span', function () {
        $(this).addClass('active').siblings().removeClass('active');
        size = Number($(this).html());
    })
    $('#reduce').on('tap', function () {
        let currentNum = Number($('#inp').val());
        currentNum = currentNum <= 1 ? 1 : currentNum - 1;
        $('#inp').val(currentNum)
    })

    $('#increase').on('tap', function () {
        let currentNum = Number($('#inp').val());
        currentNum = currentNum >= storageNum ? storageNum : currentNum + 1;
        $('#inp').val(currentNum)
    })

    $('#addCart').on('tap', function () {
        if (!size) {
            mui.toast('请选择尺码');
            return
        }
        let currentNum = Number($('#inp').val());
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num: currentNum,
                size
            },
            success: function (res) {
                if (!res.success) {
                    mui.toast('出错了！');
                    return
                }
                mui.confirm('加入购物车成功', '温馨提示', function (message) {
                    if (message.index == 0) {
                        return
                    }
                    location = 'cart.html';
                })
            }
        })
    })
})