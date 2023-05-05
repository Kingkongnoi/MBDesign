$(function () {
    clearInputFormCustomerData();
    renderCreateStyleDiv();
    callGetActiveBankAccount();

    callSelect2QuotationStatus('#form-search-quotation #select-search-quotation-status', true);

    clearSearchQuotationForm();
    callGetQuotationList();

    $('#div-createNewCus .btn-next-cus-style').on('click', function () {
        if (!validateInputFormCustomerData()) { return; }

        $('.nav-pills a[href="#nav-sale-style-tab"]').tab('show');
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

    //$("#saleMenu li > a").on("click", function (e) {
    //    let val = $(this).text();

    //    if (val == "รายละเอียดสไตล์และชิ้นงาน") {
    //        if (validateInputFormCustomerData()) {
    //            $('.nav-pills a[href="#nav-sale-style-tab"]').tab('show');
    //        }
    //        else {
    //            $('.nav-pills a[href="#nav-sale-empData-tab"]').tab('show');
    //        }
    //    }
    //    else if (val == "การคำนวณราคา") {
    //        console.log(validateInputFormStyle());
    //        if (validateInputFormStyle()) {
    //            //callGetItemOptions();
    //            //callCalculateItemOptions();
    //            $('.nav-pills a[href="#nav-sale-calculate-tab"]').tab('show');
    //        }
    //        else {
    //            $('.nav-pills a[href="#nav-sale-style-tab"]').tab('show');
    //        }
    //    }
    //});

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
});