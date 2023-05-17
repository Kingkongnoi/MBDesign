$(function () {
    clearSearchForemanForm();
    callGetForemanStatusSelect2();
    callGetForemanQueueList();

    $('#form-search-foreman-queue .btn-clear-search-foreman').on('click', function () {
        clearSearchForemanForm();
        callGetForemanQueueList();
    });

    $('#form-search-foreman-queue .btn-search-foreman').on('click', function () {
        callGetForemanQueueList();
    });

    $(document).on('click', '.btn-edit-foreman', function () {
        $('#modal-editForeman').modal('show');
    });
});