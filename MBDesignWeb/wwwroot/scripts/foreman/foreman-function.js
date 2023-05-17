function clearSearchForemanForm() {
    let formId = '#form-search-foreman-queue';

    $(`${formId} #input-search-foreman-quotation-number`).val('');
    $(`${formId} #input-search-foreman-cus-name`).val('');
    $(`${formId} #select-search-foreman-status`).val('').trigger('change');
    $(`${formId} #input-search-foreman-install-date`).val('');
}
function callGetForemanQueueList() {
    let formId = '#form-search-foreman-queue';

    let quotationNumber = ($(`${formId} #input-search-foreman-quotation-number`).val() == '') ? "%%" : $(`${formId} #input-search-foreman-quotation-number`).val();
    let cusName = ($(`${formId} #input-search-foreman-cus-name`).val() == '') ? "%%" : $(`${formId} #input-search-foreman-cus-name`).val();
    let foremanStatus = ($(`${formId} #select-search-foreman-status`).val() == '') ? "%%" : $(`${formId} #select-search-foreman-status`).val();
    let installDate = ($(`${formId} #input-search-foreman-install-date`).val() == '') ? "%%" : $(`${formId} #input-search-foreman-install-date`).val();

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
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-foreman" data-orderid="${row.orderId}"  title="แก้ไข">
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
    $(`${editFormId} ${editSelect2Id}`).append(`<option value="">ทั้งหมด</option>`);
    data.forEach((v) => {
        $(`${editFormId} ${editSelect2Id}`).append(`<option value="${v.foremanStatus}">${v.foremanStatus}</option>`);
    });
    $(`${editFormId} ${editSelect2Id}`).val('').trigger('change');
}

function clearEditForm() {
    let formId = '#form-editDesign3D';

    $(`${formId} #input-edit-3d-quotation`).val('');
    $(`${formId} #select-edit-3d-designName`).val('').trigger('change');
    $(`${formId} #input-edit-3d-install-date`).val('');
    $(`${formId} #input-edit-3d-due-date`).val('');
    $(`${formId} #input-edit-3d-checklist-status`).val('');
}

function callGetEditForemanByOrderId(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Sale/GetQuotationDetailByOrderId?orderId=${id}`,
        success: function (data) {
            _items = data.items;
            _items_options = data.itemsOptions;
            renderCustQuotation(data);
            renderCustStyleDiv(data);
            renderCustCalPrice(data);
        },
        error: function (err) {
            //loaded.find(loader).remove();
        }
    });
}
function renderForemanItemList(data) {
    data.items.forEach((v) => {

        let newSeq = $('div[name="seqCreateStyle"]').length == 0 ? 1 : $('div[name="seqCreateStyle"]').length + 1;
        let removeBtn = newSeq > 1 ? `<div class="col-sm-6 text-end">
                                    <button type="button" class="btn btn-primary" data-seq="${newSeq}" onclick="removeRenderStyleWithSeq(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </div>` : ``;
        let renderDiv = `<div id="divCreateStyle-${newSeq}" style="border:solid 0.025rem;" name="seqCreateStyle">
        <div class="card-header bg-primary text-light">
            <div class="row col-sm-12">
                <div class="col-sm-6 mt-2"><h6>ชิ้นงานที่ ${newSeq}</h6></div>
                ${removeBtn}
            </div>
        </div>
        <div class="card-body">
            <form id="formCreateStyle-${newSeq}">
                <div class="row d-sm-flex">

                    <div class="col-sm-6">
                        <div class="row col-sm-12 mb-2">
                            <label class="col-sm-3 col-form-label text-end">เลือกสไตล์<span class="text-danger">*</span></label>
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
                            <label class="col-sm-3 col-form-label text-end">เลือก Items<span class="text-danger">*</span></label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-items" onchange="callGetProductItemOptions(this);" data-seq="${newSeq}">
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
                            <label class="col-sm-3 col-form-label text-end">เลือกหมวดหมู่<span class="text-danger">*</span></label>
                            <div class="col-sm-9">
                                <select class="form-select" id="select-cus-product-type" data-seq="${newSeq}">
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
                            <label class="col-sm-3 col-form-label">ความยาว</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-length" name="input-cus-product-length" data-seq="${newSeq}" />
                                </div>
                        </div>
                        <div class="col-sm-4">
                                <label class="col-sm-3 col-form-label">ความลึก</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-depth" name="input-cus-product-depth" data-seq="${newSeq}" />
                                </div>
                        </div>
                        <div class="col-sm-4">
                          <label class="col-sm-3 col-form-label">ความสูง</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="input-cus-product-height" name="input-cus-product-height" data-seq="${newSeq}" />
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
                                            <input class="form-check-input" type="checkbox" value="" id="chkSpecialHeight-${newSeq}">
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

        $('#divCreateStyle').append(renderDiv)

        ///Render input form
        let formName = `formCreateStyle-${newSeq}`;
        callGetStyleSelect2(formName);
        callGetProductTypeSelect2(formName);
        callGetProductItemSelect2(formName);
    });
}
function renderCustStyle() {
    let seq = 1;
    _items.forEach((v) => {
        $(`#formCreateStyle-${seq} #select-cus-product-style`).val(v.styleId).trigger('change');
        $(`#formCreateStyle-${seq} input[name="input-cus-product-zone"]`).val(v.zone);
        $(`#formCreateStyle-${seq} #select-cus-product-items`).val(v.itemId).trigger('change');
        $(`#formCreateStyle-${seq} input[name="input-cus-product-floor"]`).val(v.floor);
        $(`#formCreateStyle-${seq} #select-cus-product-type`).val(v.typeId).trigger('change');
        let orderLength = (v.orderLength == 0) ? "" : v.orderLength;
        $(`#formCreateStyle-${seq} #input-cus-product-length`).val(orderLength);
        let orderDepth = (v.orderDepth == 0) ? "" : v.orderDepth;
        $(`#formCreateStyle-${seq} #input-cus-product-depth`).val(orderDepth);
        let orderHeight = (v.orderHeight == 0) ? "" : v.orderHeight;
        $(`#formCreateStyle-${seq} #input-cus-product-height`).val(orderHeight);
        if (v.orderHeight >= 2.70) {
            $(`#formCreateStyle-${seq} #chkSpecialHeight-${seq}`).prop('checked', true);
        } else {
            $(`#formCreateStyle-${seq} #chkSpecialHeight-${seq}`).prop('checked', false);

        }

        seq++;
    });

}