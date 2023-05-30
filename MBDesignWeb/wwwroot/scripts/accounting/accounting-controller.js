﻿$(function () {
    clearSearchForm();
    clearSearchInvoiceForm();

    callGetQuotaionSelect2();
    renderEditInvoiceSelect2();
    callGetContractStatusSelect2();
    callGetInvoiceStatusSelect2();
    renderPeriodSelect2();

    callGetAccountingList();
    callGetInvoiceList();

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

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-invoice") {
            callGetInvoiceList();
        }
        else if (target == "#nav-bill") {
            //GetApproveHistoryList();
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
        generateInvoiceNumber();
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
});