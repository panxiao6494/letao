$(function () {
    function convertQueryToObject(queryStr) {
        let arr = queryStr.split('&')
        let obj = {}
        for (let i = 0; i < arr.length; i++) {
            let target = arr[i].split('=')
            obj[target[0]] = target[1]
        }
        return obj
    }

    $('#register-btn').on('tap', function () {
        let queryStr = $('#register-form').serialize()
        let formData = convertQueryToObject(queryStr)
        let { againPass, mobile, password, username, vCode } = formData;//获得用户表单数据
        if (!username) {
            mui.toast('请输入用户名')
            return
        }
        if (mobile.length != 11) {
            mui.toast('手机号不合法')
            return
        }
        if (password < 6) {
            mui.toast('密码不正确')
            return
        }
        if (password != againPass) {
            mui.toast('两次密码输入不一致')
            return
        }

        $.ajax({
            url: '/user/register',
            type: 'post',
            data: formData,
            success: function (res) {
                setInterval(() => {
                    location.href = 'login.html';
                }, 2000)
            }
        })

    })

    //获得验证码
    $('#getCode').on('tap', function () {
        $.ajax({
            url: "/user/vCode",
            success: function (response) {
                console.log(response.vCode);
            }
        });
    })
})