$(function () {
    $('#nav-master-productData .btn-add-product').on('click', function () {
        $('#modal-createProduct').modal('show');
    });

    $('#nav-master-productCategory .btn-add-category').on('click', function () {
        $('#modal-createCategory').modal('show');
    });

    $('#nav-master-productStyle .btn-add-style').on('click', function () {
        $('#modal-createStyle').modal('show');
    });

    /* Begin ProductStyle */
    $('#nav-master-productStyle .btn-add-product').on('click', function () {
        _product_style_action = 'add';
        $(`#modal-createStyle #styleHeader`).text('เพิ่มสไตล์');
        $(`#modal-createStyle`).modal('show');
    });

    $(document).on('click', '.btn-edit-department', function () {
        $(`#modal-createStyle #styleHeader`).text('แก้ไขสไตล์');
        $(`#modal-createStyle`).modal('show');
        _product_style_action = 'edit';
        callSelect2Status('#form-createDepartment #select-department-status');
        callGetDepartmentById($(this).data('id'));
    });

    $(`#${_modal_department_name}`).on('show.bs.modal', function () {
        clearForm(_modal_department_name);
        callSelect2Status('#form-createDepartment #select-department-status');
        if (_department_action == 'add') { callGetLastestDepartmentId(); }
    });

    $('.btn-modal-save-department').on('click', function () {
        DoAddOrUpdateDepartment(_modal_department_name);
    });

    $('#form-search-department .btn-search-department').on('click', function () {
        callGetDepartmentList();
    });

    $('#form-search-department .btn-clear-search-department').on('click', function () {
        clearSearchForm("department");
        callSelect2Status('#form-search-department #select-search-department-status', true);
        callGetDepartmentList();
    });

    $('#tb-department-list').on('click', 'td.department-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewDepartment`).modal('show');
        _department_action = 'view';
        clearForm(_modal_department_name);
        callSelect2Status('#form-createDepartment #select-department-status');
        callGetDepartmentById(id);
    });
    /* End ProductStyle */
});

let _product_style_action = 'add';

/* ProductStyle */
function DoAddOrUpdateDepartment(modal) {
    if (!validateInput(modal)) return;

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
            callAddOrUpdateDepartment(_department_action);
        }
    });
}
function callAddOrUpdateDepartment() {
    let url = (_department_action == 'add') ? `${app_settings.api_url}/api/Employee/AddDepartment` : `${app_settings.api_url}/api/Employee/UpdateDepartment`;

    var obj = {
        departmentId: $('#input-department-code').val(),
        departmentName: $('#input-department-name').val(),
        status: ($('#form-createDepartment #select-department-status').val() == "1") ? true : false
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
                $(`#${_modal_department_name}`).modal('hide');
                callGetDepartmentList();
            }
            else {
                if (res.resultStatus == 'duplicate') {
                    Swal.fire({
                        text: "ชื่อแผนกมีอยู่แล้ว กรุณากรอกชื่อแผนกอีกครั้ง",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: _modal_primary_color_code,
                        //cancelButtonColor: _modal_default_color_code,
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        $('#form-createDepartment #input-department-name').focus();
                    });
                }
            }
        },
        error: () => {
        }
    });

}
function callGetLastestDepartmentId() {
    let url = `${app_settings.api_url}/api/Employee/GetLastestDepartmentId`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (res) => {
            $('#form-createDepartment input[name="input-department-code"]').val(res.departmentId);
        },
        error: () => {
        }
    });
}
function callGetDepartmentList() {
    let departmentName = ($('#form-search-department #input-search-department').val() == '') ? "%%" : $('#form-search-department #input-search-department').val();
    let status = ($('#form-search-department #select-search-department-status').val() == '') ? "%%" : $('#form-search-department #select-search-department-status').val();

    let loaded = $('#tb-department-list');

    loaded.prepend(loader);

    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetDepartmentList?departmentName=${departmentName}&status=${status}`,
        success: function (data) {
            renderGetDepartmentList(data);
            loaded.find(loader).remove();
        },
        error: function (err) {
            loaded.find(loader).remove();
        }
    });
}
function renderGetDepartmentList(data) {
    $('#tb-department-list').DataTable(
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
                $(row).attr('data-id', data.departmentId);
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'departmentId',
                    className: "department-details",
                },
                {
                    targets: 1,
                    data: 'departmentName',
                },
                {
                    targets: 2,
                    data: 'createDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.createDate ? convertDateTimeFormat(row.createDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 3,
                    data: 'createBy'
                },
                {
                    targets: 4,
                    data: 'updateDate',
                    render: function (data, type, row) {
                        return type === 'sort' ? data : row.updateDate ? convertDateTimeFormat(row.updateDate, 'DD/MM/YYYY HH:mm') : "";
                    },
                },
                {
                    targets: 5,
                    data: 'updateBy'
                },
                {
                    targets: 6,
                    data: 'status',
                    render: function (data, type, row) {
                        return row.status == "1" ? "ใช้งาน" : "ไม่ใช้งาน";
                    },
                },
                {
                    targets: 7,
                    data: null,
                    orderable: false,
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-primary btn-circle-xs btn-edit-department" data-id="${row.departmentId}"  title="แก้ไข">
                    <i class="fa fa-edit"></i></button>`;
                    },
                },
            ],
        }
    );
}
function callGetDepartmentById(id) {
    $.ajax({
        type: 'GET',
        url: `${app_settings.api_url}/api/Employee/GetDepartmentByDepartmentId?departmentId=${id}`,
        success: function (data) {
            renderDepartmentForm(data);
        },
        error: function (err) {

        }
    });
}
function renderDepartmentForm(data) {
    let status = (data.status) ? 1 : 0;
    $('#form-createDepartment input[name="input-department-code"]').val(data.departmentId);
    $('#form-createDepartment input[name="input-department-name"]').val(data.departmentName);
    $('#form-createDepartment #select-department-status').val(status).trigger('change');
}
/* ProductStyle */