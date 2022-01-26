$(document).ready(function () {
    console.log('ready');
    activeInputDeleteBtn();
    deleteInputValue();
});

// 인풋 텍스트 제거버튼
function deleteInputValue() {
    $('.form_input').on('focus', function () {
        if ($(this).attr('type') !== 'password') {
        }
    });
}

// 인풋 텍스트 제거버튼 활성화
function activeInputDeleteBtn() {
    $('.form_input').on('keyup', function () {
        console.log($(this).val());
        if ($(this).val().trim() != '' || $(this).val().trim() != undefined) {
            console.log('입력중');
        } else {
            console.log('아무것도아님');
        }
    });
}
