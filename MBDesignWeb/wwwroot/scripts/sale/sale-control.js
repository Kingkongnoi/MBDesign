$(function () {
    clearInputFormCustomerData();
    renderCreateStyleDiv();
    callGetActiveBankAccount();

    callSelect2QuotationStatus('#form-search-quotation #select-search-quotation-status', true);

    clearSearchQuotationForm();
    callGetQuotationList();

    $('#div-createNewCus .btn-next-cus-style').on('click', function (e) {
        if (!validateInputFormCustomerData()) { return false; }

        e.preventDefault();
        $('.nav-pills .active').parent().next('li').find('a').trigger('click');
    });

    $('.btn-add-style').on('click', function () {
        renderCreateStyleDiv();
    });

    $('.btn-next-cus-cal-price').on('click', function () {
        callGetItemOptions();
        callCalculateItemOptions();
    });

    $('#divCalculatePrice .btn-save-and-create-quotation').on('click', function () {
        callSaveAndCreateQuotation();
    });

    $("#saleMenu li > a").on("click", function (e) {
        let val = $(this).text();
        
        if (val == "รายละเอียดสไตล์และชิ้นงาน") {
            if (!validateInputFormCustomerData())
            {
                var href = "#nav-sale-empData-tab";
                e.preventDefault();
                $(`#saleMenu li > a[href="${href}"]`).trigger('click');
            }
        }
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