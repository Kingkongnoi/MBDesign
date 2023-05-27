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
        _order_id = $(this).data('orderid');
        _foreman_id = $(this).data('foremanid');
        clearEditForm();
        callGetEditForeman();
        $('#modal-editForeman').modal('show');
    });
});