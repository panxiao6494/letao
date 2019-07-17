$(function () {
    let address = null;
    $.ajax({
        type: "get",
        url: '/address/queryAddress',
        success: function (responce) {
            address = responce;
            console.log(responce);
            var html = template('adressTpl', { result: responce });
            $('#address-box').html(html);
        }
    });
    $('#address-box').on('tap', '.deleteAdress', function () {
        let id = $(this).attr('data-id');
        var li = this.parentNode.parentNode;
        mui.confirm('确定删除吗', function (message) {
            //index=1 确定 index=0 取消
            if (message.index == 0) {
                mui.swipeoutClose(li);
                return;
            }
            $.ajax({
                type: "post",
                url: "/address/deleteAddress",
                data: {
                    id
                },
                success: function (response) {
                    if (response.success == true) {
                        location.reload()//重新加载页面
                    }
                }
            })
        })
    })

    $('#address-box').on('tap', '.edit', function () {
        let id = $(this).attr('data-id');
        let data = null;
        for (let i = 0; i < address.length; i++) {
            data = address[i];
            break
        }
        localStorage.setItem('editAddress', JSON.stringify(data));
        location = 'addAddress.html?isEdit=1';
    })
})