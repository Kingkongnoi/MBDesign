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
                    className: `dt-center ${_role_approve_class_display}`,
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
                                <select class="form-select" id="select-cus-product-style" data-seq="${newSeq}">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกโซน</label>
                            <div class="col-sm-9">
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="input-cus-product-zone" name="input-cus-product-zone" data-seq="${newSeq}" />
                                </div>
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือก Items</label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-items" onchange="callGetProductItemOptions(this);" data-seq="${newSeq}" >
                                    <option></option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="col-sm-6">
                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกชั้น</label>
                            <div class="col-sm-9">
                                <input class="form-control" type="text" id="input-cus-product-floor" name="input-cus-product-floor" data-seq="${newSeq}" />
                            </div>
                        </div>

                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกหมวดหมู่</label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-type" onchange="callGetProductItemSelect2ByType(this);" data-seq="${newSeq}" >
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
                                    <input class="form-control" type="number" id="input-cus-product-length" name="input-cus-product-length" data-seq="${newSeq}" />
                                </div>
                        </div>
                        <div class="col-sm-4">
                                <label class="col-sm-12 col-form-label">ความลึก</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-depth" name="input-cus-product-depth" data-seq="${newSeq}"/>
                                </div>
                        </div>
                        <div class="col-sm-4">
                          <label class="col-sm-12 col-form-label">ความสูง</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-height" name="input-cus-product-height" data-seq="${newSeq}" onblur="setCheckedSpecialHeight(${newSeq});" onkeydown="setCheckedSpecialHeight(${newSeq});" />
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
    
    $(`${formId} input[name="input-cal-note"]`).val(custOrder.orderNote);
    let orderNotePrice = (custOrder.orderNotePrice == 0) ? "" : custOrder.orderNotePrice.toFixed(2);
    $(`${formId} input[name="input-cal-note-price"]`).val(orderNotePrice);

    //$(`${formId} input[name="input-cal-subTotal"]`).val(custOrder.subTotal.toFixed(2));

    let orderDisCount = (custOrder.discount == 0) ? "" : custOrder.discount.toFixed(2);
    $(`${formId} input[name="input-cal-discount"]`).val(orderDisCount);

    if (custOrder.vat != 0) {
        $(`${formId} #radioVat`).prop('checked', true);
        $(`${formId} input[name="input-cal-vat"]`).val(custOrder.vat.toFixed(2));
    } else {
        $(`${formId} #radioNonVat`).prop('checked', true);
        $(`${formId} input[name="input-cal-vat"]`).val("");
    }

    //$(`${formId} input[name="input-cal-grandTotal"]`).val(custOrder.grandTotal.toFixed(2));
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
            width: '120px',
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
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstPlanUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewImg
            ],
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $('#form-approveCustomerRef #select-upload-plan').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
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
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstRefUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewRefImg
            ],
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $('#form-approveCustomerRef #select-upload-reference').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
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
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstDisUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewDisImg
            ],
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $('#form-approveCustomerRef #select-upload-disposite').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
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
            width: '120px',
            //url: '/localhost/public/delete',
            key: a.uploadId,
            extra: { id: a.uploadId }
        };

        lstPreviewIdImg.push(addPreview);
    });

    $('#form-approveCustomerRef #select-upload-idcard').fileinput('destroy');
    if (idImg.length > 0) {
        $('#form-approveCustomerRef #select-upload-idcard').fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: true,
            showCaption: true,
            initialPreview: lstIdUrl,
            initialPreviewAsData: true,
            initialPreviewConfig: [
                lstPreviewIdImg
            ],
            overwriteInitial: false,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
        });
    }
    else {
        $('#form-approveCustomerRef #select-upload-idcard').fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            browseLabel: 'เลือกไฟล์'
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
        $(`#${formName} #select-cus-product-type`).append(`<option value="${v.typeId}" price="${v.typePrice}" name="${v.typeName}">${v.fullTypePrice}</option>`);
    });
}
function callGetProductItemSelect2(formName) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductItem`,
        success: function (data) {
            renderProductItemSelect2(formName/*, data*/);
        },
        error: function (err) {
        }
    });
}
function renderProductItemSelect2(formName/*, data*/) {
    $(`#${formName} #select-cus-product-items`).empty();
    $(`#${formName} #select-cus-product-items`).append(`<option value="">กรุณาเลือก</option>`);
    //data.forEach((v) => {
    //    $(`#${formName} #select-cus-product-items`).append(`<option value="${v.itemId}" price="${v.itemPrice}" name="${v.itemName}">${v.fullItemPrice}</option>`);
    //});

    //if (_action == "add") {
    $(`#${formName} #select-cus-product-items`).val('').trigger('change');
    //}
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
        let calTypePrice = $(`#${divId} #select-cus-product-type option:selected`).attr('price');
        let calTypeName = $(`#${divId} #select-cus-product-type option:selected`).attr('name');
        let calItems = $(`#${divId} #select-cus-product-items`).val();
        let calItemsPrice = ($(`#${divId} #select-cus-product-items option:selected`).attr('price') == undefined || $(`#${divId} #select-cus-product-items option:selected`).attr('price') == "")
            ? 0 : $(`#${divId} #select-cus-product-items option:selected`).attr('price');
        let calItemsName = ($(`#${divId} #select-cus-product-items option:selected`).attr('name') == undefined || $(`#${divId} #select-cus-product-items option:selected`).attr('name') == "")
            ? "" : $(`#${divId} #select-cus-product-items option:selected`).attr('name');

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
            typePrice: calTypePrice,
            typeName: calTypeName,
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
        let typeName = v.typeName;
        let typePrice = v.typePrice;

        let itemName = typeName + (v.itemName == "" ? "" : ` ${v.itemName}`);
        let itemPrice = parseFloat(typePrice) + (v.itemPrice == "" ? 0 : parseFloat(v.itemPrice));

        let calSpHeight = 0;
        let calSpHeightPercentage = 0;

        if (v.spHeight) {
            calSpHeightPercentage = ((100 / 2.60 * v.orderHeight) - 100) / 100;
        }

        var activeOptions = v.options.filter(c => { return c.optionsChecked == true; });
        activeOptions.forEach((o) => { itemName += ` ${o.optionsName}`; itemPrice = parseFloat(itemPrice) + parseFloat(o.optionsPrice) });

        let showItemPrice = 0;
        if (v.spHeight) {
            calSpHeight = Math.ceil(((parseFloat(itemPrice) * parseFloat(calSpHeightPercentage)) + parseFloat(itemPrice))).toFixed(2);
            showItemPrice = calSpHeight;
        }
        else {
            showItemPrice = (parseFloat(itemPrice).toFixed(2));
        }

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
    calculateSubAndGrandTotal();
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
            saveQuotation();
            saveUpload();
            DoApproveProcess();
        }
    });
}

function saveQuotation() {
    //customer data
    let newCusForm = 'form-approve-customer';
    let quotationType = ($(`#${newCusForm} #radioQuotationDraft`).prop('checked') == true) ? "draft" : "complete";
    let cusFirstName = $(`#${newCusForm} #input-cus-firstName`).val();
    let cusNickName = $(`#${newCusForm} #input-cus-nickname`).val();
    let cusLineId = $(`#${newCusForm} #input-cus-lineId`).val();
    let cusBillAddress = $(`#${newCusForm} #input-cus-bill-address`).val();
    let cusLocationAddress = $(`#${newCusForm} #input-cus-location-address`).val();
    let cusLastName = $(`#${newCusForm} #input-cus-lastName`).val();
    let cusTel = $(`#${newCusForm} #input-cus-tel`).val();
    let cusInstallDate = $(`#${newCusForm} #input-cus-install-date`).val();
    let cusInstallAddress = $(`#${newCusForm} #input-cus-install-address`).val();

    //style
    var items = [];
    _style_list.forEach((v) => {
        var options = [];

        var activeOptions = v.options.filter(c => { return c.optionsChecked == true; });
        activeOptions.forEach((o) => { options.push({ optionsId: o.optionsId }) });

        items.push({
            styleId: v.styleId,
            floor: v.floor,
            zone: v.zone,
            typeId: v.typeId,
            itemId: v.itemId,
            orderLength: v.orderLength,
            orderDepth: v.orderDepth,
            orderHeight: v.orderHeight,
            options: options
        });
    });

    //Calculate
    let calFormId = 'form-approveCustomerCalculate';
    let calNote = $(`#${calFormId} #input-cal-note`).val();
    let calOrderNotePrice = $(`#${calFormId} #input-cal-note-price`).val();
    let subTotal = $(`#${calFormId} #input-cal-subTotal`).val();
    let discount = $(`#${calFormId} #input-cal-discount`).val();
    let vatPercentage = ($(`#${calFormId} #radioVat`).prop('checked') == true) ? 0.07 : 0;
    let vat = $(`#${calFormId} #input-cal-vat`).val();
    let grandTotal = $(`#${calFormId} #input-cal-grandTotal`).val();
    let disposite = $(`#${calFormId} #input-cal-disposite`).val();
    let accountType = ($(`#${calFormId} #radioBankPersonal`).prop('checked') == true) ? "บัญชีส่วนบุคคล" : "บัญชีนามบริษัท";
    let quotationComment = $(`#${calFormId} #input-cal-approve`).val();

    let url = `${app_settings.api_url}/api/Sale/SaveAndCreateQuotation`;

    var obj = {
        custFirstName: cusFirstName,
        custSurName: cusLastName,
        custNickName: cusNickName,
        custTel: cusTel,
        custLineId: cusLineId,
        custAddress: cusBillAddress,
        custLocation: cusLocationAddress,
        custInstallAddress: cusInstallAddress,
        quotationType: quotationType,
        installDate: cusInstallDate,
        items: items,
        orderNote: calNote,
        orderNotePrice: calOrderNotePrice,
        subTotal: subTotal,
        discount: discount,
        vat: vat,
        grandTotal: grandTotal,
        disposite: disposite,
        accountType: accountType,
        vatPercentage: vatPercentage,
        action: "edit",
        orderId: _order_id,
        custId: _cust_id,
        quotationComment: quotationComment,
        loginCode: _userCode,
    };

    var data = JSON.stringify(obj);

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: (res) => {
            if (res != "") {
                
            }
        },
        error: () => {
            $('.cbtn-modal-save-approve').removeLoading();
        },
        contentType: 'application/json',
        dataType: "json",
    });
} 
function saveUpload() {
    var rsltUpload = true;

    var orderId = _order_id;

    var selectUploadPlan = document.getElementById("select-upload-plan");
    var uploadPlan = selectUploadPlan.files;
    if (uploadPlan.length > 0) {
        rsltUpload = callSaveUpload(orderId, "CustOrderPlan", "select-upload-plan");
    }

    var selectUploadRef = document.getElementById("select-upload-reference");
    var uploadRef = selectUploadRef.files;
    if (uploadRef.length > 0) {
        rsltUpload = callSaveUpload(orderId, "CustOrderReference", "select-upload-reference");
    }

    var selectUploadDisposite = document.getElementById("select-upload-disposite");
    var uploadDisposite = selectUploadDisposite.files;
    if (uploadDisposite.length > 0) {
        rsltUpload = callSaveUpload(orderId, "CustOrderDisposite", "select-upload-disposite");
    }

    var selectUploadIdCard = document.getElementById("select-upload-idcard");
    var uploadIdCard = selectUploadIdCard.files;
    if (uploadIdCard.length > 0) {
        rsltUpload = callSaveUpload(orderId, "CustOrderIdCard", "select-upload-idcard");
    }

}
let callSaveUpload = function (orderId = 0, categoryName = "", intputFileName = "") {
    let url = /*(_action == "add") ? */`${app_settings.api_url}/api/Sale/AddUpload?orderId=${orderId}&categoryName=${categoryName}&loginCode=${_userCode}`/* : ``*/;

    var control = document.getElementById(`${intputFileName}`);
    var files = control.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    var returnResult;

    $.ajax({
        url: url,
        type: "POST",
        contentType: false, // Do not set any content header
        //processData: false, // Do not process data
        data: formData,
        async: false,
        //cache: false,
        //contentType: false,
        //contentType: 'image/png',
        processData: false,
        success: function (result) {
            returnResult = result
        },
        error: function (err) {
            console.log(err);
        }
    });

    return returnResult;
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

function callGetProductItemSelect2ByType(obj) {
    let currSeq = $(obj).data('seq');
    let formName = `formApproveCustomerStyle-${currSeq}`;
    let typeId = $(`#${formName} #select-cus-product-type`).val() == "" ? 0 : $(`#${formName} #select-cus-product-type`).val();

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetSelect2ProductItemByTypeId?typeId=${typeId}`,
        success: function (data) {
            renderProductItemSelect2ByType(formName, data);
            //if (_action == "edit") {
            //    renderCustOptions();
            //}
        },
        error: function (err) {
        }
    });
}

function renderProductItemSelect2ByType(formName, data) {
    $(`#${formName} #select-cus-product-items`).empty();
    $(`#${formName} #select-cus-product-items`).append(`<option value="">กรุณาเลือก</option>`);

    if (data.length > 0) {
        data.forEach((v) => {
            $(`#${formName} #select-cus-product-items`).append(`<option value="${v.itemId}" price="${v.itemPrice}" name="${v.itemName}">${v.fullItemPrice}</option>`);
        });

        if (data.itemId != 0) {
            $(`#${formName} #select-cus-product-items`).val(data.itemId).trigger('change');
        }
        else {
            $(`#${formName} #select-cus-product-items`).val('').trigger('change');
        }
    }
}

function setCheckedSpecialHeight(seq) {
    if (parseFloat($(`#formApproveCustomerStyle-${seq} #input-cus-product-height`).val()) >= 2.7) {
        $(`#chkSpecialHeight-${seq}`).prop('checked', true);
    }
    else { $(`#chkSpecialHeight-${seq}`).prop('checked', false); }
}

function printQuotation() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Document/GetQuotaionByOrderId?orderId=${_order_id}`,
        success: function (data) {
            if (data.custOrder != null) {
                generateQuotationDocument(data);
            }
        },
        error: function (err) {
        }
    });
}

async function generateQuotationDocument(data) {
    debugger;
    if (data.custOrder.vat == 0) {
        await renderQuotationNonVatHtml(data);
    }
    else {
        await renderQuotationHtml(data);
    }
}
async function renderQuotationHtml(data) {
    var currDate = new Date();
    var createInvoiceDate = convertDateTimeFormat(currDate, 'DD/MM/YYYY');

    var custFullName = data.cust.custFirstName + ' ' + data.cust.custSurName;

    $('#quotationElement #spnQuotationNumber').html(data.custOrder.quotationNumber);
    $('#quotationElement #spnCreateQuotationDocDate').html(createInvoiceDate);

    $('#quotationElement #lblCusName').html(custFullName);
    $('#quotationElement #lblCusAddress').html(data.cust.custAddress);
    $('#quotationElement #lblCusTel').html(data.cust.custTel);

    var accname = `ชื่อบัญชี ${data.custOrder.accountName} ${data.custOrder.accountNumber}`
    var accbank = `${data.custOrder.bank}`;
    $('#quotationElement #spnAccName').html(accname);
    $('#quotationElement #spnAccBank').html(accbank);

    var item = ''
    var indx = 0;
    data.items.forEach((a) => {
        item += `<tr>
                    <td></td>
                    <td>${a.itemName}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        var style = `Style : ${a.styleName}`
        item += `<tr>
                    <td></td>
                    <td>${style}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        indx = 1;

        data.itemsOptions.forEach((b) => {
            var unitPrice = parseFloat(a.itemPrice) + parseFloat(b.optionsPrice);
            var unitPriceFormat = new Intl.NumberFormat().format(unitPrice);

            var size = `ยาว ${a.orderLength} x ${a.orderHeight} x ${a.orderDepth} m.`
            item += `<tr>
                    <td>${indx}</td>
                    <td>${b.options}</td>
                    <td>${size}</td>
                    <td>${unitPriceFormat}</td>
                    <td>${1}</td>
                    <td>${unitPriceFormat}</td>
                </tr>`;
            indx++;
        });
    });

    var subTotalFormat = new Intl.NumberFormat().format(data.custOrder.subTotal);
    item += `<tr>                       
                        <td rowspan="4" colspan="4" class="text-center" style="vertical-align : middle;font-size:18px;font-weight:bold;">${data.custOrder.grandTotalThaiBath}</td>

                        <td>Sub.Total</td>
                        <td>${subTotalFormat}</td>
                    </tr>`;

    var vatFormat = (data.custOrder.vat == 0) ? "" : new Intl.NumberFormat().format(data.custOrder.vat);
    item += `<tr>                       

                        <td>Vat 7%</td>
                        <td>${vatFormat}</td>
                    </tr>`;

    var discountFormat = new Intl.NumberFormat().format(data.custOrder.discount);
    item += `<tr>                       

                        <td>ส่วนลด</td>
                        <td>${discountFormat}</td>
                    </tr>`;

    var grandTotalFormat = new Intl.NumberFormat().format(data.custOrder.grandTotal);
    item += `<tr>
                        

                        <td>Grand Total%</td>
                        <td>${grandTotalFormat}</td>
                    </tr>`;

    $('#quotation-item-list').empty();
    $('#quotation-item-list').append(item);

    let options = {
        margin: 0.25,
        // pagebreak: { mode: "avoid-all", before: "#page2el" },
        image: { type: "png", quality: 1 },
        html2canvas: { scale: 1, logging: true, dpi: 300, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        filename: `Quotation_${data.custOrder.quotationNumber}`,
    };

    var element = document.getElementById("quotationElement");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}
async function renderQuotationNonVatHtml(data) {
    var currDate = new Date();
    var createInvoiceDate = convertDateTimeFormat(currDate, 'DD/MM/YYYY');

    var custFullName = data.cust.custFirstName + ' ' + data.cust.custSurName;

    $('#quotationNonVatElement #spnQuotationNumber').html(data.custOrder.quotationNumber);
    $('#quotationNonVatElement #spnCreateQuotationDocDate').html(createInvoiceDate);

    $('#quotationNonVatElement #lblCusName').html(custFullName);
    $('#quotationNonVatElement #lblCusAddress').html(data.cust.custAddress);
    $('#quotationNonVatElement #lblCusTel').html(data.cust.custTel);

    var accname = `ชื่อบัญชี ${data.custOrder.accountName} ${data.custOrder.accountNumber}`
    var accbank = `${data.custOrder.bank}`;
    $('#quotationNonVatElement #spnAccName').html(accname);
    $('#quotationNonVatElement #spnAccBank').html(accbank);

    var item = ''
    var indx = 0;
    data.items.forEach((a) => {
        item += `<tr>
                    <td></td>
                    <td>${a.itemName}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        var style = `Style : ${a.styleName}`
        item += `<tr>
                    <td></td>
                    <td>${style}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        indx = 1;

        data.itemsOptions.forEach((b) => {
            var unitPrice = parseFloat(a.itemPrice) + parseFloat(b.optionsPrice);
            var unitPriceFormat = new Intl.NumberFormat().format(unitPrice);

            var size = `ยาว ${a.orderLength} x ${a.orderHeight} x ${a.orderDepth} m.`
            item += `<tr>
                    <td>${indx}</td>
                    <td>${b.options}</td>
                    <td>${size}</td>
                    <td>${unitPriceFormat}</td>
                    <td>${1}</td>
                    <td>${unitPriceFormat}</td>
                </tr>`;
            indx++;
        });
    });

    //if (data.custOrder.orderNotePrice != 0) {
    //    var orderNotePriceFormat = new Intl.NumberFormat().format(data.custOrder.orderNotePrice);
    //    item += `<tr>                       
    //                    <td colspan="4">โน๊ตเพิ่มเติม : ${data.custOrder.orderNote}</td>

    //                    <td></td>
    //                    <td>${orderNotePriceFormat}</td>
    //                </tr>`;
    //}

    var subTotalFormat = new Intl.NumberFormat().format(data.custOrder.subTotal);
    item += `<tr>                       
                        <td rowspan="4" colspan="4" class="text-center" style="vertical-align : middle;font-size:18px;font-weight:bold;">${data.custOrder.grandTotalThaiBath}</td>

                        <td>Sub.Total</td>
                        <td>${subTotalFormat}</td>
                    </tr>`;

    var vatFormat = (data.custOrder.vat == 0) ? "" : new Intl.NumberFormat().format(data.custOrder.vat);
    item += `<tr>                       

                        <td>Vat 7%</td>
                        <td>${vatFormat}</td>
                    </tr>`;

    var discountFormat = new Intl.NumberFormat().format(data.custOrder.discount);
    item += `<tr>                       

                        <td>ส่วนลด</td>
                        <td>${discountFormat}</td>
                    </tr>`;

    var grandTotalFormat = new Intl.NumberFormat().format(data.custOrder.grandTotal);
    item += `<tr>
                        

                        <td>Grand Total%</td>
                        <td>${grandTotalFormat}</td>
                    </tr>`;

    $('#quotationNonVatElement #quotation-item-list').empty();
    $('#quotationNonVatElement #quotation-item-list').append(item);

    let showDisposite = 0;
    if (data.custOrder.grandTotal <= 200000) {
        showDisposite = 5000;
    }
    else if (data.custOrder.grandTotal > 200000 && data.custOrder.grandTotal <= 600000) {
        showDisposite = 10000;
    }
    else if (data.custOrder.grandTotal > 600000 && data.custOrder.grandTotal <= 900000) {
        showDisposite = 20000;
    }
    else if (data.custOrder.grandTotal > 900000) {
        showDisposite = 30000;
    }

    var showDispositeFormat = new Intl.NumberFormat().format(showDisposite);
    $('#quotationNonVatElement #spnFirstPeriod').append("");
    $('#quotationNonVatElement #spnFirstPeriod').append(showDispositeFormat);

    var second = (data.custOrder.grandTotal - parseFloat(showDisposite)) * 0.5;
    var secondFormat = new Intl.NumberFormat().format(second);
    $('#quotationNonVatElement #spnSecondPeriod').append("");
    $('#quotationNonVatElement #spnSecondPeriod').append(secondFormat);

    var third = (data.custOrder.grandTotal - parseFloat(showDisposite) - parseFloat(second)) * 0.4;
    var thirdFormat = new Intl.NumberFormat().format(third);
    $('#quotationNonVatElement #spnThirdPeriod').append("");
    $('#quotationNonVatElement #spnThirdPeriod').append(thirdFormat);

    var four = (data.custOrder.grandTotal - parseFloat(showDisposite) - parseFloat(second) - parseFloat(third));
    var fourFormat = new Intl.NumberFormat().format(four);
    $('#quotationNonVatElement #spnFourPeriod').append("");
    $('#quotationNonVatElement #spnFourPeriod').append(fourFormat);

    let options = {
        margin: 0.25,
        // pagebreak: { mode: "avoid-all", before: "#page2el" },
        image: { type: "png", quality: 1 },
        html2canvas: { scale: 1, logging: true, dpi: 300, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        filename: `Quotation_${data.custOrder.quotationNumber}`,
    };

    var element = document.getElementById("quotationNonVatElement");
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });
}

function calculateSubAndGrandTotal(vatPercentage = 0) {
    let calNote = $('#form-approveCustomerCalculate input[name="input-cal-note-price"]').val() == "" ? 0 : $('#form-approveCustomerCalculate input[name="input-cal-note-price"]').val();
    let calSubTotal = parseFloat(_subTotal) + parseFloat(calNote);
    $('#form-approveCustomerCalculate input[name="input-cal-subTotal"]').val(calSubTotal.toFixed(2));

    let discount = $('#form-approveCustomerCalculate input[name="input-cal-discount"]').val() == "" ? 0 : parseFloat($('#form-approveCustomerCalculate input[name="input-cal-discount"]').val());

    if (vatPercentage == 0) {
        vatPercentage = ($('#form-approveCustomerCalculate #radioVat').prop('checked') == true) ? 0.7 : 0;
    }

    let calVat = parseFloat(calSubTotal) * vatPercentage;
    let showVat = (calVat == 0) ? "" : calVat.toFixed(2);
    $('#form-approveCustomerCalculate input[name="input-cal-vat"]').val(showVat);

    let calGrandTotal = (parseFloat(calSubTotal) - parseFloat(discount)) + parseFloat(calVat);
    _cal_grand_total = calGrandTotal.toFixed(2);
    $('#form-approveCustomerCalculate input[name="input-cal-grandTotal"]').val(calGrandTotal.toFixed(2));

    $('#form-approveCustomerCalculate input[name="input-cal-disposite"]').val('');
    calculateDisposite();
}

function calculateVat(vat_value) {
    let vatPercentage = 0;
    if (vat_value == "vat") {
        vatPercentage = 0.07;
        $('#form-approveCustomerCalculate input[name="input-cal-vat"]').removeAttr('disabled');

    }
    else {
        $('#form-approveCustomerCalculate input[name="input-cal-vat"]').attr('disabled', 'disabled');
        $('#form-approveCustomerCalculate input[name="input-cal-vat"]').val('')
    }
    calculateSubAndGrandTotal(vatPercentage);
}

function calculateDisposite() {
    let showDisposite = 0;
    $('#form-createCalculatePrice input[name="input-cal-disposite"]').val('');
    if (_cal_grand_total <= 200000) {
        showDisposite = 5000;
    }
    else if (_cal_grand_total > 200000 && _cal_grand_total <= 600000) {
        showDisposite = 10000;
    }
    else if (_cal_grand_total > 600000 && _cal_grand_total <= 900000) {
        showDisposite = 20000;
    }
    else if (_cal_grand_total > 900000) {
        showDisposite = 30000;
    }

    $('#form-approveCustomerCalculate input[name="input-cal-disposite"]').val(Math.floor(showDisposite));
}