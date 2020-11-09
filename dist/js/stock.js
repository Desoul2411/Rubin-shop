$(document).ready(function() {
    // Open/close mobile menu
    // Open/close mobile menu
    $('.header__mobile-menu-open-button').on('click', function() {
        $('.mobile-menu-overlay').addClass('opened');
        $('body').css('overflow','hidden');
        setTimeout(() => {
            $('.mobile-menu').addClass('opened')
        },0);
    });

    $('.mobile-menu-overlay').on('click', function(e) {
        var menuBlock = $('.mobile-menu');
        if(e.target!=menuBlock[0]&&menuBlock.has(e.target).length === 0) {
            $('.mobile-menu').removeClass('opened');
            setTimeout(() => {
                $(this).removeClass('opened');
                $('body').css('overflow','auto');
            },300);
        };
    });

    $('.product-menu__menu-arrow').on('click', function() {
        $(this).next().addClass('opened');
        $('.wrapper').css('overflow','hidden'); 
    });

    $('.submenu__close-button').on('click', function() {
        $(this).parent().removeClass('opened');
        $('.wrapper').css('overflow','auto');
        
    });


    //Show search bar (mobile resolutions < 576px)
    $('.user-menu__link_search').on('click', function(e) {
        e.preventDefault();
        $('.search_mobile').slideToggle();
    });


    //Show popup
    function showPopup(popupName) {
        $('body').css({"overflow":"hidden", "padding-right":"17px"});
        $(popupName).fadeIn(200);
        $(popupName).css('display', 'flex');
    };

    //close popup
    function closePopup() {
        setTimeout(function() {
            $('body').css({"overflow":"auto", "padding-right":"0"});
        },300);
        $('.overlay').fadeOut(300);
    };

    // close popup on click 'Хорошо' button
    $('.modal-confirm__ok-button').on('click', closePopup);

    // close popup on click 'X' button
    $('.modal-close-button').on('click', closePopup);

    // close popup on click on overlay
    $('.overlay').on('click', function(e) {
        if($(e.target).hasClass('overlay')) {
            closePopup();
        };
     });

    // Show/hide confirm subscription modal
    $('.footer__sign-email-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: $(this).serialize(),
            success: function () {
                $('.modal-confirm__title').text('Cпасибо за подписку!');
                $('.modal-confirm__message').text('На указанный E-mail отправлено письмо с промокодом.!');
                showPopup('.overlay_confirm-email-subscription');
                $(this).find("input").val("");
                $(this).trigger("reset"); 
            },
            error: function () {
                $('.modal-confirm__title').text('Что-то пошло не так...');
                $('.modal-confirm__message').text('Попробуйте ещё раз');
                showPopup('.overlay_confirm-email-subscription');
                $(this).find("input").val("");
                $(this).trigger("reset"); 
            }
        });
    });
});


