$(function () {

    $.ajax({
        url: '/product/queryProductDetailList',
        data: {
            page: 1,
            pageSize: 10
        },
        success: function (res) {
            console.log(res);

            var html = template('productTpl', res);
            $('table').html(html);
        }
    })

    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            $('#brand').html(template('brandTpl', res));
            console.log(res);
        }
    });

    let imgArr = [];
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            imgArr.push(data.result)
        }
    })

    $('#addProduct').on('click', function () {
        let proName = $('[name="proName"]').val().trim();
        let brandId = $('[name="brandId"]').val().trim();
        let proDesc = $('[name="proDesc"]').val().trim();
        let num = $('[name="num"]').val().trim();
        let size = $('[name="size"]').val().trim();
        let price = $('[name="price"]').val().trim();
        let oldPrice = $('[name="oldPrice"]').val().trim();

        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: {
                proName,
                brandId,
                proDesc,
                num,
                size,
                price,
                oldPrice,
                statu: 1,
                pic: imgArr
            },
            success: function (res) {
                if (!res.success) {
                    alert('添加失败');
                    return
                }
                location.reload();
            }
        })

    })
})