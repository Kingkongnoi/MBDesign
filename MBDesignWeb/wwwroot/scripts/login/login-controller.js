$(function () {
    localStorage.setItem("loginId", "");
    localStorage.setItem("loginCode", "");
    localStorage.setItem("loginName", "");

    $('.btn-login').on('click', function () {
        login();
    });
})