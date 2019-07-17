$(function () {
    $.ajax({
        url: "/user/queryUser",
        data: { page: 1, pageSize: 10 },
        success: function (res) {
            console.log(res);
            var html = template('user-tpl', res);
            $('#tab-box').html(html);
        }
    });

    $('#tab-box').on('click', '.edit-btn', function () {
        let id = $(this).attr('data-id');
        let isDelete = Number($(this).attr('data-isdelete'));
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1,
            },
            success: function (res) {
                if (!res.success) {
                    alert('请求错误！');
                    return
                }
                location.reload();
            }

        })
    })
})