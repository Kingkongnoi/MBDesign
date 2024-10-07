$(function () {
    clearSearchForm();
    clearSearchInvoiceForm();
    clearSearchReceiptForm();

    callGetQuotaionSelect2();
    renderEditInvoiceSelect2();
    callGetContractStatusSelect2();
    callGetInvoiceStatusSelect2();
    renderPeriodSelect2();

    callGetAccountingList();
    callGetInvoiceList();
    callGetReceiptList();

    callIdCardComCert();

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
        _contract_id = $(this).data('contractid');
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

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-invoice") {
            callGetInvoiceList();
        }
        else if (target == "#nav-bill") {
            callGetReceiptList();
        }
        else if (target == "#nav-idcard") {
            callIdCardComCert();
        }
        else if (target == "#nav-cert") {
            callIdCardComCert();
        }
    });

    $('#nav-invoice #form-search-invoice .btn-clear-search-invoice').on('click', function () {
        clearSearchInvoiceForm();
        callGetInvoiceList();
    });

    $('#nav-invoice #form-search-invoice .btn-search-invoice').on('click', function () {
        callGetInvoiceList();
    });

    $('#nav-invoice .btn-add-invoice').on('click', function () {
        _invoice_action = 'add'
        _order_id = 0;
        _cust_id = 0;
        _invoice_id = 0;
        clearInputForm();
        generateInvoiceNumber();
        $(`#form-createInvoice #select-period`).attr('disabled');
        $(`#modal-createInvoice #invoiceHeader`).text('เพิ่มใบแจ้งหนี้');
        $('#modal-createInvoice').modal('show');
    });

    $(document).on('click', '.btn-edit-invoice', function () {
        _order_id = $(this).data('orderid');
        _cust_id = $(this).data('custid');
        _invoice_id = $(this).data('invoiceid');
        _invoice_action = 'edit';
        clearInputInvoiceForm();
        renderEditInvoice($(this).data('orderid'));
        $(`#modal-createInvoice #invoiceHeader`).text('แก้ไขใบแจ้งหนี้');
        $('#modal-createInvoice').modal('show');
    });

    $('.btn-modal-save-invoice').on('click', function () {
        callSaveCreateOrUpdateInvoice();
    });

    $('.btn-print-invoice').on('click', function () {
        printInvoice();
    });

    $('#form-search-bill .btn-clear-search-bill').on('click', function () {
        clearSearchReceiptForm();
        callGetReceiptList();
    });

    $('#form-search-bill .btn-search-bill').on('click', function () {
        callGetReceiptList();
    });

    $(document).on('click', '.btn-print-receipt', function () {
        printReceipt($(this).data('receiptid'));
    });

    $('#nav-idcard .btn-save-board-idcard').on('click', function () {
        Swal.fire({
            title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: `ยกเลิก`,
            confirmButtonColor: _modal_primary_color_code,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.close();
                saveIdCard();
            }
        });
    });

    $('#nav-certificate .btn-save-company-cert').on('click', function () {
        Swal.fire({
            title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: `ยกเลิก`,
            confirmButtonColor: _modal_primary_color_code,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.close();
                saveComCert();
            }
        });
    });

    $('.btn-print-contract').on('click', function () {
        printContract(_contract_id);
    });
});