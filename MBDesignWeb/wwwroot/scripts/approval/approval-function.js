let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

let _loader = $('<div/>').addClass('loader');

function GetWaitApproveList() {
    let loaded = $('#tb-approve-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Approve/GetWaitApproveList`,
        success: function (data) {
            renderGetWaitApproveList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetWaitApproveList(data) {
    $('#tb-approve-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: true,
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
                    data: 'quotationNumber',
                    className: "quotationNumber-details",
                },
                {
                    targets: 1,
                    data: 'cusName',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName',
                },
                {
                    targets: 4,
                    data: null,
                    orderable: false,
                    className: "dt-center",
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-approve" data-orderid="${row.orderId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function GetApproveHistoryList() {
    let loaded = $('#tb-approve-history-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Approve/GetApproveHistoryList`,
        success: function (data) {
            renderGetApproveHistoryList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetApproveHistoryList(data) {
    $('#tb-approve-history-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: true,
            data: data,
            dom: 'Bflrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-approveid', data.approveId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'quotationNumber',
                },
                {
                    targets: 1,
                    data: 'cusName',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createByName',
                },
                {
                    targets: 4,
                    data: 'approveStatus',
                    className: "dt-center",
                },
                {
                    targets: 5,
                    data: 'approveComment',
                },
            ],
        }
    );
}

var _items = [];
var _items_options = [];
var _order_id = 0;
var _cust_id = 0;
function renderEditQuotation(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetQuotationDetailByOrderId?orderId=${id}`,
        success: function (data) {
            _items = data.items;
            _items_options = data.itemsOptions;
            renderCustStyleDiv(data);
            renderCustQuotation(data);
            renderCustCalPrice(data);
            renderCustUploadRef(data.uploadRef);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}

function renderCustQuotation(data) {
    let newCusForm = 'form-approve-customer';
    let cust = data.cust;
    let custOrder = data.custOrder;

    $('#modal-editApprove #spnQuotationNumber').html(custOrder.quotationNumber);

    if (custOrder.quotationType == "draft") {
        $(`#${newCusForm} #radioQuotationDraft`).prop('checked', true);
    }
    else {
        $(`#${newCusForm} #radioQuotationComplete`).prop('checked', true);
    }

    $(`#${newCusForm} #input-cus-firstName`).val(cust.custFirstName);
    $(`#${newCusForm} #input-cus-nickname`).val(cust.custNickName);
    $(`#${newCusForm} #input-cus-lineId`).val(cust.custLineId);
    $(`#${newCusForm} #input-cus-bill-address`).val(cust.custAddress);
    $(`#${newCusForm} #input-cus-location-address`).val(cust.custLocation);
    $(`#${newCusForm} #input-cus-lastName`).val(cust.custSurName);
    $(`#${newCusForm} #input-cus-tel`).val(cust.custTel);
    $(`#${newCusForm} #input-cus-install-date`).val(convertDateTimeFormat(custOrder.installDate, 'YYYY-MM-DD'));
    $(`#${newCusForm} #input-cus-install-address`).val(cust.custInstallAddress);
    _cust_id = cust.custId;
}
function renderCustStyleDiv(data) {
    data.items.forEach((v) => {

        let newSeq = $('div[name="seqCreateStyle"]').length == 0 ? 1 : $('div[name="seqCreateStyle"]').length + 1;

        let renderDiv = `<div id="divApproveCustomerStyle-${newSeq}" style="border:solid 0.005rem;" name="seqCreateStyle" class="mt-2">
        <div class="card-header bg-primary text-light">
            <div class="row col-sm-12">
                <div class="col-sm-6 mt-2"><h6>ชิ้นงานที่ ${newSeq}</h6></div>
            </div>
        </div>
        <div class="card-body">
            <form id="formApproveCustomerStyle-${newSeq}">
                <div class="row d-sm-flex">

                    <div class="col-sm-6">
                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกสไตล์</label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-style" data-seq="${newSeq}" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกโซน</label>
                            <div class="col-sm-9">
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="input-cus-product-zone" name="input-cus-product-zone" data-seq="${newSeq}" disabled />
                                </div>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Items</label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-items" onchange="callGetProductItemOptions(this);" data-seq="${newSeq}" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="col-sm-6">
                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกชั้น</label>
                            <div class="col-sm-9">
                                <input class="form-control" type="text" id="input-cus-product-floor" name="input-cus-product-floor" data-seq="${newSeq}" disabled />
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกหมวดหมู่</label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-type" data-seq="${newSeq}" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Options</label>
                            <div class="col-sm-9" id="chkselectOptions-${newSeq}" data-seq="${newSeq}" style="overflow-y:auto;">
    
                            </div>
                        </div>


                    </div>

                </div>

                <div class="row">
                        <div class="row col-sm-12 mb-2">
                    <label class="col-sm-3 col-form-label text-end">ขนาด</label>
                    <div class="row col-sm-9">
                        <div class="col-sm-4">
                            <label class="col-sm-12 col-form-label">ความยาว</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-length" name="input-cus-product-length" data-seq="${newSeq}" disabled />
                                </div>
                        </div>
                        <div class="col-sm-4">
                                <label class="col-sm-12 col-form-label">ความลึก</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-depth" name="input-cus-product-depth" data-seq="${newSeq}" disabled />
                                </div>
                        </div>
                        <div class="col-sm-4">
                          <label class="col-sm-12 col-form-label">ความสูง</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-height" name="input-cus-product-height" data-seq="${newSeq}" disabled />
                                </div>
                        </div>
                    </div>
                </div>

                <div class="row col-sm-12 mb-2">
                    <label class="col-sm-3 col-form-label text-end"></label>
                    <div class="row col-sm-9">
                        <div class="col-sm-12">
                            <label class="col-sm-3 col-form-label"></label>
                                <div class="col-sm-9">
                                     <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="chkSpecialHeight-${newSeq}" disabled>
                                            <label class="form-check-label">
                                            ความสูงพิเศษ (มากกว่าหรือเท่ากับ 2.70 เมตรขึ้นไป จะถูกคำนวณราคาเพิ่ม)
                                            </label>
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                </div>

            </div>

            </form>

        </div>
    </div>`

        $('#divApproveCustomerStyle').append(renderDiv)

        ///Render input form
        let formName = `formApproveCustomerStyle-${newSeq}`;
        callGetStyleSelect2(formName);
        callGetProductTypeSelect2(formName);
        callGetProductItemSelect2(formName);
    });
}
function renderCustStyle() {
    let seq = 1;
    _items.forEach((v) => {
        $(`#formApproveCustomerStyle-${seq} #select-cus-product-style`).val(v.styleId).trigger('change');
        $(`#formApproveCustomerStyle-${seq} input[name="input-cus-product-zone"]`).val(v.zone);
        $(`#formApproveCustomerStyle-${seq} #select-cus-product-items`).val(v.itemId).trigger('change');
        $(`#formApproveCustomerStyle-${seq} input[name="input-cus-product-floor"]`).val(v.floor);
        $(`#formApproveCustomerStyle-${seq} #select-cus-product-type`).val(v.typeId).trigger('change');
        let orderLength = (v.orderLength == 0) ? "" : v.orderLength;
        $(`#formApproveCustomerStyle-${seq} #input-cus-product-length`).val(orderLength);
        let orderDepth = (v.orderDepth == 0) ? "" : v.orderDepth;
        $(`#formApproveCustomerStyle-${seq} #input-cus-product-depth`).val(orderDepth);
        let orderHeight = (v.orderHeight == 0) ? "" : v.orderHeight;
        $(`#formApproveCustomerStyle-${seq} #input-cus-product-height`).val(orderHeight);
        if (v.orderHeight >= 2.70) {
            $(`#formApproveCustomerStyle-${seq} #chkSpecialHeight-${seq}`).prop('checked', true);
        } else {
            $(`#formApproveCustomerStyle-${seq} #chkSpecialHeight-${seq}`).prop('checked', false);

        }

        seq++;
    });

}
function renderCustOptions() {
    let seq = 1;
    _items.forEach((v) => {
        var options = _items_options.filter((a) => { return a.custOrderDetailId == v.custOrderDetailId });
        options.forEach((o) => {
            $(`#formApproveCustomerStyle-${seq} #chkselectOptions-${seq} #${seq}-${o.optionsId}`).prop('checked', true);
        });

        seq++;
    });
}
function renderCustCalPrice(data) {
    let formId = '#form-approveCustomerCalculate';
    let custOrder = data.custOrder;
    console.log(custOrder);
    $(`${formId} input[name="input-cal-note"]`).val(custOrder.orderNote);
    let orderNotePrice = (custOrder.orderNotePrice == 0) ? "" : custOrder.orderNotePrice.toFixed(2);
    $(`${formId} input[name="input-cal-note-price"]`).val(orderNotePrice);

    $(`${formId} input[name="input-cal-subTotal"]`).val(custOrder.subTotal.toFixed(2));

    let orderDisCount = (custOrder.discount == 0) ? "" : custOrder.discount.toFixed(2);
    $(`${formId} input[name="input-cal-discount"]`).val(orderDisCount);

    if (custOrder.vat != 0) {
        $(`${formId} #radioVat`).prop('checked', true);
        $(`${formId} input[name="input-cal-vat"]`).val(custOrder.vat.toFixed(2));
    } else {
        $(`${formId} #radioNonVat`).prop('checked', true);
        $(`${formId} input[name="input-cal-vat"]`).val("");
    }

    $(`${formId} input[name="input-cal-grandTotal"]`).val(custOrder.grandTotal.toFixed(2));
    $(`${formId} input[name="input-cal-disposite"]`).val(custOrder.disposite.toFixed(2));

    if (custOrder.accountType == "บัญชีส่วนบุคคล") {
        $(`${formId} #radioBankPersonal`).prop('checked', true);
    }
    else {
        $(`${formId} #radioBankCompany`).prop('checked', true);
    }
}
function renderCustUploadRef(data) {
    var planImg = data.filter(v => { return v.categoryName == "CustOrderPlan" });

    var lstPlanUrl = [];
    var lstPreviewImg = [];
    planImg.forEach((a) => {
        lstPlanUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            //width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewImg.push(addPreview);
    });

    $('#form-approveCustomerRef #select-upload-plan').fileinput('destroy');
    if (planImg.length > 0) {
        $('#form-approveCustomerRef #select-upload-plan').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            showRemove: false,
            initialPreview: lstPlanUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewImg
            ],
        });
    }
    else {
        $('#form-approveCustomerRef #select-upload-plan').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
        });
    }

    var refImg = data.filter(v => { return v.categoryName == "CustOrderReference" });

    var lstRefUrl = [];
    var lstPreviewRefImg = [];
    refImg.forEach((a) => {
        lstRefUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewRefImg.push(addPreview);
    });

    $('#form-approveCustomerRef #select-upload-reference').fileinput('destroy');
    if (refImg.length > 0) {
        $('#form-approveCustomerRef #select-upload-reference').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            showRemove: false,
            initialPreview: lstRefUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewRefImg
            ],
        });
    }
    else {
        $('#form-approveCustomerRef #select-upload-reference').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
            browseLabel: 'เลือกไฟล์'
        });
    }

    var disImg = data.filter(v => { return v.categoryName == "CustOrderDisposite" });

    var lstDisUrl = [];
    var lstPreviewDisImg = [];
    disImg.forEach((a) => {
        lstDisUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewDisImg.push(addPreview);
    });

    $('#form-approveCustomerRef #select-upload-disposite').fileinput('destroy');
    if (disImg.length > 0) {
        $('#form-approveCustomerRef #select-upload-disposite').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            showRemove: false,
            initialPreview: lstDisUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewDisImg
            ],
        });
    }
    else {
        $('#form-approveCustomerRef #select-upload-disposite').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
            browseLabel: 'เลือกไฟล์'
        });
    }

    var idImg = data.filter(v => { return v.categoryName == "CustOrderIdCard" });

    var lstIdUrl = [];
    var lstPreviewIdImg = [];
    idImg.forEach((a) => {
        lstIdUrl.push(`${a.url}`);

        var addPreview = {
            caption: a.fileName,
            //width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewIdImg.push(addPreview);
    });

    $('#form-approveCustomerRef #select-upload-idcard').fileinput('destroy');
    if (refImg.length > 0) {
        $('#form-approveCustomerRef #select-upload-idcard').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
            showRemove: false,
            initialPreview: lstIdUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewIdImg
            ],
        });
    }
    else {
        $('#form-approveCustomerRef #select-upload-idcard').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
            initialPreview: [],
            initialPreviewAsData: true,
            initialPreviewConfig: [
                {
                    caption: "",
                    width: '120px',
                }

            ],
        });
    }
}
function callGetProductItemOptions(obj) {
    let currSeq = $(obj).data('seq');
    let formName = `formApproveCustomerStyle-${currSeq}`;
    let itemId = $(`#${formName} #select-cus-product-items`).val() == "" ? 0 : $(`#${formName} #select-cus-product-items`).val();

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductItemOptionsByItemId?itemId=${itemId}`,
        success: function (data) {
            renderCheckboxOptions(formName, currSeq, data);
            renderCustOptions();
        },
        error: function (err) {
        }
    });
}
function renderCheckboxOptions(formName, seq, data) {
    let renderChk = ``;

    $(`#${formName} #chkselectOptions-${seq}`).empty();

    data.forEach((v) => {
        renderChk += `<div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="${seq}-${v.optionsId}" name="${v.options}" price="${v.optionsPrice}" disabled>
                            <label class="form-check-label">
                            ${v.options} - ${v.optionsPrice}
                            </label>
                        </div>`;
    });

    $(`#${formName} #chkselectOptions-${seq}`).append(renderChk);
}

function clearInputForm() {

    $('#modal-editApprove #spnQuotationNumber').html("");

    let newCusForm = 'form-approve-customer';
    $(`#${newCusForm} #radioQuotationComplete`).prop('checked', true);
    $(`#${newCusForm} #input-cus-firstName`).val('');
    $(`#${newCusForm} #input-cus-nickname`).val('');
    $(`#${newCusForm} #input-cus-lineId`).val('');
    $(`#${newCusForm} #input-cus-bill-address`).val('');
    $(`#${newCusForm} #input-cus-location-address`).val('');
    $(`#${newCusForm} #input-cus-lastName`).val('');
    $(`#${newCusForm} #input-cus-tel`).val('');
    $(`#${newCusForm} #input-cus-install-date`).val('');
    $(`#${newCusForm} #input-cus-install-address`).val('');

    $(`#divApproveCustomerStyle`).empty(); 

    let calculateForm = 'form-approveCustomerCalculate';
    $(`#${calculateForm} #input-cal-note`).val('');
    $(`#${calculateForm} #input-cal-note-price`).val('');
    $(`#${calculateForm} #divCalItemOptions`).empty();
    $(`#${calculateForm} #input-cal-subTotal`).val('');
    $(`#${calculateForm} #input-cal-discount`).val('');
    $(`#${calculateForm} #radioNonVat`).prop('checked', true);
    $(`#${calculateForm} #input-cal-vat`).val('');
    $(`#${calculateForm} #input-cal-grandTotal`).val('');
    $(`#${calculateForm} #input-cal-disposite`).val('');
    $(`#${calculateForm} #radioBankPersonal`).prop('checked', true);
}

function callGetStyleSelect2(formName) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductStyle`,
        success: function (data) {
            renderStyleSelect2(formName, data);
        },
        error: function (err) {
        }
    });
}
function renderStyleSelect2(formName, data) {
    $(`#${formName} #select-cus-product-style`).empty();
    $(`#${formName} #select-cus-product-style`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#${formName} #select-cus-product-style`).append(`<option value="${v.styleId}">${v.styleName}</option>`);
    });


}
function callGetProductTypeSelect2(formName) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductType`,
        success: function (data) {
            renderProductTypeSelect2(formName, data);
        },
        error: function (err) {
        }
    });
}
function renderProductTypeSelect2(formName, data) {
    $(`#${formName} #select-cus-product-type`).empty();
    $(`#${formName} #select-cus-product-type`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#${formName} #select-cus-product-type`).append(`<option value="${v.typeId}">${v.typeName}</option>`);
    });
}
function callGetProductItemSelect2(formName) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductItem`,
        success: function (data) {
            renderProductItemSelect2(formName, data);
        },
        error: function (err) {
        }
    });
}
function renderProductItemSelect2(formName, data) {
    $(`#${formName} #select-cus-product-items`).empty();
    $(`#${formName} #select-cus-product-items`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`#${formName} #select-cus-product-items`).append(`<option value="${v.itemId}" price="${v.itemPrice}" name="${v.itemName}">${v.fullItemPrice}</option>`);
    });
}

var _bank_account = [];
function callGetActiveBankAccount() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetAllActiveBankAccount`,
        success: function (data) {
            _bank_account = data;
            displayBankAccount('personal');
        },
        error: function (err) {
        }
    });
}
function displayBankAccount(accountType) {
    $('#div-approveCustomerCalculate #displayAccountDetail').empty();

    var acc = _bank_account.filter(v => { return v.accountType == accountType });
    let bank = (acc.length == 0) ? "" : acc[0].bank;
    let accountName = (acc.length == 0) ? "" : acc[0].accountName;
    let accountNumber = (acc.length == 0) ? "" : acc[0].accountNumber;

    let render = `<span>
                    ${bank}<br />
                    ชื่อบัญชี ${accountName}<br />
                    เลขบัญชี ${accountNumber}<br />
                </span>`;

    $('#div-approveCustomerCalculate #displayAccountDetail').append(render)
}

var _style_list = [];
var _subTotal = 0;
var _cal_grand_total = 0;
function callGetItemOptions() {
    _style_list = [];
    $.each($(`#div-approveCustomerStyle #divApproveCustomerStyle div[name="seqCreateStyle"]`), (i, item) => {
        let divId = $(item).attr('id');
        let seq = (divId.split("-")[1])

        let calStyle = $(`#${divId} #select-cus-product-style`).val();
        let calFloor = $(`#${divId} #input-cus-product-floor`).val();
        let calZone = $(`#${divId} #input-cus-product-zone`).val();
        let calType = $(`#${divId} #select-cus-product-type`).val();
        let calItems = $(`#${divId} #select-cus-product-items`).val();
        let calItemsPrice = $(`#${divId} #select-cus-product-items option:selected`).attr('price');
        let calItemsName = $(`#${divId} #select-cus-product-items option:selected`).attr('name');

        var options = [];
        $.each($(`#${divId} #chkselectOptions-${seq} input[type="checkbox"]`), (i, item) => {
            let chkId = $(item).attr('id');
            let optionsId = chkId.split("-")[1];
            let optionsName = $(item).attr('name');
            let optionsPrice = $(item).attr('price');

            options.push({ optionsId: optionsId, optionsChecked: $(`#${chkId}`).prop('checked'), optionsName: optionsName, optionsPrice: optionsPrice });
        });

        let calLength = $(`#${divId} #input-cus-product-length`).val();
        let calDepth = $(`#${divId} #input-cus-product-depth`).val();
        let calHeight = $(`#${divId} #input-cus-product-height`).val();
        let chkSpHeight = $(`#${divId} #chkSpecialHeight-${seq}`).prop('checked');

        _style_list.push({
            divId: divId,
            divSeq: seq,
            styleId: calStyle,
            floor: calFloor,
            zone: calZone,
            typeId: calType,
            itemId: calItems,
            itemName: calItemsName,
            itemPrice: calItemsPrice,
            options: options,
            orderLength: calLength,
            orderDepth: calDepth,
            orderHeight: calHeight,
            spHeight: chkSpHeight
        });
    });
}
function callCalculateItemOptions() {
    let render = "";
    _subTotal = 0;

    $('#div-approveCustomerCalculate #divCalItemOptions').empty();
    _style_list.forEach((v) => {
        let itemName = v.itemName;
        let itemPrice = v.itemPrice;

        let calSpHeight = 0;
        let calSpHeightPercentage = 0;

        if (v.spHeight) {
            calSpHeightPercentage = (100 / 2.60 * v.orderHeight) - 100;
        }

        var activeOptions = v.options.filter(c => { return c.optionsChecked == true; });
        activeOptions.forEach((o) => { itemName += ` ${o.optionsName}`; itemPrice = parseFloat(itemPrice) + parseFloat(o.optionsPrice) });

        calSpHeight = parseFloat(itemPrice) + parseFloat(calSpHeightPercentage);

        let showItemPrice = (parseFloat(itemPrice) + parseFloat(calSpHeight)).toFixed(2);

        render += `<div class="row" id="cal-${v.divId}">
                            <div class="col-sm-8">
                            <input class="form-control mb-2" type="text" id="input-cal-itemOptions" name="input-cal-itemOptions" value="${itemName}" disabled/>
                            </div>
                        <div class="col-sm-4">
                            <input class="form-control mb-2" type="text" id="input-cal-itemPrice" name="input-cal-itemPrice" value="${showItemPrice}" disabled/>
                        </div>
                        </div>`

        _subTotal = parseFloat(_subTotal) + parseFloat(itemPrice) + parseFloat(calSpHeight);

    });

    $('#div-approveCustomerCalculate #divCalItemOptions').append(render);
}

function callGetApproveStatusSelect2() {
    $('#form-approve-customer #select-approve-status').empty();
    $('#form-approve-customer #select-approve-status').append(`<option value="">กรุณาเลือก</option>`);
    $('#form-approve-customer #select-approve-status').append(`<option value="อนุมัติ">อนุมัติ</option>`);
    $('#form-approve-customer #select-approve-status').append(`<option value="ไม่อนุมัติ">ไม่อนุมัติ</option>`);
}

let validateInput = function () {
    if ($('#form-approve-customer #select-approve-status').val() == "") {
        Swal.fire({
            text: "กรุณาเลือกสถานะการอนุมัติ",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-approve-customer #select-approve-status').focus();
        });
        return false;
    }
    return true;
};
function callSaveApprove() {
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
            swal.close();
            DoApproveProcess();
        }
    });
}
function DoApproveProcess() {

    let url = `${app_settings.api_url}/api/Approve/DoApproveProcess`;

    let approveStatus = $('#form-approve-customer #select-approve-status').val();
    let approveComment = $('#form-approve-customer #input-approve-comment').val();

    var obj = {
        approveStatus: approveStatus,
        orderId: _order_id,
        approveComment: approveComment,
        loginCode: _userCode
    };

    var data = JSON.stringify(obj);

    $('.btn-modal-save-approve').addLoading();

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: (res) => {
            if (res.isResult == true) {
                callSuccessAlert();
                $('.btn-modal-save-approve').removeLoading();
                $(`#modal-editApprove`).modal('hide');
                GetWaitApproveList();
                callCountCustOrderWaitForApprove();
            }
        },
        error: () => {
        },
        contentType: 'application/json',
        dataType: "json",
    });
}