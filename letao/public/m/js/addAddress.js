$(function () {
    let isEdit = Number(getParamsUrl(location.href, 'isEdit'));
    let url = '';
    var addressObj = {};

    if (isEdit) {
        let addAddressStr = localStorage.getItem('editAddress');
        if (!addAddressStr) {
            return
        }
        addressObj = JSON.parse(addAddressStr);
        let html = template('edit-tpl', addressObj);
        $('#editForm').html(html)

    } else {
        let html = template('edit-tpl', {});
        $('#editForm').html(html)
    }
    $('#submit').on('tap', function () {
        let recipients = $('#username').val();
        let postcode = $('#postcode').val();
        let address = $('#showCityPicker').val();
        let addressDetail = $('#detail-address').val();
        if (recipients == '' || postcode == '' || address == '' || addressDetail == '') {
            alert('请填写完整的数据');
            return;
        }
        let data = {
            recipients,
            postcode,
            address,
            addressDetail
        }
        if (isEdit) {
            data.id = addressObj.id;
            console.log(addressObj.id);
            url = '/address/updateAddress';
        } else {
            url = "/address/addAddress";
        }
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            success: function (response) {
                if (!response.success) {
                    mui.toast('数据提交失败！')
                    return
                }
                if (isEdit) {
                    mui.toast('修改成功')
                } else {
                    mui.toast('添加成功')
                }
                location = 'address.html';
            }
        });
    })

    //mui框架实现城市3级联动
    var picker = new mui.PopPicker({ layer: 3 });//三级联动
    picker.setData(cityData);
    $('#showCityPicker').on('tap', function () {
        picker.show(function (selectItem) {
            let address = '';
            for (let i = 0; i < selectItem.length; i++) {
                address += selectItem[i].text;
            }
            $('#showCityPicker').val(address);
        })
    })
})

