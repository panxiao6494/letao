$(function () {
    $('.my-footer').on('tap', 'a', function () {
        mui.openWindow({
            url: $(this).attr('href')
        })
    })


})

// 封装从url获取关键字的函数
function getParamsUrl(url, name) {
    let arr = url.split('?')[1].split('&');
    for (let i = 0; i < arr.length; i++) {
        let target = arr[i].split('=');


        if (target[0] === name) {
            return target[1]
        }
    }
    return null

}