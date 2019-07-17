$(function () {
    let page = 1;
    let keyword = getParamsUrl(location.href, 'keyword');
    let html = '';
    let priceSort = 1;//默认升序排序
    var that = null;
    function getData() {
        if (!that) {
            that = this;
        }
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: {
                page: page++,
                pageSize: 3,
                proName: keyword,
                price: priceSort//获得排序的 结果
            },
            success: function (res) {
                console.log(res);
                if (res.data.length > 0) {
                    //将第一页和第二页拼接起来
                    html += template('search-tpl', res);
                    $('#res-box').html(html);
                    //告诉加载完毕
                    that.endPullupToRefresh(false);
                } else {
                    //告诉加载完毕，并且没有数据了
                    that.endPullupToRefresh(true);
                }
            }
        });
    }

    //get价格添加轻触事件
    $('#sort').on('tap', function () {
        //排序前重置页面，在根据排序后的数据渲染页面
        page = 1;
        html = '';
        priceSort = priceSort == 1 ? 2 : 1;//priceSort为1时升序，为2时降序
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    })
    //mui加载组件
    mui.init({
        pullRefresh: {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据，自动调用一次渲染函数
            }
        }
    });

})



