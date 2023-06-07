$(function () {
    localStorage.setItem("loginId", "");
    localStorage.setItem("loginCode", "");
    localStorage.setItem("loginName", "");

    clearInput();
    $('.btn-login').on('click', function () {
        login();
    });
})