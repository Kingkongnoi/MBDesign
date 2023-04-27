$(function () {
    clearInputForm();
    
    renderCreateStyleDiv();

    $('#div-createNewCus .btn-next-cus-style').on('click', function () {
        if (!validateInputFormCustomerData()) { return false; }
    })

    $('.btn-add-style').on('click', function () {
        renderCreateStyleDiv();
    })
});