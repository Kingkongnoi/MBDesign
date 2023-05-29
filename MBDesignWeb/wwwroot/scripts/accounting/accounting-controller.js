$(function () {
    clearSearchForm();
    callGetContractStatusSelect2();
    callGetAccountingList();

    $('#form-search-accounting .btn-clear-search-accounting').on('click', function () {
        clearSearchForm();
        callGetAccountingList();
    });

    $('#form-search-accounting .btn-search-accounting').on('click', function () {
        callGetAccountingList();
    });

    $(document).on('click', '.btn-edit-accounting', function () {
        _order_id = $(this).data('orderid');
        _cust_id = $(this).data('custid');
        clearInputForm();
        renderEditAccounting($(this).data('orderid'));
        $('#modal-editAccounting').modal('show');
    });

    $('.btn-modal-save-accounting').on('click', function () {
        callSaveAccounting();
    });

    $('.btn-send-contract-doc').on('click', function () {
        callSendToSaleAndForeman();
    });
});