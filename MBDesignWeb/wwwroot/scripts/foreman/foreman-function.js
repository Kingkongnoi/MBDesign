let _order_id = 0;
let _foreman_id = 0;

var _items = [];
var _items_options = [];
var _items_list_price = [];

let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _all_items_price = 0;
var _items_list = [];

let _cal_grand_total = 0;

let _userId = localStorage.getItem('loginId');
let _userCode = localStorage.getItem('loginCode');
let _userName = localStorage.getItem('loginName');

let _loader = $('<div/>').addClass('loader');

function clearSearchForemanForm() {
    let formId = '#form-search-foreman-queue';

    $(`${formId} #input-search-foreman-quotation-number`).val('');
    $(`${formId} #input-search-foreman-cus-name`).val('');
    $(`${formId} #select-search-foreman-status`).val('').trigger('change');
    $(`${formId} #input-search-foreman-install-date`).val('');
}
function callGetForemanQueueList() {
    let formId = '#form-search-foreman-queue';

    let quotationNumber = ($(`${formId} #input-search-foreman-quotation-number`).val() == '') ? null : $(`${formId} #input-search-foreman-quotation-number`).val();
    let cusName = ($(`${formId} #input-search-foreman-cus-name`).val() == '') ? null : $(`${formId} #input-search-foreman-cus-name`).val();
    let foremanStatus = ($(`${formId} #select-search-foreman-status`).val() == '') ? null : $(`${formId} #select-search-foreman-status`).val();
    let installDate = ($(`${formId} #input-search-foreman-install-date`).val() == '') ? null : $(`${formId} #input-search-foreman-install-date`).val();

    let loaded = $('#tb-foreman-queue-list');

    loaded.prepend(_loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Foreman/GetForemanQueueList?quotationNumber=${quotationNumber}&cusName=${cusName}&foremanStatus=${foremanStatus}&installDate=${installDate}`,
        success: function (data) {
            renderGetForemanQueueList(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderGetForemanQueueList(data) {
    $('#tb-foreman-queue-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bflrtip',
            order : [],
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
                    data: 'installDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.installDate ? convertDateTimeFormat(row.installDate, 'DD/MM/YYYY') : "";
                    },
                },
                {
                    targets: 2,
                    data: 'cusName',
                },
                {
                    targets: 3,
                    data: 'foremanStatus',
                    className: "dt-center",
                },
                {
                    targets: 4,
                    data: 'lastUpdateDate',
                    className: "dt-center",
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.lastUpdateDate ? convertDateTimeFormat(row.lastUpdateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'lastUpdateBy'
                },
                {
                    targets: 6,
                    data: null,
                    orderable: false,
                    className: `dt-center ${_role_foreman_class_display}`,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-foreman" data-orderid="${row.orderId}" data-foremanid="${row.foremanId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetForemanStatusSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Foreman/GetForemanStatusSelect2`,
        success: function (data) {
            renderForemanStatusSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderForemanStatusSelect2(data) {
    let searchFormId = '#form-search-foreman-queue';
    let searchSelect2Id = '#select-search-foreman-status';

    $(`${searchFormId} ${searchSelect2Id}`).empty();
    $(`${searchFormId} ${searchSelect2Id}`).append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $(`${searchFormId} ${searchSelect2Id}`).append(`<option value="${v.foremanStatus}">${v.foremanStatus}</option>`);
    });
    $(`${searchFormId} ${searchSelect2Id}`).val('').trigger('change');

    let editFormId = '#form-editForeman';
    let editSelect2Id = '#select-edit-foreman-status';
    $(`${editFormId} ${editSelect2Id}`).empty();
    $(`${editFormId} ${editSelect2Id}`).append(`<option value="">กรุณาเลือก</option>`);
    data.forEach((v) => {
        $(`${editFormId} ${editSelect2Id}`).append(`<option value="${v.foremanStatus}">${v.foremanStatus}</option>`);
    });
    $(`${editFormId} ${editSelect2Id}`).val('').trigger('change');
}

function clearEditForm() {
    let formId = '#form-editForeman';

    $(`${formId} #input-edit-foreman-contract`).val('');
    $(`${formId} #select-edit-foreman-status`).val('').trigger('change');
    $(`${formId} #input-edit-foreman-quotation`).val('');
}

function callGetEditForeman() {
    var loaded = $('#form-editForeman');

    loaded.prepend(_loader);
    
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Foreman/GetForemanByOrderId?orderId=${_order_id}&foremanId=${_foreman_id}`,
        success: function (data) {
            _items = data.items;
            _items_options = data.itemsOptions;
            renderEditForeman(data);
            loaded.find(_loader).remove();
        },
        error: function (err) {
            loaded.find(_loader).remove();
        }
    });
}
function renderEditForeman(data) {
    let formId = '#form-editForeman';

    $(`${formId} #input-edit-foreman-contract`).val(data.custOrder.contractNumber);
    $(`${formId} #select-edit-foreman-status`).val(data.custOrder.foremanStatus).trigger('change');
    $(`${formId} #input-edit-foreman-quotation`).val(data.custOrder.quotationNumber);

    renderForemanItemList(data);
}
function renderForemanItemList(data) {

    let divId = `#nav-tab-foreman-items`;
    $(divId).empty();

    let headerDiv = ``;

    ///Generate nav bar
    for (var indx = 0; indx < data.items.length; indx++) {
        let setActive = (indx == 0) ? `active` : '';
        headerDiv += `
                    <button class="nav-link ${setActive}" id="nav-foreman-items-${indx + 1}-tab" data-bs-toggle="tab" data-bs-target="#nav-foreman-items-${indx+1}" type="button" role="tab" aria-controls="nav-foreman-items-${indx+1}" aria-selected="true" style="margin-right:2px;">รายการที่ ${indx+1}</button>
                    `;
    }

    headerDiv += `
    <button class="nav-link" id="nav-foreman-cal-tab" data-bs-toggle="tab" data-bs-target="#nav-foreman-cal" type="button" role="tab" aria-controls="nav-foreman-cal" aria-selected="true" style="margin-right:2px;">การคำนวณราคา</button>
    `
    $(divId).append(headerDiv);


    divId = `#nav-tab-foreman-items-tabContent`;
    $(divId).empty();

    let bodyIndx = 0;
    _items_list = [];
    data.items.forEach((v) => {
        let setActive = (bodyIndx == 0) ? `active` : '';
        let insideBodyDiv = '';
        insideBodyDiv  += `<div class="tab-pane fade show ${setActive}" id="nav-foreman-items-${bodyIndx + 1}" role="tabpanel" aria-labelledby="nav-foreman-items-${bodyIndx + 1}-tab">`
        insideBodyDiv += '<div class="container-fluid">';

        let typeName = v.typeName;
        let typePrice = v.typePrice;

        let itemName = typeName + (v.itemName == "" ? "" : ` ${v.itemName}`);
        let itemPrice = parseFloat(typePrice) + (v.itemPrice == "" ? 0 : parseFloat(v.itemPrice));

        let showItem = `${itemName}`
        let showItemPrice = itemPrice;
        var optionsList = data.itemsOptions.filter(x => { return x.custOrderDetailId == v.custOrderDetailId });
        if (optionsList.length > 0) {
            optionsList.forEach((a) => {
                showItem += ` ${a.options}`
                showItemPrice = parseFloat(showItemPrice) + parseFloat(a.optionsPrice);
            })
        }

        insideBodyDiv += `<form id="form-foreman-items-${bodyIndx + 1}">`;
        insideBodyDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label class="col-sm-2 col-form-label text-end">รายการที่ ${bodyIndx + 1}</label>
                        <div class="row col-sm-10">
                            <div class="row">
                                <div class="col-sm-10">
                                    <input class="form-control mb-2" type="text" id="input-foreman-items-${bodyIndx + 1}" name="input-foreman-items-${bodyIndx + 1}" value="${showItem}" disabled />
                                </div>
                                <div class="col-sm-2">
                                    <input class="form-control mb-2" type="number" id="input-foreman-items-price-${bodyIndx + 1}" name="input-foreman-items-price-${bodyIndx + 1}" value="${showItemPrice.toFixed(2)}" disabled />
                                </div>
                            </div>
                        </div>
                    </div>`

        insideBodyDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label for="formFile" class="col-sm-2 col-form-label text-end">รูปภาพ 3D</label>
                                <div class="col-sm-10">
                                    <input id="display-foreman-3d-${bodyIndx + 1}" name="display-foreman-3d[]" type="file" data-itemid=${v.itemId} data-custorderdetailid=${v.custOrderDetailId} class="file" accept="image/*" multiple>
                                </div>
                    </div>`

        insideBodyDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label for="formFile" class="col-sm-2 col-form-label text-end">อัปโหลดรูปหน้างาน</label>
                                <div class="col-sm-10">
                                    <input id="select-upload-foreman-3d-${bodyIndx + 1}" name="select-upload-foreman-3d-${bodyIndx + 1}[]" type="file" data-itemid=${v.itemId} data-custorderdetailid=${v.custOrderDetailId} class="file" accept="image/*" multiple>
                                </div>
                    </div>`

        var itemsSize = data.custOrderDetail.filter((d) => { return d.custOrderDetailId == v.custOrderDetailId });
        let orderLength = "";
        let orderDepth = "";
        let orderHeight = "";
        let checkedSpHeight = '';

        if (itemsSize.length > 0) {
            orderLength = (itemsSize[0].orderLength == 0) ? "" : itemsSize[0].orderLength;
            orderDepth = (itemsSize[0].orderDepth == 0) ? "" : itemsSize[0].orderDepth;
            orderHeight = (itemsSize[0].orderHeight == 0) ? "" : itemsSize[0].orderHeight;
            checkedSpHeight = (orderHeight >= 2.7) ? 'checked' : '';
        }

        insideBodyDiv += `
                    <div class="row col-sm-12">
                            <label class="col-sm-2 col-form-label text-end">ขนาด</label>
                            <div class="row col-sm-10">
                                <div class="col-sm-3">
                                    <label class="col-sm-4 col-form-label">ความยาว</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-length" name="input-cus-product-length" data-itemid=${v.itemId} data-custorderdetailid=${v.custOrderDetailId} value="${orderLength}" />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <label class="col-sm-4 col-form-label">ความลึก</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-depth" name="input-cus-product-depth" data-itemid=${v.itemId} data-custorderdetailid=${v.custOrderDetailId} value="${orderDepth}"  />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <label class="col-sm-4 col-form-label">ความสูง</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-height" name="input-cus-product-height" data-itemid=${v.itemId} data-custorderdetailid=${v.custOrderDetailId} value="${orderHeight}" onblur="callSummarySubTotal(${bodyIndx + 1}, ${v.custOrderDetailId});" onkeydown="callSummarySubTotal(${bodyIndx + 1}, ${v.custOrderDetailId});" />
                                    </div>
                                </div>
                            </div>

                        </div>`

        insideBodyDiv += `
                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-2 col-form-label text-end"></label>
                            <div class="row col-sm-10">
                                 <div class="col-sm-12">
                                    <label class="col-sm-3 col-form-label"></label>
                                        <div class="col-sm-9">
                                             <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" id="chkSpecialHeight-${bodyIndx + 1}" data-itemid=${v.itemId} data-custorderdetailid=${v.custOrderDetailId} disabled ${checkedSpHeight}>
                                                    <label class="form-check-label">
                                                    ความสูงพิเศษ (มากกว่าหรือเท่ากับ 2.70)
                                                    </label>
                                            </div>
                                        </div>
                                </div>
                            </div>
        `;

        insideBodyDiv += ` </form>`;

        insideBodyDiv += '</div>';
        insideBodyDiv += '</div>';


        $(divId).append(insideBodyDiv);


        _items_list.push({
            orderId: data.custOrder.orderId,
            showItem: showItem,
            showItemPrice: showItemPrice.toFixed(2),
            custOrderDetailId: v.custOrderDetailId,
            index: bodyIndx + 1
        });

        render3dApprovedImages(`#form-foreman-items-${bodyIndx + 1} #display-foreman-3d-${bodyIndx + 1}`, data.images3DApproved);
        renderForeman3dApprovedImages(`#form-foreman-items-${bodyIndx + 1} #select-upload-foreman-3d-${bodyIndx + 1}`, v.custOrderDetailId, data.imagesForeman);

        callSummarySubTotal(bodyIndx + 1, v.custOrderDetailId);

        bodyIndx++;
    });

    let calculateDiv = '';
    calculateDiv += `<div class="tab-pane fade show" id="nav-foreman-cal" role="tabpanel" aria-labelledby="nav-foreman-cal-tab">`
    calculateDiv += '<div class="container-fluid">';

    calculateDiv += `<form id="form-foreman-cal">`;

    calculateDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label class="col-sm-2 col-form-label text-end">รายการทั้งหมด</label>
                        <div class="row col-sm-10">
                            <div class="row" id="div-allItems">

                            </div>
                        </div>

                    </div>`;

    calculateDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label class="col-sm-2 col-form-label text-end">โน๊ตเพิ่มเติม</label>
                        <div class="row col-sm-10">
                            <div class="row">
                                <div class="col-sm-10">
                                    <input class="form-control mb-2" type="text" id="input-foreman-note" name="input-foreman-note" value=${data.custOrder.orderNote} />
                                </div>
                                <div class="col-sm-2">
                                    <input class="form-control mb-2" type="number" id="input-foreman-note-price" name="input-foreman-note-price" onblur="calculateSubAndGrandTotal();" onkeydown="calculateSubAndGrandTotal();" value=${data.custOrder.orderNotePrice.toFixed(2)} />
                                </div>
                            </div>
                        </div>
                    </div>`;

    let allItems = '';
    let lastIndx = 0;
    let foremanSubTotal = 0;

    _items_list.forEach((b) => {
        allItems += `<div class="col-sm-10">
                                    <input class="form-control mb-2" type="text" id="input-foreman-items-${lastIndx + 1}" name="input-foreman-items-${lastIndx + 1}" value="${b.showItem}" disabled />
                                </div>
                                <div class="col-sm-2">
                                    <input class="form-control mb-2" type="number" id="input-foreman-items-price-${lastIndx + 1}" name="input-foreman-items-price-${lastIndx + 1}" value="${b.showItemPrice}" disabled />
                     </div>`

        foremanSubTotal = parseFloat(foremanSubTotal) + parseFloat(b.showItemPrice);

        lastIndx++;
    });
    foremanSubTotal = parseFloat(foremanSubTotal) + parseFloat(data.custOrder.orderNotePrice);

    calculateDiv += `
                    <div class="row col-sm-12 mb-2">
                        <label class="col-sm-4 col-form-label text-end">ราคารวม (Sub. Total) <span class="text-danger">*</span></label>
                        <div class="row col-sm-8">
                            <div class="row">
                                <div class="col-sm-4">
                                    <input class="form-control mb-2" type="number" id="input-foreman-subTotal" name="input-foreman-subTotal" value="${foremanSubTotal.toFixed(2)}"  disabled />
                                </div>
                                <label class="col-sm-2 col-form-label">บาท</label>
                            </div>
                        </div>
                    </div>`;

    let discount = (data.custOrder.discount == 0) ? '' : data.custOrder.discount.toFixed(2);
    calculateDiv += `
                    <div class="row col-sm-12 mb-2">
                        <label class="col-sm-4 col-form-label text-end">ส่วนลดท้ายบิล</label>
                        <div class="row col-sm-8">
                            <div class="row">
                                <div class="col-sm-4">
                                    <input class="form-control mb-2" type="number" id="input-foreman-cal-discount" name="input-foreman-cal-discount" onblur="calculateSubAndGrandTotal();" onkeydown="calculateSubAndGrandTotal();" value="${discount}" disabled/>
                                </div>
                                <label class="col-sm-2 col-form-label">บาท</label>
                            </div>
                        </div>
                    </div>`;

    let vatChecked = (data.custOrder.vat == 0) ? '' : 'checked';
    let nonvatChecked = (data.custOrder.vat == 0) ? 'checked' : '';
    let vatPrice = (data.custOrder.vat == 0) ? '' : data.custOrder.vat.toFixed(2);
    calculateDiv += `
                     <div class="row col-sm-12 mb-2">
                        <div class="col-sm-4 text-end">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="radioVatType" id="radioForemanVat" onchange="calculateForemanVat('vat');" value="vat" ${vatChecked} disabled>
                                <label class="form-check-label">VAT 7%</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="radioVatType" id="radioForemanNonVat" onchange="calculateForemanVat('nonvat');" value="nonvat" ${nonvatChecked} disabled>
                                <label class="form-check-label">Non VAT</label>
                            </div>
                        </div>
                        <div class="row col-sm-8">
                            <div class="row">
                                <div class="col-sm-4">
                                    <input class="form-control mb-2" type="number" id="input-foreman-cal-vat" name="input-foreman-cal-vat" value="${vatPrice}" disabled />
                                </div>
                                <label class="col-sm-2 col-form-label">บาท</label>
                            </div>
                        </div>
                    </div>`;

    _cal_grand_total = data.custOrder.grandTotal.toFixed(2);

    calculateDiv += `
                        <div class="row col-sm-12 mb-2">
                        <label class="col-sm-4 col-form-label text-end">ราคารวมทั้งหมด (Grand Total)<span class="text-danger">*</span></label>
                        <div class="row col-sm-8">
                            <div class="row">
                                <div class="col-sm-4">
                                    <input class="form-control mb-2" type="number" id="input-foreman-cal-grandTotal" name="input-foreman-cal-grandTotal" value="${data.custOrder.grandTotal.toFixed(2)}" disabled />
                                </div>
                                <label class="col-sm-2 col-form-label">บาท</label>
                            </div>
                        </div>
                    </div>
        `;

    calculateDiv += `<div class="row col-sm-12 mb-2">
                        <div class="col-sm-4 text-end">
                            <button type="button" class="btn btn-default-custom btn-cal-deposit-amount" onclick="calculateForemanDisposite();"><img src="/images/calculator.png" width="25px" /> กดคำนวณยอดเก็บเงินงวด 2</button>
                        </div>
                        <div class="row col-sm-8">
                            <div class="row">
                                <div class="col-sm-4">
                                    <input class="form-control mb-2" type="number" id="input-foreman-cal-disposite" name="input-foreman-cal-disposite" value="" disabled/>
                                </div>
                                <label class="col-sm-2 col-form-label">บาท</label>
                            </div>
                        </div>
                    </div>`;

    calculateDiv += `<div class="row col-sm-12 mb-2">
                        <label class="col-sm-4 col-form-label text-end">บัญชีรับเงิน</label>
                        <div class="col-sm-8" id="displayForemanAccountDetail">
                            <span>${data.custOrder.bank}</br></span>
                            <span>ชื่อบัญชี ${data.custOrder.accountName}</br></span>
                            <span>เลขบัญชี ${data.custOrder.accountNumber}</br></span>
                        </div>
                    </div>`;

    calculateDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label for="formFile" class="col-sm-4 col-form-label text-end">อัพโหลดรูปสลิปเก็บเงินงวด 2</label>
                                <div class="col-sm-8">
                                    <input id="select-upload-foreman-disposite" name="select-upload-foreman-disposite[]" type="file" class="file" accept="image/*">
                                </div>
                    </div>`
        ;

    calculateDiv += ` </form>`;

    calculateDiv += '</div>';
    calculateDiv += '</div>';

    $(divId).append(calculateDiv);

    $('#div-allItems').append(allItems);
   
    renderDispositeSecondUpload(`#form-foreman-cal #select-upload-foreman-disposite`, data.imageSecondDisposite);

    if (data.imageSecondDisposite != null || data.imageSecondDisposite != undefined) {
        calculateForemanDisposite();
    }
}

let _vatPercentage = 0;
function calculateForemanVat(vat_value) {
    if (vat_value == "vat") {
        _vatPercentage = 0.07;
        $('#form-foreman-cal input[name="input-foreman-cal-vat"]').removeAttr('disabled');
    }
    else {
        _vatPercentage = 0;
        $('#form-foreman-cal input[name="input-foreman-cal-vat"]').attr('disabled', 'disabled');
        $('#form-foreman-cal input[name="input-foreman-cal-vat"]').val('')
    }
    calculateSubAndGrandTotal();
}
function calculateSubAndGrandTotal() {
    let totalItemsPrice = 0;
    _items_list.forEach((b) => { totalItemsPrice = parseFloat(totalItemsPrice) + parseFloat(b.showItemPrice) });

    let calNote = $('#form-foreman-cal input[name="input-foreman-note-price"]').val() == "" ? 0 : $('#form-foreman-cal input[name="input-foreman-note-price"]').val();
    let subTotal = parseFloat(totalItemsPrice) + parseFloat(calNote);
    $('#form-foreman-cal input[name="input-foreman-subTotal"]').val(subTotal.toFixed(2));

    let calVat = parseFloat(subTotal) * _vatPercentage;
    let showVat = (calVat == 0) ? "" : calVat.toFixed(2);
    $('#form-foreman-cal input[name="input-foreman-cal-vat"]').val(showVat);

    let discount = $('#form-foreman-cal #input-foreman-cal-discount').val() == "" ? 0 : parseFloat($('#form-foreman-cal #input-foreman-cal-discount').val());

    let calGrandTotal = (parseFloat(subTotal) - parseFloat(discount)) + parseFloat(calVat);
    _cal_grand_total = calGrandTotal.toFixed(2);
    $('#form-foreman-cal input[name="input-foreman-cal-grandTotal"]').val(calGrandTotal.toFixed(2));
    $('#form-foreman-cal input[name="input-foreman-cal-disposite"]').val('');
}
function render3dApprovedImages(formId, data) {
    var lstUrl = [];
    var lstPreviewImg = [];
    if (data.length > 0) {
        data.forEach((a) => {
            lstUrl.push(`${a.url}`);

            var addPreview = {
                caption: a.fileName,
                //width: '120px',
                //url: '/localhost/public/delete',
                key: a.uploadId,
                extra: { id: a.uploadId },
            };

            lstPreviewImg.push(addPreview);
        });
    }

    $(`${formId}`).fileinput('destroy');
    if (data.length > 0) {
        $(`${formId}`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: false,
            showUpload: false,
            showCaption: false,
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
        $(`${formId}`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: false,
            browseOnZoneClick: false,
            showCaption: false,
            showUpload: false,
        });
    }
}
function renderForeman3dApprovedImages(formId, orderDetailId, data) {
    var images = data.filter(v => { return v.orderDetailId == orderDetailId });

    var lstUrl = [];
    var lstPreviewImg = [];
    if (images.length > 0) {
        images.forEach((a) => {
            lstUrl.push(`${a.url}`);

            var addPreview = {
                caption: a.fileName,
                //width: '120px',
                //url: '/localhost/public/delete',
                key: a.uploadId,
                extra: { id: a.uploadId },
            };

            lstPreviewImg.push(addPreview);
        });
    }

    $(`${formId}`).fileinput('destroy');
    if (images.length > 0) {
        $(`${formId}`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: false,
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
        $(`${formId}`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            showCaption: true,
            showUpload: false,
        });
    }
}
function renderDispositeSecondUpload(formId, data) {
    var lstUrl = [];
    var lstPreviewImg = [];
    if (data != null) {
        //data.forEach((a) => {
        lstUrl.push(`${data.url}`);

            var addPreview = {
                caption: data.fileName,
                //width: '120px',
                //url: '/localhost/public/delete',
                key: data.uploadId,
                extra: { id: data.uploadId },
            };

            lstPreviewImg.push(addPreview);
        //});
    }

    $(`${formId}`).fileinput('destroy');
    if (data != null) {
        $(`${formId}`).fileinput({
            //uploadUrl: "Home/UploadFiles", // this is your home controller method url
            showBrowse: true,
            showUpload: false,
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
        $(`${formId}`).fileinput({
            uploadUrl: "Home/UploadFiles", // this is your home controller method url
            //maxFileCount: 1,
            showBrowse: true,
            browseOnZoneClick: true,
            showCaption: true,
            showUpload: false,
        });
    }
}
function callSaveForeman() {
    if (!validateInputForeman()) return;

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
            DoSaveForeman();
        }
    });
}
function DoSaveForeman() {
    $('#modal-editForeman .btn-modal-save-foreman').addLoading();
    ///Save items
    let resultUpdate = true;
    _items_list.forEach((v) => {
        var control = document.getElementById(`select-upload-foreman-3d-${v.index}`);
        var files = control.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
        }

        let length = $(`#form-foreman-items-${v.index} #input-cus-product-length`).val() == "" ? 0 : $(`#form-foreman-items-${v.index} #input-cus-product-length`).val();
        let depth = $(`#form-foreman-items-${v.index} #input-cus-product-depth`).val() == "" ? 0 : $(`#form-foreman-items-${v.index} #input-cus-product-depth`).val();
        let height = $(`#form-foreman-items-${v.index} #input-cus-product-height`).val() == "" ? 0 : $(`#form-foreman-items-${v.index} #input-cus-product-height`).val();
        //let chkSpecialHeight = $(`#form-foreman-items-${v.index} #chkSpecialHeight-${v.index}`).prop('checked');

        let url = `${app_settings.api_url}/api/Foreman/DoUpdateForemanItems?orderId=${v.orderId}&custOrderDetailId=${v.custOrderDetailId}&length=${length}&depth=${depth}&height=${height}&loginCode=${_userCode}`;

        $.ajax({
            url: url,
            type: "POST",
            contentType: false, // Do not set any content header
            processData: false, // Do not process data
            data: formData,
            async: false,
            success: function (result) {
                if (result == true) {
                    console.log(result);
                }
            },
            error: function (err) {
                resultUpdate = false;
            }
        });
    });

    swal.close();

    var control = document.getElementById(`select-upload-foreman-disposite`);
    var files = control.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    if (files.length > 0) {
        let formId = '#form-foreman-cal';

        let orderNote = $(`${formId} #input-foreman-note`).val() == "" ? null : $(`${formId} #input-foreman-note`).val();
        let orderNotePrice = $(`${formId} #input-foreman-note-price`).val() == "" ? 0 : $(`${formId} #input-foreman-note-price`).val();
        let subTotal = $(`${formId} #input-foreman-subTotal`).val() == "" ? 0 : $(`${formId} #input-foreman-subTotal`).val();
        let discount = $(`${formId} #input-foreman-cal-discount`).val() == "" ? 0 : $(`${formId} #input-foreman-cal-discount`).val();
        let vat = $(`${formId} #input-foreman-cal-vat`).val() == "" ? 0 : $(`${formId} #input-foreman-cal-vat`).val();
        let grandTotal = $(`${formId} #input-foreman-cal-grandTotal`).val() == "" ? 0 : $(`${formId} #input-foreman-cal-grandTotal`).val();
        let disposite = $(`${formId} #input-foreman-cal-disposite`).val() == "" ? 0 : $(`${formId} #input-foreman-cal-disposite`).val();

        let url = `${app_settings.api_url}/api/Foreman/DoUpdateForeman?orderId=${_order_id}&orderNote=${orderNote}&orderNotePrice=${orderNotePrice}&subTotal=${subTotal}
        &discount=${discount}&vat=${vat}&grandTotal=${grandTotal}&disposite=${disposite}&loginCode=${_userCode}`;

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
                    $(`#modal-editForeman`).modal('hide');
                    callGetForemanQueueList();
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    if (resultUpdate) {
        callSuccessAlert();
        $('#modal-editForeman .btn-modal-save-foreman').removeLoading();
        $(`#modal-editForeman`).modal('hide');
        callGetForemanQueueList();
    }
}
function calculateForemanDisposite() {
    let showDisposite = _cal_grand_total * 0.5;
    $('#form-foreman-cal input[name="input-foreman-cal-disposite"]').val('');
    /*if (_cal_grand_total <= 200000) {
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
    */
    $('#form-foreman-cal input[name="input-foreman-cal-disposite"]').val(Math.floor(showDisposite));
}
let validateInputForeman = function () {
    if ($('#form-foreman-cal input[name="input-foreman-cal-disposite"]').val() == "" || $('#form-foreman-cal input[name="input-foreman-cal-disposite"]').val() == "0") {
        Swal.fire({
            text: "กรุณากดคำนวณยอดมัดจำงวด 2",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-foreman-cal input[name="input-foreman-cal-disposite"]').focus();
        });
        return false;
    }
    else {
        return true;
    }
};
function callSummarySubTotal(indx, custOrderDetailId) {
    var items = _items_list.filter((c) => { return c.custOrderDetailId == custOrderDetailId });

    var itemsPrice = 0;
    if (items.length > 0) {
        itemsPrice = items[0].showItemPrice;
    }

    let calSpHeight = 0;
    let calSpHeightPercentage = 0;
    let showItemPrice = 0;

    let height = $(`#form-foreman-items-${indx} #input-cus-product-height`).val() == "" ? 0 : $(`#form-foreman-items-${indx} #input-cus-product-height`).val();
    if (parseFloat(height) >= 2.7) {
        $(`#form-foreman-items-${indx} #chkSpecialHeight-${indx}`).prop('checked', true);
        calSpHeightPercentage = ((100 / 2.60 * parseFloat(height)) - 100)/100;
        calSpHeight = Math.ceil((parseFloat(itemsPrice) + parseFloat(calSpHeightPercentage)) + parseFloat(itemsPrice));
        showItemPrice = calSpHeight.toFixed(2);
    }
    else {
        $(`#form-foreman-items-${indx} #chkSpecialHeight-${indx}`).prop('checked', false);
        showItemPrice = (parseFloat(itemsPrice).toFixed(2));
    }

    //showItemPrice = (parseFloat(itemsPrice) + parseFloat(calSpHeight)).toFixed(2);
    items[0].showItemPrice = showItemPrice;
    $(`#form-foreman-cal #input-foreman-items-price-${indx}`).val(showItemPrice);

    calculateSubAndGrandTotal();
}