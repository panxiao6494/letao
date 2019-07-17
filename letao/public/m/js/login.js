$(function () {
    $('#login-btn').on('click', function () {
        let username = $('input[name="username"]').val();
        let password = $('input[name="password"]').val();

        $.ajax({
            type: "post",
            url: "/user/login",
            data: { username: username, password: password },
            beforeSend: function () {
                $('#login-btn').html('正在登录...')
            },
            success: function (response) {
                if (!response.success) {
                    mui.toast(response.error);
                    return;
                }
                mui.toast('登录成功');
                setInterval(() => {
                    location.href = 'user.html';

                }, 2000)
            }
        });
    })
})