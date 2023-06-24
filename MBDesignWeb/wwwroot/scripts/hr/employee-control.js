$(function () {
    callSelect2HolidayDay(false);
    callSelect2HolidayDay(true);
    callSelect2SearchHolidayYear();

    callSelect2Status('#form-createHoliday #select-holiday-status');
    callSelect2Status('#form-search-holiday #select-search-holiday-status', true);

    callSelect2Status('#form-createDepartment #select-department-status');
    callSelect2Status('#form-search-department #select-search-department-status', true);

    callSelect2Status('#form-createPosition #select-position-status');
    callSelect2Status('#form-search-position #select-search-position-status', true);

    callSelect2Status('#form-createEmployee #select-emp-status');
    callSelect2Status('#form-search-employee #select-search-emp-status', true);

    callSelect2Status('#form-createRole #select-role-status');
    callSelect2Status('#form-search-role #select-search-role-status', true);

    callSelect2EmpDepartment();
    callSelect2EmpPosition();
    callSelect2EmpSalaryType();
    callSelect2EmpRole();

    callGetEmployeeList();

    /* Begin Employee */
    $('#nav-master-empData .btn-add-employee').on('click', function () {
        _emp_action = 'add'
        clearForm('modal-createEmployee');
        //generateEmpId();
        renderEmployeeSignature("");
        $(`#modal-createEmployee #empHeader`).text('เพิ่มพนักงาน');
        $('#modal-createEmployee').modal('show');

    });

    $(document).on('click', '.btn-edit-employee', function () {
        _emp_action = 'edit';
        _empId = $(this).data('id');
        clearForm('modal-createEmployee');
        callGetEmployeeById($(this).data('id'));
        $(`#modal-createEmployee #empHeader`).text('แก้ไขข้อมูลพนักงาน');
        $(`#modal-createEmployee`).modal('show');
    });

    $(`#modal-createEmployee`).on('show.bs.modal', function () {
        clearForm("modal-createEmployee");
        //if (_emp_action == 'add') { generateEmpId(); }
    });

    $('.btn-modal-save-emp').on('click', function () {
        DoAddOrUpdateEmployee("modal-createEmployee");
    });

    $('#form-search-employee .btn-clear-search-emp-data').on('click', function () {
        clearSearchForm("employee");
        callGetEmployeeList();
    });

    $('#form-search-employee .btn-search-emp-data').on('click', function () {
        callGetEmployeeList();
    });

    $('#tb-employee-list').on('click', 'td.emp-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewEmployee`).modal('show');
        _emp_action = 'view';
        clearForm('modal-viewEmployee');
        callGetEmployeeById(id);
    });
    /* End Employee */

    /* Begin Role */
    $('#nav-master-role .btn-add-role').on('click', function () {
        _role_action = 'add'
        $(`#modal-createRole #roleHeader`).text('เพิ่มบทบาท');
        $('#modal-createRole').modal('show');
        callGetLastestRoleId();
        callGetMenuList(0);
    });

    $(document).on('click', '.btn-edit-role', function () {
        $(`#modal-createRole #roleHeader`).text('แก้ไขข้อมูลบทบาท');
        $(`#modal-createRole`).modal('show');
        _role_action = 'edit';
        clearForm('modal-createRole');
        callGetRoleById($(this).data('id'));
    });

    $(`#modal-createRole`).on('show.bs.modal', function () {
        clearForm("modal-createRole");
        if (_role_action == 'add') { callGetLastestRoleId(); }
    });

    $('.btn-modal-save-role').on('click', function () {
        DoAddOrUpdateRole("modal-createRole");
    });

    $('#form-search-role .btn-clear-search-role').on('click', function () {
        clearSearchForm("role");
        callGetRoleList();
    });

    $('#form-search-role .btn-search-role').on('click', function () {
        callGetRoleList();
    });

    $('#tb-role-list').on('click', 'td.role-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewRole`).modal('show');
        _role_action = 'view';
        clearForm('modal-createRole');
        callGetRoleById(id);
    });

    $('#tb-menu-list tbody').on('change', 'input[type="checkbox"]', function () {
        //console.log($(this));
        let chkId = $(this).attr('id');

        //let chkName = chkId.split('-')[0];
        let menuId = chkId.split('-')[1];

        let chkValue = $(this).val();

        let chkMenuName = $(this).attr('menuname');
        let chkParentMenu = $(this).attr('parentmenu');

        if (chkValue == "all") {
            $(`#chkAdd-${menuId}`).prop('checked', false);
            $(`#chkEdit-${menuId}`).prop('checked', false);
            $(`#chkApprove-${menuId}`).prop('checked', false);
            $(`#chkView-${menuId}`).prop('checked', false);
        }
        else {
            if ($(`#chkAll-${menuId}`).prop('checked') == true) {
                $(`#chkAll-${menuId}`).prop('checked', false);
            }
        }

        if (chkMenuName == 'ทั้งหมด') {
            $(`#tb-menu-list tbody input[type="checkbox"]`).each(function () {
                if ($(this).attr('menuname') != chkMenuName && $(this).attr('parentmenu') == chkParentMenu) {
                    $(this).prop('checked', false);
                }
            });
        }
        else {
            $(`#tb-menu-list tbody input[type="checkbox"]`).each(function () {
                if ($(this).attr('menuname') == 'ทั้งหมด' && $(this).attr('parentmenu') == chkParentMenu) {
                    $(this).prop('checked', false);
                }
            });
        }
    });
    /* End Role */

    /* Begin Holiday */
    $('#nav-master-holiday .btn-add-holiday').on('click', function () {
        _holiday_action = 'add';
        $(`#${_modal_holiday_name} #holidayHeader`).text('เพิ่มวันหยุด');
        clearForm('modal-createHoliday')
        $(`#${_modal_holiday_name}`).modal('show');
    });

    $(document).on('click', '.btn-edit-holiday', function () {
        $(`#${_modal_holiday_name} #holidayHeader`).text('แก้ไขวันหยุด');
        $(`#${_modal_holiday_name}`).modal('show');
        _holiday_action = 'edit';
        callGetHolidayById($(this).data('id'));
    });

    $(`#${_modal_holiday_name}`).on('show.bs.modal', function () {
        clearForm(_modal_holiday_name);
        if (_holiday_action == 'add') { callGetLastestHolidayId(); }
    });

    $('.btn-modal-save-holiday').on('click', function () {
        DoAddOrUpdateHoliday(_modal_holiday_name);
    });

    $('#form-search-holiday .btn-search-holiday').on('click', function () {
        callGetHolidayList();
    });

    $('#form-search-holiday .btn-clear-search-holiday').on('click', function () {
        clearSearchForm("holiday");
        callGetHolidayList();
    });

    $('#tb-holiday-list').on('click', 'td.holiday-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewHoliday`).modal('show');
        _holiday_action = 'view';
        clearForm(_modal_holiday_name);
        callGetHolidayById(id);
    });
    /* End Holiday */

    /* Begin Department */
    $('#nav-master-department .btn-add-department').on('click', function () {
        _department_action = 'add';
        $(`#${_modal_department_name} #departmentHeader`).text('เพิ่มแผนก');
        $(`#${_modal_department_name}`).modal('show');
    });

    $(document).on('click', '.btn-edit-department', function () {
        $(`#${_modal_department_name} #departmentHeader`).text('แก้ไขแผนก');
        $(`#${_modal_department_name}`).modal('show');
        _department_action = 'edit';
        callGetDepartmentById($(this).data('id'));
    });

    $(`#${_modal_department_name}`).on('show.bs.modal', function () {
        clearForm(_modal_department_name);
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
        callGetDepartmentList();
    });

    $('#tb-department-list').on('click', 'td.department-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewDepartment`).modal('show');
        _department_action = 'view';
        clearForm(_modal_department_name);
        callGetDepartmentById(id);
    });
    /* End Department */

    /* Begin Position */
    $('#nav-master-position .btn-add-position').on('click', function () {
        _position_action = 'add';
        $(`#${_modal_position_name} #positionHeader`).text('เพิ่มตำแหน่ง');
        $(`#${_modal_position_name}`).modal('show');
    });

    $(document).on('click', '.btn-edit-position', function () {
        $(`#${_modal_position_name} #positionHeader`).text('แก้ไขตำแหน่ง');
        $(`#${_modal_position_name}`).modal('show');
        _position_action = 'edit';

        callGetPositionById($(this).data('id'));
    });

    $(`#${_modal_position_name}`).on('show.bs.modal', function () {
        clearForm(_modal_position_name);
        if (_position_action == 'add') { callGetLastestPositionId(); }
    });

    $('.btn-modal-save-position').on('click', function () {
        DoAddOrUpdatePosition(_modal_position_name);
    });

    $('#form-search-position .btn-search-position').on('click', function () {
        callGetPositionList();
    });

    $('#form-search-position .btn-clear-search-position').on('click', function () {
        clearSearchForm("position");
        callGetPositionList();
    });

    $('#tb-position-list').on('click', 'td.position-details', function () {
        var tr = $(this).closest('tr');

        var id = tr.data('id');
        $(`#modal-viewPosition`).modal('show');
        _position_action = 'view';
        clearForm(_modal_department_name);
        callGetPositionById(id);
    });
    /* End Position */

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).data("bs-target") // activated tab
        if (target == "#nav-master-empData") {
            clearSearchForm("employee");
            callSelect2EmpRole();
            callSelect2EmpPosition();
            callSelect2EmpDepartment();
            callGetEmployeeList();
        }
        else if (target == "#nav-master-role") {
            clearSearchForm("role");
            callGetRoleList();
        }
        else if (target == "#nav-master-holiday") {
            clearSearchForm("holiday");
            callGetHolidayList();
        }
        else if (target == "#nav-master-department") {
            clearSearchForm("department");
            callGetDepartmentList();
        }
        else if (target == "#nav-master-position") {
            clearSearchForm("position");
            callGetPositionList();
        }
        else if (target == "#nav-master-productData") {
            clearSearchForm("item");
            callProductTypeSelect2('#form-createProduct #select-product-type', 'กรุณาเลือก')
            callProductTypeSelect2('#form-search-product #select-search-product-type', 'ทั้งหมด');
            callGetItemList();
        }
        else if (target == "#nav-master-productType") {
            clearSearchForm("type");
            callGetTypeList();
        }
        else if (target == "#nav-master-productStyle") {
            clearSearchForm("style");
            callGetStyleList();
        }
    });
});