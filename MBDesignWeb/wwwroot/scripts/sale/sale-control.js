$(function () {
    renderPermissionMenu();

    clearInputFormCustomerData();
    renderCreateStyleDiv();
    callGetActiveBankAccount();

    callSelect2QuotationStatus('#form-search-quotation #select-search-quotation-status', true);

    clearSearchQuotationForm();
    callGetQuotationList();

    clearSearchContractForm();
    callGetContractStatusSelect2();
    callGetContractList();
    clearUploadRefForm();

    callGetCommissionList();
    callSelect2CommissionStatus();

    $('#div-createNewCus .btn-next-cus-style').on('click', function () {
        if (!validateInputFormCustomerData()) { return; }

        $('.nav-pills a[href="#nav-sale-style-tab"]').tab('show');
        if (_action == "edit") {
            renderCustStyle();
        }
    });

    $('.btn-add-style').on('click', function () {
        renderCreateStyleDiv();
    });

    $('#createStyle .btn-previous-cus-new-data').on('click', function () {
        $('.nav-pills a[href="#nav-sale-empData-tab"]').tab('show');
    });

    $('#createStyle .btn-next-cus-cal-price').on('click', function () {
        if (!validateInputFormStyle()) { return; }

        callGetItemOptions();
        callCalculateItemOptions();
        $('.nav-pills a[href="#nav-sale-calculate-tab"]').tab('show');
    });

    $('#divCalculatePrice .btn-previous-cus-cal-price').on('click', function () {
        $('.nav-pills a[href="#nav-sale-style-tab"]').tab('show');
    });

    $('#divCalculatePrice .btn-save-and-create-quotation').on('click', function () {
        callSaveAndCreateQuotation();
    });

    $('#form-createCalculatePrice input[name="input-cal-note-price"]').on('blur', function () {
        calculateSubAndGrandTotal();
    });

    $('#form-createCalculatePrice input[name="input-cal-note-price"]').on("keydown", function (event) {
        if (event.which == 13) {
            calculateSubAndGrandTotal();
        }
    });

    $('#form-createCalculatePrice input[name="input-cal-discount"]').on('blur', function () {
        calculateSubAndGrandTotal();
    });

    $('#form-createCalculatePrice input[name="input-cal-discount"]').on("keydown", function (event) {
        if (event.which == 13) {
            calculateSubAndGrandTotal();
        }
    });

    $('#form-createCalculatePrice .btn-cal-deposit-amount').on('click', function () {
        calculateDisposite();
    });

    $('#divUploadRef .btn-save-cus-upload-ref').on('click', function () {
        callUploadRef();
    });

    $('#form-search-quotation .btn-clear-search-quotation').on('click', function () {
        clearSearchQuotationForm();
        callGetQuotationList();
    });

    $('#form-search-quotation .btn-search-quotation').on('click', function () {
        callGetQuotationList();
    });

    $('#tb-quotation-list').on('click', 'td.quotationNumber-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        //$(`#modal-viewPosition`).modal('show');
        //_position_action = 'view';
        //clearForm(_modal_department_name);
        //callGetPositionById(id);
    });


    //$('#form-uploadRef #select-upload-plan').on('change', function () {
    //    console.log($(this)[0]);
    //});

    $("#saleMenu li > a").on("click", function (e) {
        let val = $(this).text();

        if (val == "รายการใบเสนอราคา") {
            clearSearchQuotationForm();
            callGetQuotationList();
            $('#divCreateStyle').empty();
            clearAllInputCreateStyle();
        }
        else if (val == "ข้อมูลลูกค้าใหม่") {
            $('#divCreateStyle').empty();
            clearAllInputCreateStyle();
        }
        else if (val == "ค่าคอมมิชชั่น") {
            clearSearchCommission();
            callSelect2CommissionStatus();
            callGetCommissionList();
        }
    });

    $(document).on('click', '.btn-edit-cus-quotation', function () {
        $('.nav-pills a[href="#nav-sale-empData-tab"]').tab('show');
        _action = 'edit';
        _order_id = $(this).data('id');
        clearInputFormCustomerData();
        $('#divCreateStyle').empty();
        renderEditQuotation($(this).data('id'));
    });

    $('#form-search-cus-contract-document .btn-clear-search-cus-doc').on('click', function () {
        clearSearchContractForm();
        callGetContractList();
    });

    $('#form-search-cus-contract-document .btn-search-cus-doc').on('click', function () {
        callGetContractList();
    });

    $('#form-createCalculatePrice .btn-print-quotation').on('click', function () {
        printQuotation();
    });

    $('#form-search-commission .btn-clear-search-commission').on('click', function () {
        clearSearchCommission();
        callGetCommissionList();
    });

    $('#form-search-commission .btn-search-commission').on('click', function () {
        callGetCommissionList();
    });
});