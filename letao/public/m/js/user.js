let userInfor = null;
//为了不让为登录用户看到会员页面，发起同步请求 
$.ajax({
    url: '/user/queryUserMessage',
    async: false,//将ajax变成同步，阻塞下面的执行
    success: function (res) {

        if (res.error === 400) {
            location = 'login.html';
        }
        userInfor = res;//将请求到的结果保存，以便异步渲染
    }
})
$(function () {
    $('#logout').on('click', function () {
        $.ajax({
            url: "/user/logout",
            success: function (response) {
                if (!response.success) {
                    mui.toast(response.error);
                    return
                }
                mui.toast('退出登录成功');
                setInterval(() => {
                    location = 'index.html'
                }, 1000)
            }
        });
    })
    var html = template('user-tpl', userInfor);//接受同步结果，异步渲染
    $('#user').html(html);
})
