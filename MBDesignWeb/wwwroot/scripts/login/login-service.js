let _modal_primary_color_code = "#F09723";
let loader = '';

function login() {
    $('.btn-login').addLoading();

    if (!validateInputForm()) {
        $('.btn-login').removeLoading();
        return;
    }

    DoLogin();

}

let validateInputForm = function () {
    if ($('#form-login #input-login-empCode').val() == "") {
        Swal.fire({
            text: "กรุณากรอกรหัสพนักงาน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-login #input-login-empCode').focus();
        });
        return false;
    }
    else if ($('#form-login #input-login-empPass').val() == "") {
        Swal.fire({
            text: "กรุณากรอกรหัสผ่าน",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-login #input-login-empPass').focus();
        });
        return false;
    }
    else {
        return true;
    }
};

function DoLogin() {
    let url = `${app_settings.api_url}/api/Login/DoLogin`;

    let user = $('#form-login #input-login-empCode').val();
    let password = $('#form-login #input-login-empPass').val();

    var obj = {
        user: user,
        password: password
    };

    var data = JSON.stringify(obj);

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: (res) => {
            if (res.msg.isResult == true) {
                callSuccessAlert();
                clearInput();
                localStorage.setItem("loginId", res.result.id);
                localStorage.setItem("loginCode", res.result.empCode);
                localStorage.setItem("loginName", res.result.fullName);
                $('.btn-login').removeLoading();
                window.location.href = `${app_settings.web_url}/Home/Index`;    
            }
            else {
                Swal.fire({
                    text: res.msg.strResult,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: _modal_primary_color_code,
                    confirmButtonText: 'ตกลง'
                }).then((result) => {
                    $('.btn-login').removeLoading();
                });
            }
        },
        error: () => {
        },
        contentType: 'application/json',
        dataType: "json",
    });
}

function clearInput() {
    $('#form-login #input-login-empCode').val("");
    $('#form-login #input-login-empPass').val("")
}