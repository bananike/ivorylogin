$(document).ready(function () {
    console.log('ready');
    activeInputDeleteBtn();
    deleteInputValue();
    showPassword();

    callAlert({
        title: '테스트용 alert',
        content: '페이지가 열리면 테스트용 alert이 바로 떠버린다',
        btn: '확인',
    });
});

// 001. 인풋 텍스트 제거버튼
function deleteInputValue() {
    $(document).on('click', '.form_input ~ .delete', function () {
        if ($(this).attr('type') !== 'password') {
            $(this).siblings('.form_input').val('');
            $(this).css({
                display: 'none',
                opacity: 0,
            });
        }
    });
}

// 002. 인풋 텍스트 제거버튼 활성화
function activeInputDeleteBtn() {
    $(document).on('keyup', '.form_input', function () {
        var btn = $(this).siblings('.delete');
        if ($(this).val().trim() != '') {
            btn.css({
                display: 'block',
            });
            btn.animate(
                {
                    opacity: 0.7,
                },
                300
            );
        } else {
            btn.css({
                display: 'none',
                opacity: 0,
            });
        }
    });
}

// 003. 비밀번호 보이기
function showPassword() {
    $('.form_input ~ .show_password .show').css('display', 'block');
    $(document).on('click', '.form_input ~ .show_password', function () {
        if ($(this).hasClass('show')) {
            $(this).siblings('.form_input').attr('type', 'text');
            $(this).siblings('.form_input').focus();
            $(this).find('.show').css('display', 'none');
            $(this).find('.hide').css('display', 'block');
            $(this).addClass('hide');
            $(this).removeClass('show');
        } else {
            $(this).siblings('.form_input').attr('type', 'password');
            $(this).find('.show').css('display', 'block');
            $(this).find('.hide').css('display', 'none');
            $(this).addClass('show');
            $(this).removeClass('hide');
        }
    });
}
