$(function () {
    let totalPage = '';
    let page = 1;
    let brandLogo = '';
    getData();

    $('#prevBtn').on('click', function () {
        page--;
        if (page < 1) {
            page = 1;
            alert('已经是第一页了！');
            return
        }
        getData();
    })
    $('#nextBtn').on('click', function () {
        page++;
        if (page > totalPage) {
            page = totalPage;
            alert('已经是最后一页了！');
            return
        }
        getData();
    })

    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            //console.log(res);
            var html = template('first-tpl', res);
            $('#first-option').html(html);

        }
    })

    //使用jQuery封装上传文件的方法
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            brandLogo = data.result.picAddr;
            $('.img-thumbnail').attr('src', brandLogo)
        }
    })

    $('#save').on('click', function () {
        let brandName = $('#brandName').val();
        let categoryId = $('#first-option').val();//option保存的value
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: {
                brandName,
                categoryId,
                brandLogo,
                hot: 0,
            },
            success: function (res) {
                if (!res.success) {
                    alert('请求出错！');
                    return
                }
                location.reload();
            }
        })
    })

    function getData() {
        let pageSize = 8;
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                totalPage = Math.ceil(res.total / pageSize);
                var html = template('second-tpl', res);
                $('table').html(html)

            }
        })
    }


})
