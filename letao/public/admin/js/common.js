$.ajax({
	url: "/employee/checkRootLogin",
	async: false,//异步变同步
	success: function (res) {
		if (!res.success) {
			location = 'login.html';//如果未登录，则不允许调到用户页面
			return
		}
	}
});

$(function () {
	$('.login_out_bot').on('click', function () {
		if (!confirm('确定要退出？')) {
			return;
		}
		$.ajax({
			url: "/employee/employeeLogout",
			success: function (res) {
				if (!res.success) {
					alert(res.message);
					return
				}
				location = 'login.html'
			}
		});
	})

	var navLi = $('.navs li')

	navLi.on('click', function () {

		$(this).find('ul').slideToggle();

	});

});