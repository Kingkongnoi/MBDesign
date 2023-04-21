$(function () {
    callAllBankSelect2();
    callSelect2AccountType('#form-search-bankAccount #select-search-account-type', true);
    callSelect2AccountType('#form-createAccount #select-account-type', true);
    callSelect2Status('#form-createAccount #select-account-status');
    callSelect2Status('#form-search-bankAccount #select-search-account-status', true);
    callGetAccountList();

    $('.btn-add-account').on('click', function () {
        _action = 'add';
        $(`#modal-createAccount #accountHeader`).text('เพิ่มข้อมูลบัญชี');
        $('#modal-createAccount').modal('show');
    });

    $(document).on('click', '.btn-edit-account', function () {
        $(`#modal-createAccount #accountHeader`).text('แก้ไขข้อมูลบัญชี');
        $(`#modal-createAccount`).modal('show');
        _action = 'edit';
        _id = $(this).data('id');
        callGetAccountById($(this).data('id'));
    });

    $(`#modal-createAccount`).on('show.bs.modal', function () {
        clearForm();
        callSelect2Status('#form-createAccount #select-account-status');
    });

    $('.btn-modal-save-account').on('click', function () {
        DoAddOrUpdateAccount();
    });

    $('#form-search-bankAccount .btn-search-account').on('click', function () {
        callGetAccountList();
    });

    $('#form-search-bankAccount .btn-clear-search-account').on('click', function () {
        clearSearchForm();
        callGetAccountList();
    });

    $('#tb-account-list').on('click', 'td.account-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewAccount`).modal('show');
        _action = 'view';
        clearForm();
        callGetAccountById(id);
    });

});

let loader = $('<div/>').addClass('loader');

let _modal_primary_color_code = "#F09723";
let _modal_default_color_code = "#EFEFEF";

let _action = 'add';
let _id = 0;

function callSelect2Status(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    }
    $(id).append(`<option value="1">ใช้งาน</option>`);
    $(id).append(`<option value="0">ไม่ใช้งาน</option>`);
}
function clearSearchForm() {
    $('#form-search-bankAccount #select-search-bank-name').val('').trigger('change');
    $('#form-search-bankAccount #input-search-account-name').val('');
    $('#form-search-bankAccount #input-search-account-number').val('');
    $('#form-search-bankAccount #select-search-account-type').val('').trigger('change');
    $('#form-search-bankAccount #select-search-account-status').val('').trigger('change');
}
function clearForm() {
    $('#form-createAccount #select-bank-name').val('').trigger('change');
    $('#form-createAccount input[name="input-account-name"]').val('');
    $('#form-createAccount #select-account-status').val(0).trigger('change');
    $('#form-createAccount #select-account-type').val('').trigger('change');
    $('#form-createAccount input[name="input-account-number"]').val('');
}
let validateInput = function () {
    if ($('#form-createAccount #select-bank-name').val() == "") {
        Swal.fire({
            text: "กรุณาเลือกชื่อธนาคาร",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createAccount #select-bank-name').focus();
        });
        return false;
    }
    else if ($('#form-createAccount #select-account-type').val() == "") {
        Swal.fire({
            text: "กรุณาเลือกรูปแบบบัญชี",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createAccount #select-account-type').focus();
        });
        return false;
    }
    else if ($('#form-createAccount #select-product-type').val() == "") {
        Swal.fire({
            text: "กรุณาเลือกชื่อหมวดหมู่",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createAccount #select-product-type').focus();
        });
        return false;
    }
    else if ($('#form-createAccount #input-account-name').val() == "") {
        Swal.fire({
            text: "กรุณากรอกชื่อบัญชี",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createAccount #input-account-name').focus();
        });
        return false;
    }
    else if ($('#form-createAccount #input-account-number').val() == "") {
        Swal.fire({
            text: "กรุณากรอกเลขบัญชี",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: _modal_primary_color_code,
            //cancelButtonColor: _modal_default_color_code,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            $('#form-createAccount #input-account-number').focus();
        });
        return false;
    }
    else { return true; }
};
function callAllBankSelect2() {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/BankAccount/GetAllBank`,
        success: function (data) {
            renderAllBankSelect2(data);
        },
        error: function (err) {
        }
    });
}
function renderAllBankSelect2(data) {
    $(`#form-createAccount #select-bank-name`).empty();
    $(`#form-createAccount #select-bank-name`).append(`<option value="">กรุณาเลือก</option>`);

    $(`#form-search-bankAccount #select-search-bank-name`).empty();
    $(`#form-search-bankAccount #select-search-bank-name`).append(`<option value="">ทั้งหมด</option>`);

    data.forEach((v) => {
        $(`#form-createAccount #select-bank-name`).append(`<option value="${v.bank}">${v.bank}</option>`);
        $(`#form-search-bankAccount #select-search-bank-name`).append(`<option value="${v.bank}">${v.bank}</option>`);
    });
    $(`#form-createAccount #select-bank-name`).val('').trigger('change')
    $(`#form-search-bankAccount #select-search-bank-name`).val('').trigger('change')
}
function callSelect2AccountType(id, isSearch = false) {
    $(id).empty();
    if (isSearch) {
        $(id).append(`<option value="">ทั้งหมด</option>`);
    } else { $(id).append(`<option value="">กรุณาเลือก</option>`); }

    $(id).append(`<option value="บัญชีนามบริษัท">บัญชีนามบริษัท</option>`);
    $(id).append(`<option value="บัญชีส่วนบุคคล">บัญชีส่วนบุคคล</option>`);
}
function DoAddOrUpdateAccount() {
    if (!validateInput()) return;

    Swal.fire({
        title: 'คุณต้องการบันทึกข้อมูลหรือไม่?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: `ยกเลิก`,
        confirmButtonColor: _modal_primary_color_code,
        //cancelButtonColor: _modal_default_color_code,
    }).then((result) => {
        if (result.isConfirmed) {
            callAddOrUpdateAccount(_action);
        }
    });
}
function callAddOrUpdateAccount() {
    let url = (_action == 'add') ? `${app_settings.api_url}/api/BankAccount/AddBankAccount` : `${app_settings.api_url}/api/BankAccount/UpdateBankAccount`;

    var obj = {
        accountId: _id,
        bank: $('#form-createAccount #select-bank-name').val(),
        accountNumber: $('#form-createAccount #input-account-number').val(),
        accountName: $('#form-createAccount #input-account-name').val(),
        accountType: $('#form-createAccount #select-account-type').val(),
        status: ($('#form-createAccount #select-account-status').val() == "1") ? true : false
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(obj),
        success: (res) => {
            if (res.result) {
                callSuccessAlert();
                $(`#modal-createAccount`).modal('hide');
                callGetAccountList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "รูปแบบ" + $('#form-createAccount #select-account-type').val() + "ถูกใช้งานอยู่",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        
                    });
                }
            }
        },
        error: () => {
        }
    });

}
function callGetAccountList() {

    let bank = ($('#form-search-bankAccount #select-search-bank-name').val() == '' || $('#form-search-bankAccount #select-search-bank-name').val() == undefined) ? "%%" : $('#form-search-bankAccount #select-search-bank-name').val();
    let accountName = ($('#form-search-bankAccount #input-search-account-name').val() == '') ? '%%' : $('#form-search-bankAccount #input-search-account-name').val();
    let accountNumber = ($('#form-search-bankAccount #input-search-account-number').val() == '') ? '%%' : $('#form-search-bankAccount #input-search-account-number').val();
    let accountType = ($('#form-search-bankAccount #select-search-account-type').val() == '' || $('#form-search-bankAccount #select-search-account-type').val() == undefined) ? "%%" : $('#form-search-bankAccount #select-search-account-type').val();
    let status = ($('#form-search-bankAccount #select-search-account-status').val() == '') ? '%%' : $('#form-search-bankAccount #select-search-account-status').val();

    let loaded = $('#tb-account-list');

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/BankAccount/GetBankAccountList?bank=${bank}&accountName=${accountName}&accountNumber=${accountNumber}&accountType=${accountType}&status=${status}`,
        success: function (data) {
            renderGetAccountList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
        }
    });
}
function renderGetAccountList(data) {
    $('#tb-account-list').DataTable(
        {
            destroy: true,
            responsive: true,
            searching: false,
            data: data,
            dom: 'Bfrtip',
            oLanguage: {
                oPaginate: {
                    sPrevious: "«",
                    sNext: "»",
                }
            },
            createdRow: function (row, data) {
                $(row).attr('data-id', data.accountId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'bank',
                    className: "account-details",
                },
                {
                    targets: 1,
                    data: 'accountName',
                },
                {
                    targets: 2,
                    data: 'accountNumber',
                },
                {
                    targets: 3,
                    data: 'countUsage',
                    render: function (data, type, row) {
                        return (row.status) ? row.countUsage : "";
                    },
                },
                {
                    targets: 4,
                    data: 'accountType',
                },
                {
                    targets: 5,
                    data: 'createDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 6,
                    data: 'createBy'
                },
                {
                    targets: 7,
                    data: 'updateDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 8,
                    data: 'updateBy'
                },
                {
                    targets: 9,
                    data: 'status',
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 10,
                    data: null,
                    orderable: false,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-account" data-id="${row.accountId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetAccountById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/BankAccount/GetByBankAccountId?accountId=${id}`,
        success: function (data) {
            renderAccountForm(data);
        },
        error: function (err) {

        }
    });
}
function renderAccountForm(data) {
    let status = (data.status) ? 1 : 0;
    $('#form-createAccount #select-bank-name').val(data.bank).trigger('change');
    $('#form-createAccount input[name="input-account-name"]').val(data.accountName);
    $('#form-createAccount #select-account-status').val(status).trigger('change');
    $('#form-createAccount #select-account-type').val(data.accountType).trigger('change');
    $('#form-createAccount input[name="input-account-number"]').val(data.accountNumber);
}
function callSuccessAlert() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
        showConfirmButton: false,
        timer: 1500
    });
}