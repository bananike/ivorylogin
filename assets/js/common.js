$(document).ready(function () {
    activeInputBtn();
    deleteInputValue();
    showPassword();
    proposalEmail();
    agreeCheckbox();
    onReadyPopup();

    // test 인증중복 모달
    onCheckDuplication();

    // test alert
    // callAlert({
    //     title: '테스트용 alert',
    //     content: '페이지가 열리면 테스트용 alert이 바로 떠버린다',
    //     btn: '확인',
    // });
    // test error message
    onErrorMessage({
        message: '에러메세지는 input의 "error" 클래스 제거로 초기화',
        target: '#registId',
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

// 002. 인풋 텍스트 버튼 활성화
function activeInputBtn() {
    $(document).on('keyup', '.form_input', function () {
        var btn = $(this).siblings('.input_icon');
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

// 004. 이메일 리스트 추천
function proposalEmail() {
    // 입력 또는 포커스일때 이메일 리스트 보이기
    $(document).on('keyup focus', '#registId', function () {
        var emailValue = $(this).val();
        var emailList = $('#emailList');
        if (
            emailValue.indexOf('@') > 0 &&
            emailValue.indexOf('@') + 1 >= emailValue.length
        ) {
            for (var i = 0; emailList.length > i; i++) {
                var item = $(emailList[i]).find('li');
                item.find('.input_value').html($(this).val());
            }
            emailList.css('display', 'block');
            emailList.animate(
                {
                    height: 185,
                },
                300
            );
        } else {
            emailList.animate(
                {
                    height: 0,
                },
                300
            );
            setTimeout(function () {
                emailList.css('display', 'none');
            }, 300);
        }
    });

    // 이메일 리스트 클릭 시 인풋에 적용
    $(document).on('click', '#emailList li', function () {
        var target = $('#registId');
        var targetValue = target.val();
        var emailList = $('#emailList');
        target.val(targetValue + $(this).find('.email_address').html());

        emailList.animate(
            {
                height: 0,
            },
            300
        );
        setTimeout(function () {
            emailList.css('display', 'none');
        }, 300);
    });

    // 인풋 포커스 아웃일때 리스트 끄기
    $(document).on('blur', '#registId', function () {
        var emailList = $('#emailList');
        emailList.animate(
            {
                height: 0,
            },
            300
        );
        setTimeout(function () {
            emailList.css('display', 'none');
        }, 300);
    });
}

// 005. 동의버튼
function agreeCheckbox() {
    var agreeList = $('#agreeList');
    var btnAuthentication = $('#btnAuthentication');

    // 전체동의
    $(document).on('change', '#agreeBulk', function () {
        if ($(this).is(':checked')) {
            agreeList.find('input:checkbox').each(function () {
                this.checked = true;
            });
            btnAuthentication.attr('disabled', false);
        } else {
            agreeList.find('input:checkbox').each(function () {
                this.checked = false;
            });
            btnAuthentication.attr('disabled', true);
        }
    });

    // 필수동의 인증버튼 활성화
    $(document).on(
        'change',
        '#agreeService, #agreePrivicy, #agreeTotal',
        function () {
            checkBtnAuthentication();
        }
    );
}

// 007. 인증버튼 활성화
function checkBtnAuthentication() {
    var btnAuthentication = $('#btnAuthentication');
    if (
        $('#agreeService').prop('checked') &&
        $('#agreePrivicy').prop('checked') &&
        $('#agreeTotal').prop('checked')
    ) {
        btnAuthentication.attr('disabled', false);
    } else {
        btnAuthentication.attr('disabled', true);
    }
}

// 008. 발리데이션 메세지
function onErrorMessage({ message, target }) {
    var errorMessage = '<p>' + message + '</p>';
    var errorBox = $(target).siblings('.error_message');

    errorBox.html('');
    errorBox.append(errorMessage);
    $(target).addClass('error');

    // error message는 인풋의 error 클래스 제거로 초기화
}

// 009. 약관 팝업
function onReadyPopup() {
    $(document).on('click', '#agreeList > li > a', function (e) {
        e.preventDefault();
        var value = {
            title: '',
            value: '',
            target: '',
        };
        var target = $(this).attr('data-popup');
        switch (target) {
            case 'agreeService':
                value.title = '서비스 이용약관';
                value.text = '약관내용 들어갈자리';
                value.target = target;
                break;
            case 'agreePrivicy':
                value.title = '개인정보 처리방침';
                value.text = '약관내용 들어갈자리';
                value.target = target;
                break;
            case 'agreeTotal':
                value.title = '통합회원가입 약관';
                value.text = '약관내용 들어갈자리';
                value.target = target;
                break;
            case 'agreeInfo':
                value.title = '선택정보수집';
                value.text = '약관내용 들어갈자리';
                value.target = target;
                break;
            case 'agreePrivicy2':
                value.title = '개인정보처리방침';
                value.text = '약관내용 들어갈자리';
                value.target = target;
                break;
        }
        callPopup(value);
    });
}

// 010. 본인인증 모달팝업
function onCheckDuplication() {
    var modal = $('#authDuplication');
    var body = $('body');
    modal.css('display', 'flex');
    body.addClass('modal_on');
    closeCheckDuplication();
}

// 011. 본인인증 모달 닫기
function closeCheckDuplication() {
    var modal = $('#authDuplication');
    var body = $('body');
    $(document).on('click', '#authDuplication .result_close', function () {
        modal.addClass('closing');
        setTimeout(function () {
            modal.css('display', 'none');
            modal.removeClass('closing');
            body.removeClass('modal_on');
        }, 300);
    });
}
