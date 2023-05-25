﻿$(function () {
    clearSearchForm();
    callGetChecklistStatusSelect2();
    callGetDesign3DNameSelect2();
    callGet3DQueueList();

    $('#form-search-3d-queue .btn-clear-search-3d').on('click', function () {
        clearSearchForm();
        callGet3DQueueList();
    });

    $('#form-search-3d-queue .btn-search-3d').on('click', function () {
        callGet3DQueueList();
    });

    $(document).on('click', '.btn-edit-3d', function () {
        _order_id = $(this).data('orderid');
        clearInputForm();
        renderEditDesign3D($(this).data('orderid'));
        $('#modal-editDesign3D').modal('show');
    });
});