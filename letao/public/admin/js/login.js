$.ajax({
    url: "/employee/checkRootLogin",
    async: false,//异步变同步
    success: function (res) {
        if (res.success) {
            location = 'user.html';//如果已经登录，则不允许在跳回登录页面
            return
        }
    }
});
$(function () {
    $('#login').on('click', function () {
        let username = $.trim($('#username').val());
        let password = $.trim($('#password').val());
        if (username === '') {
            alert('请输入用户名');
            return
        }
        if (password === '') {
            alert('请输入密码');
            return
        }

        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: { username: username, password: password },
            success: function (res) {
                if (!res.success) {
                    alert(res.massage);
                    return
                }
                location = 'user.html'
            }
        });
    })
})