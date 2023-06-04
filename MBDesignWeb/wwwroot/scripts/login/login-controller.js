$(function () {
    //renderToMaster();
    localStorage.setItem("loginId", "");
    $('.btn-login').on('click', function () {
        login();
    });
})