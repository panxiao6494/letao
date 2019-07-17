$(function () {
    let keyArr = [];
    $('#search-text').on('focus', function () {
        $('#historySearch').show();
    })
    $('#search-text').on('blur', function () {
        $('#historySearch').hide();
    })
    $('.search-btn').on('click', function () {
        let keyword = $('#search-text').val();
        if (!keyword) {
            alert('请输入关键字');
            return
        };
        $('#search-text').val('');
        location.href = `search-result.html?keyword=${keyword}`;
        //将用户输入的数据以数组的形式存储到localStorage
        keyArr.push(keyword);
        localStorage.setItem('keyArr', JSON.stringify(keyArr));//将数组转换成字符串存储
    })
    //清空历史
    $('#clear-his').on('click', function () {
        //清空数组
        keyArr = [];
        //清空页面
        $('#historySearch').html('');
        //清空本地存储
        localStorage.removeItem('keyArr');
    })
    //获取用户存储的数据
    if (localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem('keyArr'));//将本地存储的数组转换成数组提取出来
        console.log(keyArr);
        let html = template('history-tpl', { result: keyArr });
        $('#historySearch').html(html);
    }
    $('#historySearch').on('tap', 'li', function () {
        $('#search-text').val($(this).html());
    });
})
