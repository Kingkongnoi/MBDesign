$(function () {
    localStorage.setItem("loginId", "");
    localStorage.setItem("loginCode", "");
    localStorage.setItem("loginName", "");

    clearInput();
    $('.btn-login').on('click', function () {
        login();
    });

    $('#input-login-empCode').on('keypress', function (e) {
        if (e.which == 13) {
            $('#input-login-empPass').focus();
        }
    });

    $('#input-login-empPass').on('keypress', function (e) {
        if (e.which == 13) {
            $('.btn-login').trigger('click');
        }
    });
})