let _order_id = 0;
let _cust_id = 0;
let _invoice_id = 0;

let _invoice_action = 'add';

let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

function clearSearchForm() {
    let formId = '#form-search-accounting';

    $(`${formId} #input-search-contract-number`).val('');
    $(`${formId} #input-search-quotation-number`).val('');
    $(`${formId} #input-search-customer-name`).val('');
    $(`${formId} #select-search-contract-status`).val('').trigger('change');
    $(`${formId} #input-search-contract-date`).val('');
}
function callGetAccountingList() {
    let formId = '#form-search-accounting';

    let contractNumber = ($(`${formId} #input-search-contract-number`).val() == '') ? null : $(`${formId} #input-search-contract-number`).val();
    let quotationNumber = ($(`${formId} #input-search-quotation-number`).val() == '') ? null : $(`${formId} #input-search-quotation-number`).val();
    let customerName = ($(`${formId} #input-search-customer-name`).val() == '') ? null : $(`${formId} #input-search-customer-name`).val();
    let contractStatus = ($(`${formId} #select-search-contract-status`).val() == '') ? null : $(`${formId} #select-search-contract-status`).val();
    let contractDate = ($(`${formId} #input-search-contract-date`).val() == '') ? null : $(`${formId} #input-search-contract-date`).val();

    //let loaded = $('#tb-quotation-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetAccountingList?contractNumber=${contractNumber}&quotationNumber=${quotationNumber}&customerName=${customerName}&contractStatus=${contractStatus}&contractDate=${contractDate}`,
        success: function (data) {
            renderAccountingList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderAccountingList(data) {
    $('#tb-accounting-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-orderid', data.orderId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'contractNumber',
                    //className: "quotationNumber-details",
                },
                {
                    targets: 1,
                    data: 'quotationNumber',
                },
                {
                    targets: 2,
                    data: 'fullName',
                },
                {
                    targets: 3,
                    data: 'contractStatus',
                },
                {
                    targets: 4,
                    data: 'contractCreateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.contractCreateDate ? convertDateTimeFormat(row.contractCreateDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'contractCreateBy',
                },
                {
                    targets: 6,
                    data: 'contractUpdateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.contractUpdateDate ? convertDateTimeFormat(row.contractUpdateDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 7,
                    data: 'contractUpdateBy',
                    render: function (data, type, row) {
                        return row.contractUpdateBy ? row.contractUpdateBy : "";
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_class_display}`,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-accounting" data-orderid="${row.orderId}" data-custid="${row.custId}" data-contractid="${row.contractId}" data-invoiceid="${row.invoiceId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetContractStatusSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetContractStatusSelect2`,
        success: function (data) {
            renderContractStatusSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderContractStatusSelect2(data) {
    $(`#form-search-accounting #select-search-contract-status`).empty();
    $(`#form-search-accounting #select-search-contract-status`).append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $(`#form-search-accounting #select-search-contract-status`).append(`<option value="${v.contractStatus}">${v.contractStatus}</option>`);
    });
    $(`#form-search-accounting #select-search-contract-status`).val('').trigger('change');
}

function clearInputForm() {
    let formId = '#form-editAccounting';
    $(`${formId} #input-edit-acc-contract`).val('');
    $(`${formId} #input-edit-acc-contract-status`).val('');
    $(`${formId} #input-edit-acc-customer-firstName`).val('');
    $(`${formId} #input-edit-acc-quotation`).val('');
    $(`${formId} #input-edit-acc-invoice-status`).val('');
    $(`${formId} #input-edit-acc-customer-surName`).val('');
    $(`${formId} #input-edit-acc-customer-address`).val('');
}
function renderEditAccounting(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetAccountingByOrderId?orderId=${id}`,
        success: function (data) {
            renderAccountingToForm(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderAccountingToForm(data) {
    let formId = '#form-editAccounting';
    console.log(data.custOrder.invoicePeriod);
    $(`${formId} #input-edit-acc-contract`).val(data.custOrder.contractNumber);
    $(`${formId} #input-edit-acc-quotation`).val(data.custOrder.quotationNumber);
    $(`${formId} #input-edit-acc-contract-status`).val(data.custOrder.contractStatus);
    $(`${formId} #input-edit-acc-invoice-status`).val(data.custOrder.invoicePeriod);
    $(`${formId} #input-edit-acc-customer-firstName`).val(data.custOrder.custFirstName);
    $(`${formId} #input-edit-acc-customer-surName`).val(data.custOrder.custSurName);
    $(`${formId} #input-edit-acc-customer-address`).val(data.custOrder.custAddress);

    renderImageUpload(formId, data.imageUpload);
}
function renderImageUpload(formId, data) {
    var custOrderIdCard = data.filter(v => { return v.categoryName == "CustOrderIdCard" });
    console.log(custOrderIdCard);
    var lstIdCardUrl = [];
    var lstPreviewIdCard = [];
    if (custOrderIdCard.length > 0) {
        lstIdCardUrl.push(`${custOrderIdCard[0].url}`);

        var addPreview = {
            caption: custOrderIdCard[0].fileName,
            //width: '120px',
            //url: '/localhost/public/delete',
            key: custOrderIdCard[0].uploadId,
            extra: { id: custOrderIdCard[0].uploadId }
        };

        lstPreviewIdCard.push(addPreview);
    }

    $(`${formId} #pic-acc-customer-idCard`).fileinput('destroy');
    if (custOrderIdCard.length > 0) {
        $(`${formId} #pic-acc-customer-idCard`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstIdCardUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewIdCard
            ],
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${formId} #pic-acc-customer-idCard`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
        });
    }

    var custOrderPlan = data.filter(v => { return v.categoryName == "CustOrderPlan" });

    var lstCustOrderPlanUrl = [];
    var lstPreviewCustOrderPlan = [];
    custOrderPlan.forEach((a) => {
        lstCustOrderPlanUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewCustOrderPlan.push(addPreview);
    });

    $(`${formId} #pic-acc-plan`).fileinput('destroy');
    if (custOrderPlan.length > 0) {
        $(`${formId} #pic-acc-plan`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstCustOrderPlanUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewCustOrderPlan
            ],
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${formId} #pic-acc-plan`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
        });
    }

    var approved3dImg = data.filter(v => { return v.categoryName == "3dApproved" });

    var lstApproved3dUrl = [];
    var lstPreviewApproved3dImg = [];
    approved3dImg.forEach((a) => {
        lstApproved3dUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewApproved3dImg.push(addPreview);
    });

    $(`${formId} #pic-acc-3d-approve`).fileinput('destroy');
    if (approved3dImg.length > 0) {
        $(`${formId} #pic-acc-3d-approve`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            initialPreview: lstApproved3dUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewApproved3dImg
            ],
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`${formId} #pic-acc-3d-approve`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
        });
    }
}

let validateInput = function () {
    let formId = '#form-editAccounting';
    if ($(`${formId} #input-edit-acc-customer-firstName`).val() == "") {
        Swal.fire({
            text: "กรุณากรอกชื่อลูกค้า",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-edit-acc-customer-firstName`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-edit-acc-customer-surName`).val() == "") {
        Swal.fire({
            text: "กรุณากรอกนามสกุล",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-edit-acc-customer-surName`).focus();
        });
        return false;
    }
    else if ($(`${formId} #input-edit-acc-customer-address`).val() == "") {
        Swal.fire({
            text: "กรุณากรอกที่อยู่ลูกค้า",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $(`${formId} #input-edit-acc-customer-address`).focus();
        });
        return false;
    }
    return true;
};
function callSaveAccounting() {
    if (!validateInput()) { return; }

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
            DoSaveAccounting();
        }
    });
}
function DoSaveAccounting() {
    let formId = '#form-editAccounting';
    let custFirstName = $(`${formId} #input-edit-acc-customer-firstName`).val() == "" ? "" : $(`${formId} #input-edit-acc-customer-firstName`).val();
    let custSurName = $(`${formId} #input-edit-acc-customer-surName`).val() == "" ? "" : $(`${formId} #input-edit-acc-customer-surName`).val();
    let custAddress = $(`${formId} #input-edit-acc-customer-address`).val() == "" ? "" : $(`${formId} #input-edit-acc-customer-address`).val();

    var obj = {
        custFirstName: custFirstName,
        custSurName: custSurName,
        custAddress: custAddress,
        custId: _cust_id,
        loginCode: _userCode
    };

    var data = JSON.stringify(obj);

    let url = `${app_settings.api_url}/api/Accounting/DoSaveAccounting`;

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: (res) => {
            if (res.isResult == true) {
                callSuccessAlert();
                $(`#modal-editAccounting`).modal('hide');
                callGetAccountingList();
            }
        },
        error: () => {
        },
        contentType: 'application/json',
        dataType: "json",
    });
}

function callSendToSaleAndForeman() {
    if (!validateInput()) { return; }

    Swal.fire({
        title: 'คุณต้องการส่งเอกสารสัญญาไปทีมเซลล์และโฟร์แมนหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.close();
            DoSendToSaleAndForeman();
        }
    });
}
function DoSendToSaleAndForeman() {
    let url = `${app_settings.api_url}/api/Accounting/DoSendToSaleAndForeman?orderId=${_order_id}`;

    $.ajax({
        url: url,
        type: 'POST',
        //data: data,
        success: (res) => {
            if (res.isResult == true) {
                callSuccessAlert();
                $(`#modal-editAccounting`).modal('hide');
                callGetAccountingList();
            }
        },
        error: () => {
        },
        contentType: 'application/json',
        dataType: "json",
    });
}

function clearSearchInvoiceForm() {
    let formId = '#form-search-invoice';

    $(`${formId} #input-search-quotation-number`).val('');
    $(`${formId} #input-search-invoice-number`).val('');
    $(`${formId} #input-search-customer-name`).val('');
    $(`${formId} #select-search-invoice-status`).val('').trigger('change');
    $(`${formId} #input-search-invoice-date`).val('');
}
function callGetInvoiceList() {
    let formId = '#form-search-invoice';

    let quotationNumber = ($(`${formId} #input-search-quotation-number`).val() == '') ? null : $(`${formId} #input-search-quotation-number`).val();
    let invoiceNumber = ($(`${formId} #input-search-invoice-number`).val() == '') ? null : $(`${formId} #input-search-invoice-number`).val();
    let customerName = ($(`${formId} #input-search-customer-name`).val() == '') ? null : $(`${formId} #input-search-customer-name`).val();
    let invoiceStatus = ($(`${formId} #select-search-invoice-status`).val() == '') ? null : $(`${formId} #select-search-invoice-status`).val();
    let invoiceDate = ($(`${formId} #input-search-invoice-date`).val() == '') ? null : $(`${formId} #input-search-invoice-date`).val();

    //let loaded = $('#tb-quotation-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetInvoiceList?quotationNumber=${quotationNumber}&invoiceNumber=${invoiceNumber}&customerName=${customerName}&invoiceStatus=${invoiceStatus}&invoiceDate=${invoiceDate}`,
        success: function (data) {
            renderInvoiceingList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderInvoiceingList(data) {
    $('#tb-invoice-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-invoiceid', data.invoiceId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'quotationNumber',
                    //className: "quotationNumber-details",
                },
                {
                    targets: 1,
                    data: 'invoiceNumber',
                },
                {
                    targets: 2,
                    data: 'fullName',
                },
                {
                    targets: 3,
                    data: 'invoicePeriod',
                },
                {
                    targets: 4,
                    data: 'invoiceStatus',
                },
                {
                    targets: 5,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'createByName',
                },
                {
                    targets: 7,
                    data: 'updateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 8,
                    data: 'updateByName',
                    render: function (data, type, row) {
                        return row.updateBy ? row.updateBy : "";
                    },
                },
                {
                    targets: 9,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_class_display}`,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-invoice" data-orderid="${row.orderId}" data-custid="${row.custId}" data-invoiceid="${row.invoiceId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetInvoiceStatusSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetInvoiceStatusSelect2`,
        success: function (data) {
            renderInvoiceStatusSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderInvoiceStatusSelect2(data) {
    $(`#form-search-invoice #select-search-invoice-status`).empty();
    $(`#form-search-invoice #select-search-invoice-status`).append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $(`#form-search-invoice #select-search-invoice-status`).append(`<option value="${v.invoiceStatus}">${v.invoiceStatus}</option>`);
    });
    $(`#form-search-invoice #select-search-invoice-status`).val('').trigger('change');
}

function clearInputInvoiceForm() {
    let formId = '#form-createInvoice';
    $(`${formId} #input-invoice-number`).val('');
    $(`${formId} #select-quotation-number`).val('').trigger('change');
    $(`${formId} #select-quotation-number`).removeAttr('disabled')
    $(`${formId} #select-period`).val('').trigger('change');
    $(`${formId} #input-customer-firstName`).val('');
    $(`${formId} #input-customer-tel`).val('');
    $(`${formId} #input-customer-surName`).val('');
    $(`${formId} #select-invoice-status`).val('').trigger('change');
    $(`${formId} #input-install-address`).val('');
    $(`${formId} #input-cal-unitPrice`).val('');
}
function generateInvoiceNumber() {
    let url = `${app_settings.api_url}/api/Accounting/GenerateInvoiceNumber`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            console.log(res);
            if (res != null) {
                $('#form-createInvoice #invoiceNumberGen').val(res.invoiceNumberGen);
                $('#form-createInvoice #invoiceYearMonth').val(res.invoiceYearMonthGen);
                $('#form-createInvoice input[name="input-invoice-number"]').val(res.invoiceNumber);
            }
        },
        error: () => {
        }
    });
}
function renderEditInvoice(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetInvoiceById?orderId=${id}&invoiceId=${_invoice_id}`,
        success: function (data) {
            renderInvoiceToForm(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderInvoiceToForm(data) {
    let formId = '#form-createInvoice';

    $(`${formId} #invoiceNumberGen`).val(data.invoice.invoiceNumberGen);
    $(`${formId} #invoiceYearMonth`).val(data.invoice.invoiceYearMonthGen);
    $(`${formId} #input-invoice-number`).val(data.invoice.invoiceNumber);
    $(`${formId} #select-quotation-number`).val(data.custOrder.orderId).trigger('change');
    $(`${formId} #select-quotation-number`).attr('disabled');
    $(`${formId} #select-period`).val(data.invoice.period).trigger('change');
    $(`${formId} #select-period`).attr('disabled');
    $(`${formId} #input-customer-firstName`).val(data.cust.custFirstName);
    $(`${formId} #input-customer-tel`).val(data.cust.custTel);
    $(`${formId} #input-customer-surName`).val(data.cust.custSurName);
    $(`${formId} #select-invoice-status`).val(data.invoice.invoiceStatus).trigger('change');
    $(`${formId} #input-install-address`).val(data.cust.custInstallAddress);
    $(`${formId} #input-cal-unitPrice`).val(data.invoice.unitPrice.toFixed(2));
}

let _firstFullPeriod = 'งวดที่ 1 เมื่อตกลงนัดผู้ขายสำรวจพื้นที่ติดตั้งชิ้นงานเฟอร์นิเจอร์';
let _secondFullPeriod = 'งวดที่ 2 เมื่อเซ็นสัญญาตกลงซื้องานเฟอร์นิเจอร์เพื่อสั่งผลิต';
let _thridFullPeriod = 'งวดที่ 3 เมื่อนำชิ้นงานส่วนไม้เฟอร์นิเจอร์ขนส่งถึงหน้างาน';
let _fourthFullPeriod = 'งวดที่ 4 เมื่อผู้ขายและทีมงานบริการติดตั้งแล้วเสร็จ พร้อมส่งงาน';

let _firstPeriod = 'จ่ายเงินมัดจำ';
let _secondPeriod = 'งวดที่ 2';
let _thridPeriod = 'งวดที่ 3';
let _fourthPeriod = 'งวดที่ 4';

let _grand_total = 0;
let _disposite = 0;

function renderPeriodSelect2(/*data = null*/orderId = 0, period = "") {
    /*$(`#form-createInvoice #select-period`).empty();
    $(`#form-createInvoice #select-period`).append(`<option value="">กรุณาเลือก</option>`);
    if (_disposite == 0 || _invoice_action == "edit") {
        $(`#form-createInvoice #select-period`).append(`<option value="${_firstPeriod}">${_firstFullPeriod}</option>`);
    }
    $(`#form-createInvoice #select-period`).append(`<option value="${_secondPeriod}">${_secondFullPeriod}</option>`);
    $(`#form-createInvoice #select-period`).append(`<option value="${_thridPeriod}">${_thridFullPeriod}</option>`);
    $(`#form-createInvoice #select-period`).append(`<option value="${_fourthPeriod}">${_fourthFullPeriod}</option>`);

    if (data != null) {
        $(`#form-createInvoice #select-period`).val(data.period).trigger('change');
    }
    else {
        $(`#form-createInvoice #select-period`).val('').trigger('change');
    }

    $(`#form-createInvoice #select-period`).attr('disabled');
    */
    
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetPeriodByOrderId?orderId=${orderId}`,
        success: function (data) {
            $(`#form-createInvoice #select-period`).empty();
            $(`#form-createInvoice #select-period`).append(`<option value="">กรุณาเลือก</option>`);
            if (data.length > 0) {
                data.forEach((v) => {
                    $(`#form-createInvoice #select-period`).append(`<option value="${v.period}">${v.fullPeriod}</option>`);
                });
                $(`#form-createInvoice #select-period`).removeAttr('disabled');
            }

        },
        error: function (err) {
        }
    });

    if (period != "") {
        $(`#form-createInvoice #select-period`).val(period).trigger('change');
        $(`#form-createInvoice #select-period`).attr('disabled');
    }
}
function callGetQuotaionSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetQuotaionStatusSelect2`,
        success: function (data) {
            renderQuotaionSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderQuotaionSelect2(data) {
    $(`#form-createInvoice #select-quotation-number`).empty();
    $(`#form-createInvoice #select-quotation-number`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#form-createInvoice #select-quotation-number`).append(`<option value="${v.orderId}">${v.quotationNumber}</option>`);
    });
    $(`#form-createInvoice #select-quotation-number`).val('').trigger('change');
}
function renderEditInvoiceSelect2() {
    let waitPaid = 'รอจ่าย';
    let paid = 'จ่ายแล้ว';

    $(`#form-createInvoice #select-invoice-status`).empty();
    $(`#form-createInvoice #select-invoice-status`).append(`<option value="">กรุณาเลือก</option>`);
    $(`#form-createInvoice #select-invoice-status`).append(`<option value="${waitPaid}">${waitPaid}</option>`);
    $(`#form-createInvoice #select-invoice-status`).append(`<option value="${paid}">${paid}</option>`);
    $(`#form-createInvoice #select-invoice-status`).val('').trigger('change');
}

function callCustomerInformation(e) {
    let orderId = $(e).val() == "" ? 0 : $(e).val();

    let formId = '#form-createInvoice';

    if ($(`${formId} #select-quotation-number`).val() == "") {
        $(`${formId} #select-period`).attr('disabled');
    }
    else {
        $(`${formId} #select-period`).removeAttr('disabled');
    }

    if (_invoice_action == "add") {
        $(`${formId} #select-period`).val('').trigger('change');
    }

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetCustomerInformationByOrderId?orderId=${orderId}&invoiceId=${_invoice_id}`,
        success: function (data) {
            $(`${formId} #input-customer-firstName`).val('');
            $(`${formId} #input-customer-firstName`).val(data.cust.custFirstName);
            $(`${formId} #input-customer-surName`).val('');
            $(`${formId} #input-customer-surName`).val(data.cust.custSurName);
            $(`${formId} #input-customer-tel`).val('');
            $(`${formId} #input-customer-tel`).val(data.cust.custTel);
            $(`${formId} #input-install-address`).val('');
            $(`${formId} #input-install-address`).val(data.cust.custInstallAddress);

            _cust_id = data.cust.custId;
            _order_id = orderId;

            _grand_total = data.custOrder.grandTotal;
            _disposite = data.custOrder.disposite;

            renderPeriodSelect2(data.custOrder.orderId, data.invoice.period);
        },
        error: function (err) {
        }
    });
}

function calculateByPeriod(e) {
    let unit_price = 0;
    let period = $(e).val();
    if (period == _firstPeriod) {
        unit_price = calculateDispositeFirstPeriod();
    }
    else if (period == _secondPeriod) {
        unit_price = _grand_total * 0.5;
    }
    else if (period == _thridPeriod) {
        unit_price = _grand_total * 0.4;
    }
    else if (period == _fourthPeriod) {
        firstDisposite = calculateDispositeFirstPeriod();
        unit_price = firstDisposite - (_grand_total * 0.1);
    }

    $('#form-createInvoice input[name="input-cal-unitPrice"]').val('');
    $('#form-createInvoice input[name="input-cal-unitPrice"]').val(unit_price.toFixed(2))
}
let calculateDispositeFirstPeriod = function() {
    let showDisposite = 0;
    $('#form-createInvoice input[name="input-cal-unitPrice"]').val('');
    if (_grand_total <= 200000) {
        showDisposite = 5000;
    }
    else if (_grand_total > 200000 && _grand_total <= 600000) {
        showDisposite = 10000;
    }
    else if (_grand_total > 600000 && _grand_total <= 900000) {
        showDisposite = 20000;
    }
    else if (_grand_total > 900000) {
        showDisposite = 30000;
    }

    return showDisposite;
    //$('#form-createInvoice input[name="input-cal-unitPrice"]').val(Math.floor(showDisposite));
}

let validateInputInvoice = function () {
    if ($('#form-createInvoice #input-invoice-number').val() == "") {
        Swal.fire({
            text: "กรุณารอระบบ generate เลขที่ใบแจ้งหนี้",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createInvoice #input-invoice-number').focus();
        });
        return false;
    }
    else if ($('#form-createInvoice #select-quotation-number').val() == "") {
        Swal.fire({
            text: "กรุณาเลือกเลขที่ใบเสนอราคา",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createInvoice #select-quotation-number').focus();
        });
        return false;
    }
    else if ($('#form-createInvoice #select-period').val() == "") {
        Swal.fire({
            text: "กรุณาเลือกงวด",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createInvoice #select-period').focus();
        });
        return false;
    }
    else if ($('#form-createInvoice #input-customer-firstName').val() == "") {
        Swal.fire({
            text: "กรุณากรอกชื่อลูกค้า",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createInvoice #input-customer-firstName').focus();
        });
        return false;
    }
    else if ($('#form-createInvoice #input-customer-surName').val() == "") {
        Swal.fire({
            text: "กรุณากรอกนามสกุล",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createInvoice #input-customer-surName').focus();
        });
        return false;
    }
    else if ($('#form-createInvoice #input-customer-tel').val() == "") {
        Swal.fire({
            text: "กรุณากรอกเบอร์โทรศัพท์",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createInvoice #input-customer-tel').focus();
        });
        return false;
    }
    else if ($('#form-createInvoice #select-invoice-status').val() == "") {
        Swal.fire({
            text: "กรุณาเลือกสถานะใบแจ้งหนี้",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createInvoice #select-invoice-status').focus();
        });
        return false;
    }
    else if ($('#form-createInvoice #input-cal-unitPrice').val() == "" || $('#form-createInvoice #input-cal-unitPrice').val() == 0) {
        Swal.fire({
            text: "กรุณาเลือกสถานะใบแจ้งหนี้",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createInvoice #input-cal-unitPrice').focus();
        });
        return false;
    }

    return true;
};
function callSaveCreateOrUpdateInvoice() {
    if (!validateInputInvoice()) { return; }

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
            DoSaveCreateOrUpdateInvoice();
        }
    });
}
function DoSaveCreateOrUpdateInvoice() {
    let formId = '#form-createInvoice';

    let invoiceNumber = $(`${formId} #input-invoice-number`).val() == "" ? "" : $(`${formId} #input-invoice-number`).val();
    let invoiceNumberGen = $(`${formId} #invoiceNumberGen`).val();
    let invoiceYearMonthGen = $(`${formId} #invoiceYearMonth`).val();
    let period = $(`${formId} #select-period`).val() == "" ? "" : $(`${formId} #select-period`).val();
    let custFirstName = $(`${formId} #input-customer-firstName`).val() == "" ? "" : $(`${formId} #input-customer-firstName`).val();
    let custTel = $(`${formId} #input-customer-tel`).val() == "" ? "" : $(`${formId} #input-customer-tel`).val();
    let custSurName = $(`${formId} #input-customer-surName`).val() == "" ? "" : $(`${formId} #input-customer-surName`).val();
    let invoiceStatus = $(`${formId} #select-invoice-status`).val() == "" ? "" : $(`${formId} #select-invoice-status`).val();
    let custInstallAddress = $(`${formId} #input-install-address`).val() == "" ? "" : $(`${formId} #input-install-address`).val();
    let unitPrice = $(`${formId} #input-cal-unitPrice`).val() == "" ? "" : $(`${formId} #input-cal-unitPrice`).val();


    var obj = {
        invoiceNumber: invoiceNumber,
        invoiceNumberGen: invoiceNumberGen,
        invoiceYearMonthGen: invoiceYearMonthGen,
        period: period,
        orderId: _order_id,
        custId: _cust_id,
        custFirstName: custFirstName,
        custTel: custTel,
        custSurName: custSurName,
        invoiceStatus: invoiceStatus,
        custInstallAddress: custInstallAddress,
        unitPrice: unitPrice,
        invoiceId: _invoice_id,
        loginCode: _userCode
    };

    var data = JSON.stringify(obj);

    let url = (_invoice_action == "add") ? `${app_settings.api_url}/api/Accounting/DoAddInvoice` : `${app_settings.api_url}/api/Accounting/DoUpdateInvoice`;

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: (res) => {
            if (res.isResult == true) {
                callSuccessAlert();
                $(`#modal-createInvoice`).modal('hide');
                callGetInvoiceList();
            }
        },
        error: () => {
        },
        contentType: 'application/json',
        dataType: "json",
    });
}


function printInvoice() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Document/GetInvoiceByInvoiceId?invoiceId=${_invoice_id}`,
        success: function (data) {
            if (data.invoice != null) {
                generateInvoiceDocument(data);
            }
        },
        error: function (err) {
        }
    });
}
async function generateInvoiceDocument(data) {
    await renderInvoiceHtml(data);
}
async function renderInvoiceHtml(data) {
    var currDate = new Date();
    var createInvoiceDate = convertDateTimeFormat(currDate, 'DD/MM/YYYY');

    var custFullName = data.cust.custFirstName + ' ' + data.cust.custSurName;

    $('#invoiceElement #spnInvoiceNumber').html(data.invoice.invoiceNumber);
    $('#invoiceElement #spnCreateInviceDocDate').html(createInvoiceDate);

    $('#invoiceElement #lblCusName').html(custFullName);

    var accname = `ชื่อบัญชี ${data.custOrder.accountName} ${data.custOrder.accountNumber}`
    var accbank = `${data.custOrder.bank}`;
    $('#invoiceElement #spnAccName').html(accname);
    $('#invoiceElement #spnAccBank').html(accbank);

    var period = "";
    switch (data.invoice.period) {
        case _firstPeriod: period = _firstFullPeriod; break;
        case _secondPeriod: period = _secondFullPeriod; break;
        case _thridPeriod: period = _thridFullPeriod; break;
        case _fourthPeriod: period = _fourthFullPeriod; break;
    }

    var itemNo = 1;
    var size = "";
    var qty = 1;
    var item = ''
    item += `<tr>
                        <td>${itemNo}</td>
                        <td>${period}</td>
                        <td>${size}</td>
                        <td>${data.invoice.unitPrice}</td>
                        <td>${qty}</td>
                        <td>${data.custOrder.grandTotal}</td>
                    </tr>`;

    item += `<tr>
                        <td><td colspan="3"></td></td>

                        <td>Sub.Total</td>
                        <td>${data.custOrder.subTotal}</td>
                    </tr>`;

    item += `<tr>
                        <td><td colspan="3"></td></td>

                        <td>Vat 7%</td>
                        <td>${data.custOrder.vat}</td>
                    </tr>`;

    item += `<tr>
                        <td><td colspan="3"></td></td>

                        <td>Grand Total%</td>
                        <td>${data.custOrder.grandTotal}</td>
                    </tr>`;

    $('#invoice-item-list').empty();
    $('#invoice-item-list').append(item);

    let options = {
        margin: 0.25,
        // pagebreak: { mode: "avoid-all", before: "#page2el" },
        image: { type: "png", quality: 0.98 },
        html2canvas: { scale: 1, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        filename: `Invoice_${data.invoice.invoiceNumber}`,
    };

    var element = document.getElementById("invoiceElement");
    //html2pdf().from(element).set(options).save();
    //html2pdf(element);
    html2pdf().from(element).set(options).save();
}

function clearSearchReceiptForm() {
    let formId = '#form-search-bill';

    $(`${formId} #input-search-invoice-number`).val('');
    $(`${formId} #input-search-invoice-bill`).val('');
    $(`${formId} #input-search-customer-name`).val('');
    $(`${formId} #input-search-bill-date`).val('');
}
function callGetReceiptList() {
    let formId = '#form-search-bill';

    let invoiceNumber = ($(`${formId} #input-search-invoice-number`).val() == '') ? null : $(`${formId} #input-search-invoice-number`).val();
    let receiptNumber = ($(`${formId} #input-search-invoice-bill`).val() == '') ? null : $(`${formId} #input-search-invoice-bill`).val();
    let customerName = ($(`${formId} #input-search-customer-name`).val() == '') ? null : $(`${formId} #input-search-customer-name`).val();
    let receiptDate = ($(`${formId} #input-search-bill-date`).val() == '') ? null : $(`${formId} #input-search-bill-date`).val();

    //let loaded = $('#tb-quotation-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetBillList?invoiceNumber=${invoiceNumber}&receiptNumber=${receiptNumber}&customerName=${customerName}&receiptDate=${receiptDate}`,
        success: function (data) {
            renderReceiptList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderReceiptList(data) {
    $('#tb-bill-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-orderid', data.orderId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'invoiceNumber',
                    //className: "quotationNumber-details",
                },
                {
                    targets: 1,
                    data: 'receiptNumber',
                },
                {
                    targets: 2,
                    data: 'fullName',
                },
                {
                    targets: 3,
                    data: 'invoicePeriod',
                },
                {
                    targets: 4,
                    data: 'invoiceStatus',
                },
                {
                    targets: 5,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'createByName',
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    className: "dt-center",
                    render: function (data, type, row) {
                        return `<button type="button" class="btn-add-custom btn-print-receipt" data-orderid="${row.orderId}" data-custid="${row.custId}" data-invoiceid="${row.invoiceId}" data-receiptid="${row.receiptId}"  title="พิพม์">
                    <img src="/images/printing.png" width="25px" /></button>`;
                    },
                },
            ],
        }
    );
}

function printReceipt(receiptId) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Document/GetReceiptByReceiptId?receiptId=${receiptId}`,
        success: function (data) {
            if (data.receipt != null) {
                generateReceiptDocument(data);
            }
        },
        error: function (err) {
        }
    });
}
async function generateReceiptDocument(data) {
    await renderReceiptHtml(data);
}
async function renderReceiptHtml(data) {
    var currDate = new Date();
    var createReceiptDate = convertDateTimeFormat(currDate, 'DD/MM/YYYY');

    var custFullName = data.cust.custFirstName + ' ' + data.cust.custSurName;

    $('#receiptElement #spnReceiptNumber').html(data.receipt.receiptNumber);
    $('#receiptElement #spnCreateInviceDocDate').html(createReceiptDate);

    $('#receiptElement #lblCusName').html(custFullName);

    var accname = `ชื่อบัญชี ${data.custOrder.accountName} ${data.custOrder.accountNumber}`
    var accbank = `${data.custOrder.bank}`;
    $('#receiptElement #spnAccName').html(accname);
    $('#receiptElement #spnAccBank').html(accbank);

    var period = "";
    switch (data.invoice.period) {
        case _firstPeriod: period = _firstFullPeriod; break;
        case _secondPeriod: period = _secondFullPeriod; break;
        case _thridPeriod: period = _thridFullPeriod; break;
        case _fourthPeriod: period = _fourthFullPeriod; break;
    }

    var itemNo = 1;
    var size = "";
    var qty = 1;
    var item = ''
    item += `<tr>
                        <td>${itemNo}</td>
                        <td>${period}</td>
                        <td>${size}</td>
                        <td>${data.invoice.unitPrice}</td>
                        <td>${qty}</td>
                        <td>${data.custOrder.grandTotal}</td>
                    </tr>`;

    item += `<tr>
                        <td><td colspan="3"></td></td>

                        <td>Sub.Total</td>
                        <td>${data.custOrder.subTotal}</td>
                    </tr>`;

    item += `<tr>
                        <td><td colspan="3"></td></td>

                        <td>Vat 7%</td>
                        <td>${data.custOrder.vat}</td>
                    </tr>`;

    item += `<tr>
                        <td><td colspan="3"></td></td>

                        <td>Grand Total%</td>
                        <td>${data.custOrder.grandTotal}</td>
                    </tr>`;

    $('#receipt-item-list').empty();
    $('#receipt-item-list').append(item);

    let options = {
        margin: 0.25,
        // pagebreak: { mode: "avoid-all", before: "#page2el" },
        image: { type: "png", quality: 0.98 },
        html2canvas: { scale: 1, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        filename: `Receipt_${data.invoice.invoiceNumber}`,
    };

    var element = document.getElementById("receiptElement");
    //html2pdf().from(element).set(options).save();
    //html2pdf(element);
    html2pdf().from(element).set(options).save();
}

function callIdCardComCert() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Accounting/GetIdCardComCert`,
        success: function (data) {
            let idCardFileName = "";
            let comcertFileName = "";
            if (data != null) {
                idCardFileName = data.imgIdCardFileName;
                comcertFileName = data.imgComCertFileName;
            }
            renderIdCard(idCardFileName);
            renderComcert(comcertFileName);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderIdCard(imgIdCardFileName) {
    var lstUrl = [];
    var lstPreviewImg = [];
    if (imgIdCardFileName != "") {
        //data.forEach((a) => {
        lstUrl.push(`${imgIdCardFileName}`);

        var addPreview = {
            caption: "Id Card",
            //width: '120px',
            //url: '/localhost/public/delete',
            //key: data.uploadId,
            //extra: {
            //    id: data.uploadId
            //},
        };

        lstPreviewImg.push(addPreview);
        //});
    }

    $(`#form-uploadBoardIdCard #select-upload-board-idcard`).fileinput('destroy');
    if (imgIdCardFileName != "") {
        $(`#form-uploadBoardIdCard #select-upload-board-idcard`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewImg
            ],
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`#form-uploadBoardIdCard #select-upload-board-idcard`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            showCaption: true,
            showUpload: true,
        });
    }
}
function renderComcert(imgComCertFileName) {
    var lstUrl = [];
    var lstPreviewImg = [];
    if (imgComCertFileName != "") {
        //data.forEach((a) => {
        lstUrl.push(`${imgComCertFileName}`);

        var addPreview = {
            caption: "CompanyCertificate.pdf",
            type: "pdf",
            size: 8000,
        };

        lstPreviewImg.push(addPreview);
    }

    $(`#form-uploadCompanyCert #select-upload-company-cert`).fileinput('destroy');
    if (imgComCertFileName != "") {
        $(`#form-uploadCompanyCert #select-upload-company-cert`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstUrl,
            initialPreviewAsData: true,
            initialPreviewFileType: 'image', 
            initialPreviewConfig: [
                lstPreviewImg
            ],
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $(`#form-uploadCompanyCert #select-upload-company-cert`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            showCaption: true,
            showUpload: true,
        });
    }
}
function saveIdCard() {
    var control = document.getElementById(`select-upload-board-idcard`);
    var files = control.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    let url = `${app_settings.api_url}/api/Accounting/DoUpdateIdCard?loginCode=${_userCode}`;
    $.ajax({
        url: url,
        type: "POST",
        contentType: false, // Do not set any content header
        processData: false, // Do not process data
        data: formData,
        async: false,
        success: function (result) {
            if (result.isResult == true) {
                callSuccessAlert();
                callIdCardComCert();
            }
        },
        error: function (err) {

        }
    });
}
function saveComCert() {
    var control = document.getElementById(`select-upload-company-cert`);
    var files = control.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    let url = `${app_settings.api_url}/api/Accounting/DoUpdateComCert?loginCode=${_userCode}`;
    $.ajax({
        url: url,
        type: "POST",
        contentType: false, // Do not set any content header
        processData: false, // Do not process data
        data: formData,
        async: false,
        success: function (result) {
            if (result.isResult == true) {
                callSuccessAlert();
                callIdCardComCert();
            }
        },
        error: function (err) {

        }
    });
}