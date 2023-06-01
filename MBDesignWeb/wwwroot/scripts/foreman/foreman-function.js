﻿let _order_id = 0;
let _foreman_id = 0;

var _items = [];
var _items_options = [];
var _items_list_price = [];

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

    //let loaded = $('#tb-quotation-list');

    //loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Foreman/GetForemanQueueList?quotationNumber=${quotationNumber}&cusName=${cusName}&foremanStatus=${foremanStatus}&installDate=${installDate}`,
        success: function (data) {
            renderGetForemanQueueList(data);
            //loaded.find(loader).remove();
        },
        error: function (err) {
            //loaded.find(loader).remove();
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
                },
                {
                    targets: 4,
                    data: 'lastUpdateDate',
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
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Foreman/GetForemanByOrderId?orderId=${_order_id}&foremanId=${_foreman_id}`,
        success: function (data) {
            _items = data.items;
            _items_options = data.itemsOptions;
            renderEditForeman(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
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
    console.log(data.items);
    console.log(data.itemsOptions);
    let divId = `#divForemanItems`;
    let headerDiv = `<nav>
                    <div class="nav nav-tabs" id="nav-tab-foreman-items" role ="tablist">`;

    ///Generate nav bar
    for (var indx = 0; indx < data.items.length; indx++) {
        let setActive = (indx == 0) ? `active` : '';
        headerDiv += `
                    <button class="nav-link ${setActive}" id="nav-foreman-items-${indx + 1}-tab" data-bs-toggle="tab" data-bs-target="#nav-foreman-items-${indx+1}" type="button" role="tab" aria-controls="nav-foreman-items-${indx+1}" aria-selected="true" style="margin-right:2px;">รายการที่ ${indx+1}</button>
                    `;
    }

    headerDiv += `
    <button class="nav-link" id="nav-foreman-cal-tab" data-bs-toggle="tab" data-bs-target="#nav-foreman-cal" type="button" role="tab" aria-controls="nav-foreman-cal" aria-selected="true" style="margin-right:2px;">การคำนวณราคา</button>
    </div>
    </nav>`

    $(divId).append(headerDiv);

    $(divId).append('<div class="tab-content" id="nav-tab-foreman-items-tabContent">');

    let bodyIndx = 0;
    data.items.forEach((v) => {
        let setActive = (bodyIndx == 0) ? `active` : '';
        let insideBodyDiv = '';
        insideBodyDiv  += `<div class="tab-pane fade show ${setActive}" id="nav-foreman-items-${bodyIndx + 1}" role="tabpanel" aria-labelledby="nav-foreman-items-${bodyIndx + 1}-tab">`
        insideBodyDiv += '<div class="container-fluid">';

        insideBodyDiv += `<form id="form-foreman-items-${bodyIndx + 1}">`;
        insideBodyDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label class="col-sm-2 col-form-label text-end">รายการที่ ${bodyIndx + 1}</label>
                        <div class="row col-sm-10">
                            <div class="row">
                                <div class="col-sm-10">
                                    <input class="form-control mb-2" type="text" id="input-foreman-items-${bodyIndx + 1}" name="input-foreman-items-${bodyIndx + 1}" />
                                </div>
                                <div class="col-sm-2">
                                    <input class="form-control mb-2" type="number" id="input-foreman-items-price-${bodyIndx + 1}" name="input-foreman-items-price-${bodyIndx + 1}" />
                                </div>
                            </div>
                        </div>
                    </div>`

        insideBodyDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label for="formFile" class="col-sm-2 col-form-label text-end">รูปภาพ 3D</label>
                                <div class="col-sm-10">
                                    <input id="display-foreman-3d" name="display-foreman-3d[]" type="file" data-itemid=${v.itemId} class="file" accept="image/*" multiple>
                                </div>
                    </div>`

        insideBodyDiv += `
                    <div class="row col-sm-12 mt-4 mb-2">
                        <label for="formFile" class="col-sm-2 col-form-label text-end">อัปโหลดรูปหน้างาน</label>
                                <div class="col-sm-10">
                                    <input id="select-upload-foreman-3d" name="select-upload-foreman-3d[]" type="file" data-itemid=${v.itemId} class="file" accept="image/*" multiple>
                                </div>
                    </div>`

        insideBodyDiv += `
                    <div class="row col-sm-12">
                            <label class="col-sm-2 col-form-label text-end">ขนาด</label>
                            <div class="row col-sm-10">
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความยาว</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-length" name="input-cus-product-length" data-itemid=${v.itemId} />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความลึก</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-depth" name="input-cus-product-depth" data-itemid=${v.itemId} />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label class="col-sm-4 col-form-label">ความสูง</label>
                                    <div class="col-sm-12">
                                        <input class="form-control" type="number" id="input-cus-product-height" name="input-cus-product-height" data-itemid=${v.itemId} />
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
                                                    <input class="form-check-input" type="checkbox" value="" id="chkSpecialHeight-${bodyIndx+1}">
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

        bodyIndx++;

        $(divId).append(insideBodyDiv);

        //let intitnalPicture = '<script>';

        //intitnalPicture += '</script>';

        //$(divId).append(intitnalPicture);
    });

    let calculateDiv = '';
    calculateDiv += `<div class="tab-pane fade show" id="nav-foreman-cal" role="tabpanel" aria-labelledby="nav-foreman-cal-tab">`
    calculateDiv += '<div class="container-fluid">';

    //calculateDiv += `<form id="form-foreman-cal">`;

    //calculateDiv += `
    //                <div class="row col-sm-12 mt-4 mb-2">
    //                    <label class="col-sm-2 col-form-label text-end">รายการที่ ${bodyIndx + 1}</label>
    //                    <div class="row col-sm-10">
    //                        <div class="row">
    //                            <div class="col-sm-10">
    //                                <input class="form-control mb-2" type="text" id="input-foreman-items-${bodyIndx + 1}" name="input-foreman-items-${bodyIndx + 1}" />
    //                            </div>
    //                            <div class="col-sm-2">
    //                                <input class="form-control mb-2" type="number" id="input-foreman-items-price-${bodyIndx + 1}" name="input-foreman-items-price-${bodyIndx + 1}" />
    //                            </div>
    //                        </div>
    //                    </div>
    //                </div>`;

    //calculateDiv += `
    //                <div class="row col-sm-12 mt-4 mb-2">
    //                    <label class="col-sm-2 col-form-label text-end">โน๊ตเพิ่มเติม</label>
    //                    <div class="row col-sm-10">
    //                        <div class="row">
    //                            <div class="col-sm-10">
    //                                <input class="form-control mb-2" type="text" id="input-foreman-note" name="input-foreman-note" />
    //                            </div>
    //                            <div class="col-sm-2">
    //                                <input class="form-control mb-2" type="number" id="input-foreman-note-price" name="input-foreman-note-price" />
    //                            </div>
    //                        </div>
    //                    </div>
    //                </div>`;

    //calculateDiv += `
    //                <div class="row col-sm-12 mb-2">
    //                    <label class="col-sm-3 col-form-label text-end">ราคารวม (Sub. Total) <span class="text-danger">*</span></label>
    //                    <div class="row col-sm-9">
    //                        <div class="row">
    //                            <div class="col-sm-4">
    //                                <input class="form-control mb-2" type="number" id="input-foreman-cal-subTotal" name="input-foreman-subTotal" disabled />
    //                            </div>
    //                            <label class="col-sm-2 col-form-label">บาท</label>
    //                        </div>
    //                    </div>
    //                </div>`;

    //calculateDiv += `
    //                <div class="row col-sm-12 mb-2">
    //                    <label class="col-sm-3 col-form-label text-end">ส่วนลดท้ายบิล</label>
    //                    <div class="row col-sm-9">
    //                        <div class="row">
    //                            <div class="col-sm-4">
    //                                <input class="form-control mb-2" type="number" id="input-foreman-cal-discount" name="input-foreman-cal-discount" />
    //                            </div>
    //                            <label class="col-sm-2 col-form-label">บาท</label>
    //                        </div>
    //                    </div>
    //                </div>`;

    //calculateDiv += `
    //                 <div class="row col-sm-12 mb-2">
    //                    <div class="col-sm-3 text-end">
    //                        <div class="form-check form-check-inline">
    //                            <input class="form-check-input" type="radio" name="radioVatType" id="radioForemanVat" onchange="calculateForemanVat('vat');" value="vat">
    //                            <label class="form-check-label">VAT 7%</label>
    //                        </div>
    //                        <div class="form-check form-check-inline">
    //                            <input class="form-check-input" type="radio" name="radioVatType" id="radioForemanNonVat" onchange="calculateForemanVat('nonvat');" value="nonvat" checked>
    //                            <label class="form-check-label">Non VAT</label>
    //                        </div>
    //                    </div>
    //                    <div class="row col-sm-9">
    //                        <div class="row">
    //                            <div class="col-sm-4">
    //                                <input class="form-control mb-2" type="number" id="input-foreman-cal-vat" name="input-foreman-cal-vat" disabled />
    //                            </div>
    //                            <label class="col-sm-2 col-form-label">บาท</label>
    //                        </div>
    //                    </div>
    //                </div>`;

    //calculateDiv += `
    //                    <div class="row col-sm-12 mb-2">
    //                    <label class="col-sm-3 col-form-label text-end">ราคารวมทั้งหมด (Grand Total) <span class="text-danger">*</span></label>
    //                    <div class="row col-sm-9">
    //                        <div class="row">
    //                            <div class="col-sm-4">
    //                                <input class="form-control mb-2" type="number" id="input-foreman-cal-grandTotal" name="input-foreman-cal-grandTotal" disabled />
    //                            </div>
    //                            <label class="col-sm-2 col-form-label">บาท</label>
    //                        </div>
    //                    </div>
    //                </div>
    //    `;

    //calculateDiv += `<div class="row col-sm-12 mb-2">
    //                    <div class="col-sm-3 text-end">
    //                        <button type="button" class="btn btn-primary btn-cal-deposit-amount"><i class="fa-solid fa-calculator" aria-hidden="true"></i> กดคำนวณยอดเก็บเงินงวด 2</button>
    //                    </div>
    //                    <div class="row col-sm-9">
    //                        <div class="row">
    //                            <div class="col-sm-4">
    //                                <input class="form-control mb-2" type="number" id="input-foreman-cal-disposite" name="input-foreman-cal-disposite" disabled/>
    //                            </div>
    //                            <label class="col-sm-2 col-form-label">บาท</label>
    //                        </div>
    //                    </div>
    //                </div>`;

    //calculateDiv += `<div class="row col-sm-12 mb-2">
    //                    <label class="col-sm-3 col-form-label text-end"></label>
    //                    <div class="col-sm-9" id="displayForemanAccountDetail">
    //                    </div>
    //                </div>`;

    //calculateDiv += `
    //                <div class="row col-sm-12 mt-4 mb-2">
    //                    <label for="formFile" class="col-sm-2 col-form-label text-end">อัพโหลดรูปสลิปเก็บเงินงวด 2</label>
    //                            <div class="col-sm-10">
    //                                <input id="select-upload-foreman-disposite" name="select-upload-foreman-disposite[]" type="file" class="file" accept="image/*" multiple>
    //                            </div>
    //                </div>`
        ;

    calculateDiv += ` </form>`;

    calculateDiv += '</div>';
    calculateDiv += '</div>';

    $(divId).append(calculateDiv);

    //bodyDiv = '</div>';

    $(divId).append('</div>');
}
function callCalculateItemOptions() {
    let render = "";
    _subTotal = 0;

    $('#divCalculatePrice #divCalItemOptions').empty();
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
                        <div class="col-sm-2">
                            <input class="form-control mb-2" type="text" id="input-cal-itemPrice" name="input-cal-itemPrice" value="${showItemPrice}" disabled/>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary btn-circle-xs mb-2" title="ลบ" data-seq=${v.divSeq} data-divid=${v.divId} onclick="removeRenderStyleWithSeq(this)"><i class="fa fa-minus"></i></button>
                        </div>
                        </div>`

        _subTotal = parseFloat(_subTotal) + parseFloat(itemPrice) + parseFloat(calSpHeight);

    });

    $('#divCalculatePrice #divCalItemOptions').append(render);

    calculateSubAndGrandTotal();
}
let calculateSpecialHeight = function () {
    let calSpHeight = 0;
    let calSpHeightPercentage = 0;

    if (v.spHeight) {
        calSpHeightPercentage = (100 / 2.60 * v.orderHeight) - 100;
    }
    calSpHeight = parseFloat(itemPrice) + parseFloat(calSpHeightPercentage);
}
function calculateForemanVat(vat_value) {
    let vatPercentage = 0;
    if (vat_value == "vat") {
        vatPercentage = 0.07;
        $('#form-foreman-cal input[name="input-foreman-cal-vat"]').removeAttr('disabled');

    }
    else {
        $('#form-foreman-cal input[name="input-foreman-cal-vat"]').attr('disabled', 'disabled');
        $('#form-foreman-cal input[name="input-foreman-cal-vat"]').val('')
    }
    //calculateSubAndGrandTotal(vatPercentage);
}
function calculateSubAndGrandTotal(vatPercentage = 0) {
    let calNote = $('#form-foreman-cal input[name="input-cal-note-price"]').val() == "" ? 0 : $('#form-foreman-cal input[name="input-cal-note-price"]').val();
    let calSubTotal = parseFloat(_subTotal) + parseFloat(calNote);
    $('#form-foreman-cal input[name="input-cal-subTotal"]').val(calSubTotal.toFixed(2));

    let discount = $('#form-foreman-cal input[name="input-cal-discount"]').val() == "" ? 0 : parseFloat($('#form-foreman-cal input[name="input-cal-discount"]').val());

    let calVat = parseFloat(calSubTotal) * vatPercentage;
    let showVat = (calVat == 0) ? "" : calVat.toFixed(2);
    $('#form-foreman-cal input[name="input-cal-vat"]').val(showVat);

    let calGrandTotal = (parseFloat(calSubTotal) - parseFloat(discount)) + parseFloat(calVat);
    _cal_grand_total = calGrandTotal.toFixed(2);
    $('#form-foreman-cal input[name="input-foreman-cal-grandTotal"]').val(calGrandTotal.toFixed(2));

    $('#form-foreman-cal input[name="input-cal-disposite"]').val('');
}