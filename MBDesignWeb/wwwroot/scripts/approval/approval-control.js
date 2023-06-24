$(function () {
    callGetApproveStatusSelect2();
    callGetActiveBankAccount();
    GetWaitApproveList();
    GetApproveHistoryList();

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-wait-approve") {
            GetWaitApproveList();
        }
        else if (target == "#nav-approve-history") {
            GetApproveHistoryList();
        }
    });

    $(document).on('click', '.btn-edit-approve', function () {
        _order_id = $(this).data('orderid');
        clearInputForm();
        renderEditQuotation($(this).data('orderid'));
        $('.nav-pills a[href="#nav-approve-empData-tab"]').tab('show');
        $('#modal-editApprove').modal('show');
    });

    $('#div-approveCustomerData .btn-next-approve-cus-style').on('click', function () {
        $('.nav-pills a[href="#nav-approve-style-tab"]').tab('show');
        renderCustStyle();
    });

    $('#div-approveCustomerStyle .btn-previous-approve-cus-data').on('click', function () {
        $('.nav-pills a[href="#nav-approve-empData-tab"]').tab('show');
    });

    $('#div-approveCustomerStyle .btn-next-approve-cus-cal-price').on('click', function () {
        callGetItemOptions();
        callCalculateItemOptions();
        $('.nav-pills a[href="#nav-approve-calculate-tab"]').tab('show');
    });

    $('#div-approveCustomerCalculate .btn-previous-approve-cus-cal-price').on('click', function () {
        $('.nav-pills a[href="#nav-approve-style-tab"]').tab('show');
    });

    $('#div-approveCustomerCalculate .btn-next-approve-cus-upload-ref').on('click', function () {
        $('.nav-pills a[href="#nav-approve-fileUpload-tab"]').tab('show');
    });

    $('#div-approveCustomerRef .btn-previous-approve-cus-upload-ref').on('click', function () {
        $('.nav-pills a[href="#nav-approve-calculate-tab"]').tab('show');
    });

    $('#div-approveCustomerRef .btn-next-approve-tab').on('click', function () {
        $('.nav-pills a[href="#nav-approve-cus-tab"]').tab('show');
    });

    $('#div-approveCustomer .btn-previous-approve-cus').on('click', function () {
        $('.nav-pills a[href="#nav-approve-fileUpload-tab"]').tab('show');
    });

    $('.btn-modal-save-approve').on('click', function () {
        callSaveApprove();
    });
});