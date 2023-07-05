
export function formProcessing() {
    const count = document.querySelector('.s-payment__count')
    const textarea = document.querySelector('textarea')
    const btnCard = document.querySelector('.js-card')
    const cardItems = document.querySelectorAll('.js-block-hide')

    $('.js-form input').on('keyup', function () {
        let empty = false;

        $('.js-form input').each(function () {
            empty = $(this).val().length == 0;
        });

        if (empty)
            $('.js-form-submit').attr('disabled', 'disabled');
        else
            $('.js-form-submit').attr('disabled', false);
    });

    if (btnCard) {
        btnCard.addEventListener('click', (e) => {
            e.preventDefault()
            cardItems.forEach((item) => {
                item.classList.remove('js-block-hide')
            })
        })
    }

    if (textarea) {
        if (count) {
            count.innerHTML = "1000/1000";
        }
        textarea.onkeyup = function () {
            count.innerHTML = (1000 - this.value.length) + "/1000";
        };
    }
    document.querySelector('textarea')

    const formObj = {
        $block: $(this),
        postLink: $(this).attr('action'),
        $submitBtn: $(this).find('[data-form-submit]'),
        $files: $(this).find('input[type="file"]')
    };

    const validateRules = {
        'name-user': {
            required: true,
            minlength: 1,
            maxlength: 30
        },
        email: {
            required: true
        },
        phone: {
            required: true,
            minlength: 1
        },
        company: {
            minlength: 1
        },
        comment: {
            minlength: 1,
        },
        file: {
            accept: ""
        },
        accept: {
            required: true
        }

    };

    const validateMessages = {};

    const fieldsViewChange = {
        setError: function (element) {
            $(element).closest('[data-form-item]').addClass('error');
        },
        removeError: function (element) {
            $(element).closest('[data-form-item]').removeClass('error');
        },
        showErrorMessage: function (error, element) {
            $(element).closest('[data-form-item]').find('.el-error').html(error);
        },
        changing: function (element) {
            let $this = $(element);
            if ($this.val().trim() !== '') {
                $this.addClass('hasValue');
            } else {
                $this.removeClass('hasValue');
            }
        },
        checkEmpty: function (removeFlag) {
            formObj.$block.find('.el-input__field').each(function () {
                if (removeFlag) {
                    $(this).removeClass('hasValue');
                } else {
                    fieldsViewChange.changing(this);
                }
            });
        }
    };

    const formStates = {
        sending: function () {
            formObj.$submitBtn.addClass('waiting');
            //formObj.$submitBtn.addClass('send');
        },
        sent: function () {
            formObj.$submitBtn.addClass('send').removeClass('waiting');
            formObj.$files.val("").trigger('change');

            setTimeout(function () {
                formObj.$submitBtn.removeClass('send');
            }, 5000);

        },
        fail: function () {
            //  formObj.$submitBtn.addClass('disable').removeClass('send').removeClass('waiting');
        },
        clean: function () {
            formObj.$submitBtn.removeClass('send').removeClass('waiting');
        }
    };


    fieldsViewChange.checkEmpty();
    formObj.jsValidator = formObj.$block.validate({
        rules: validateRules,
        messages: validateMessages,
        highlight: fieldsViewChange.setError,
        unhighlight: fieldsViewChange.removeError,
        errorPlacement: fieldsViewChange.showErrorMessage,
        onkeyup: fieldsViewChange.changing,
        submitHandler: function () {
            return false;
        }
    });

    /* wpcf7 wp plagin
    $(window).on('wpcf7invalid', function (event) {
        let wpResponse = event.detail.apiResponse;
        wpResponse.invalidFields.forEach(function (fitem, index) {
            let $field = formObj.$block.find('#' + fitem.idref + '.wpcf7-form-control');
            fieldsViewChange.setError($field);
            fieldsViewChange.showErrorMessage(fitem.message, $field);
            if (index === 0) {
                $field.focus();
            }
        });

        //  console.log(event.detail);

        formObj.$submitBtn.removeClass('waiting');

    }).on('wpcf7submit', function (event) {

        //    console.log('wpcf7submit');

    }).on('wpcf7mailsent', function () {
        if (responseId) {
            $.ajax({
                type: "post",
                dataType: "json",
                url: ajaxObject.ajaxUrl,
                data: 'id=' + responseId + '&action=deleteDataInDBFromAjax',
                success: function (response) {
                    if (response.success != true) {
                        console.log(response)
                    } else {
                        console.log(response);
                    }
                }
            })
        }
        formStates.sent();
        fieldsViewChange.checkEmpty(true);

    }).on('wpcf7mailfailed', function (event) {

        formStates.clean();
        let wpResponse = event.detail.apiResponse;

        failModal.updateContent({
            content: wpResponse.message
        });

        failModal.open();

        //   console.log('sending fail');

    }).on('wpcf7spam', function (event) {
        formStates.clean();
        let wpResponse = event.detail.apiResponse;

        failModal.updateContent({
            content: wpResponse.message
        });

        failModal.open();

        //    console.log('sending fail - spam');
    });
*/


    // let failModal = new Modal();
    // failModal.updateContent({
    //     title: ' Oops... <br> Something went wrong :( ',
    //     content: 'server Error'
    // });
    //
    // formObj.$submitBtn.on('click', function (event) {
    //     let wpcf7Form = document.querySelector('.wpcf7');
    //     let str = $(wpcf7Form).find("form").serialize();
    //     $.ajax({
    //         type: "post",
    //         dataType: "json",
    //         url: ajaxObject.ajaxUrl,
    //         data: str + '&action=saveDataInDBFromAjax',
    //         success: function (response) {
    //             if (response.success != true) {
    //                 console.log(response)
    //             } else {
    //                 if (typeof response.data !== 'undefined') {
    //                     responseId = response.data;
    //                 } else {
    //                     console.log(response)
    //                 }
    //             }
    //         }
    //     });
    //     formObj.$submitBtn.removeClass('send');
    //
    //     if (formObj.$block.valid()) {
    //         formStates.sending();
    //     } else {
    //         formObj.jsValidator.focusInvalid();
    //
    //         event.preventDefault();
    //         return false;
    //     }
    //
    // });

}
