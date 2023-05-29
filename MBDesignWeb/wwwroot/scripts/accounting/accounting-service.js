let _order_id = 0;
let _cust_id = 0;
let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

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

    let contractNumber = ($(`${formId} #input-search-contract-number`).val() == '') ? "%%" : $(`${formId} #input-search-contract-number`).val();
    let quotationNumber = ($(`${formId} #input-search-quotation-number`).val() == '') ? "%%" : $(`${formId} #input-search-quotation-number`).val();
    let customerName = ($(`${formId} #input-search-customer-name`).val() == '') ? "%%" : $(`${formId} #input-search-customer-name`).val();
    let contractStatus = ($(`${formId} #select-search-contract-status`).val() == '') ? "%%" : $(`${formId} #select-search-contract-status`).val();
    let contractDate = ($(`${formId} #input-search-contract-date`).val() == '') ? "%%" : $(`${formId} #input-search-contract-date`).val();

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
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.contractUpdateDate ? convertDateTimeFormat(row.contractUpdateDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 7,
                    data: 'contractUpdateBy',
                    render: function (data, type, row) {
                        return row.contractUpdateBy ? contractUpdateBy : "";
                    },
                },
                {
                    targets: 8,
                    data: null,
                    orderable: false,
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
        custId: _cust_id
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