$(document).ready(function() {
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


    // Delete product from cart
    $('.cart-item__delete-button').on('click', function() {
        $(this).parent().parent().parent().parent().remove();
        
        // if cart is empty */
        if ($('.cart-main-content__cards').html().trim() == '') { 
            $('.cart-main-content__cards').html('<p class="cart-main-content__empty-cart-message">Корзина пуста. Добавьте товар!</p>');
            $('.order-info__make-order-button').css('background','grey');
            $('.order-info__make-order-button').css('cursor','default');
            $('.order-info__make-order-button').prop('disabled',true);
            $('.order-info__products-price-sum').text(0);
            $('.order-info__discount-sum').text(0);
            $('.order-info__delivery-sum').text(0);
            $('.order-info__total-price-sum').text(0);
        
            $('input[name="delivery"]').prop('checked',false);
            $('input[name="delivery"]').removeAttr('checked');
            $('input[name="delivery"]').prop('disabled',true);

            $('.order-info__option-label_main').css({'display':'block','pointer-events':'none'});
            $('.order-info__checked-icon').css({'display':'none','pointer-events':'none'});
            $('.order-info__promocode').css('pointer-events','none');
            
            $('.order-info__options-block_select-shop').slideUp(300);
            $('.order-info__options-block_inputs-block').slideUp(300);
            $('.order-info__options-block_payment-way').slideUp(300);
        }
    });


    //Edit cart item (edit item modal)
    var targetCart;
    var initColorValue;
    var initSizeValue;

    var editModalColorSelect;
    var editModalSizeSelect;
    var editAmountInput;

    var colorEditInputValue;
    var sizeEditInputValue;
    var amountEditInputValue;

    var currentItemPrice;
    var currentItemAmount;
    var totalCurrentItemPrice;

    // show edit cart item modal 
    $('.cart-item__edit-button').on('click', function(e) {
        showPopup('.overlay_edit-product');
        targetCart = $(this).parent().parent().parent().parent();

        //Get init option values from card
        initColorValue = $(this).parent().parent().parent().find('.cart-item__option-value_color').text();
        initColorAttr = $(this).parent().parent().parent().find('.cart-item__option-value_color').attr('data-color');

        initSizeValue = $(this).parent().parent().parent().find('.cart-item__option-value_size').text();
        initSizeAttr = $(this).parent().parent().parent().find('.cart-item__option-value_color').attr('data-size');

        initAmountValue = $(this).parent().parent().parent().find('.cart-item__option-value_amount').text();
        initAmountAttr = $(this).parent().parent().parent().find('.cart-item__option-value_color').attr('data-amount');

        //Set init option values (in modal) when open edit modal
        editModalColorSelect = $('#edited-color');
        editModalColorSelect.val(initColorValue);

        editModalSizeSelect = $('#edited-size');
        editModalSizeSelect.val(initSizeValue);

        editAmountInput = $('#edited-amount');
        editAmountInput.val(initAmountValue);


        $('#edited-color').on('change', function(e) {
            colorEditInputValue = $(e.target).val();
        });
    
        $('#edited-size').on('change', function(e) {
            sizeEditInputValue = $(e.target).val();
        });
    
        $('#edited-amount').on('change', function(e) {
            amountEditInputValue = $(e.target).val();
            if (amountEditInputValue < 1) {
                $(e.target).val(1);
            }
        });

        $('.edit-product-modal__confirm-button').on('click',function() {
            //Set edited values to item
            $(targetCart).find('.cart-item__option-value_color').text(colorEditInputValue);
            $(targetCart).find('.cart-item__option-value_color').attr('data-color', colorEditInputValue);

            $(targetCart).find('.cart-item__option-value_size').text(sizeEditInputValue);
            $(targetCart).find('.cart-item__option-value_size').attr('data-size', sizeEditInputValue);

            $(targetCart).find('.cart-item__option-value_amount').text(amountEditInputValue);
            $(targetCart).find('.cart-item__option-value_amount').attr('data-amount', amountEditInputValue);
            
            //Calculate total item sum
            currentItemPrice =  (+$(targetCart).find('.cart-item__price').text()).toFixed(2);
            currentItemAmount = +$(targetCart).find('.cart-item__option-value_amount').text();
            totalCurrentItemPrice = (currentItemPrice * currentItemAmount).toFixed(2);
            $(targetCart).find('.cart-item__total-price').text(totalCurrentItemPrice);
            $(targetCart).find('.cart-item__total-price').attr('data-total-item-price',totalCurrentItemPrice);
            closePopup();
        });
     });


    //Show/hide promocode field
    $('.order-info__promocode').on('click',function() {
        $('.order-info__enter-promocode').toggleClass('shown');
        if($('.order-info__enter-promocode').hasClass('shown')) {
            $('.order-info__enter-promocode').prop('disabled',false);
        } else {
            $('.order-info__enter-promocode').prop('disabled',true);
        };
        $('.order-info__enter-promocode').slideToggle(300);
    });


    //on options checkbox "checked"
    function switchCheckedIcon() {
        //Hide "Выберите способ доставки!" warning when radio button (delivery method) is checked
        if( $('input[name="delivery"]').is(':checked')){
            $('.order-info__select-deliver-method-warning').css('display','none');
        } 
        //Toggle "checked" icon
        $(".order-info__option-checkbox").each(function(i,e) {
            if($(e).prop('checked')) {
                $(e).parent().css('display','none');
                $(e).parent().next().css('display','block');
            } else {
                $(e).parent().css('display','block');
                $(e).parent().next().css('display','none');
            }
        });
    };

    $(".order-info__option-checkbox").on('change', function(e) {
        switchCheckedIcon();
        //Choose cart options, show/hide options
        //1 - Самовывоз из магазина
        if($(e.target).prop('checked') && $(e.target).attr('value') === 'Самовывоз из магазина') {
            $('.order-info__courier-delivery-sub-option').slideUp(300);
            $('.order-info__options-block').slideDown(300);

            //2 - Выберите адрес магазина
            $('input[name="shop_adress"]').prop('required',true);
            $('input[name="shop_adress"]').prop('disabled',false);

            //3 - Укажите контактные данные
            $('.order-info__option_input_city').css('display','none');
            $('.order-info__adress-block').css('display','none');
            $('#street').prop('disabled',true);
            $('#city').prop('disabled',true);
            $('#house_number').prop('disabled',true);
            $('#flat_number').prop('disabled',true);

            //4 - Выберите способ оплаты
            $('#oplata-pri-poluchenii').prop('required',true);
            $('#oplata-pri-poluchenii').prop('disabled',false);
            $('input[name="payment"]').prop('checked',false);
            $('.order-info__option_samovyvoz').css('display','flex');
            $('.order-info__option_postal-delivery').css('display','none');
            $('.order-info__option_courier-delivery').css('display','none');
            $('.order-info__option_courier-delivery-cash').css('display','none');
            switchCheckedIcon();
        }

        //1 - Доставка почтой по РБ
        if($(e.target).prop('checked') && $(e.target).attr('value') === 'Доставка почтой по РБ') {
            $('.order-info__courier-delivery-sub-option').slideUp(300);
            $('.order-info__options-block').slideDown(300);

            //2 - Выберите адрес магазина
            $('.order-info__options-block_select-shop').css('display','none');  
            $('input[name="shop_adress"]').prop('required',false);
            $('input[name="shop_adress"]').prop('disabled',true);
            //3 - Укажите контактные данные
            $('.order-info__option_input_city').css('display','flex');
            $('.order-info__adress-block').css('display','flex');
            $('#street').prop('disabled',false);
            $('#city').prop('disabled',false);
            $('#house_number').prop('disabled',false);
            $('#flat_number').prop('disabled',false);
            $('#street').prop('required',true);
            $('#city').prop('required',true);
            $('#house_number').prop('required',true);
            $('#flat_number').prop('required',true);

            //4 - Выберите способ оплаты
            $('#courier-pay-by-card').prop('required',false);
            $('#courier-delivery').prop('required',false);
            $('#oplata-pri-poluchenii').prop('required',false);
            $('#oplata-pri-poluchenii').prop('disabled',true);
            $('input[name="payment"]').prop('checked',false);
            
            $('.order-info__option_courier-delivery').css('display','none');
            $('.order-info__option_courier-delivery-cash').css('display','none');
            $('.order-info__option_samovyvoz').css('display','none');
            $('.order-info__option_postal-delivery').css('display','flex');
            switchCheckedIcon();
        }

         //1 - Курьерская доставка
         if($(e.target).prop('checked') && $(e.target).attr('value') === 'Курьерская доставка') {
            $('.order-info__courier-delivery-sub-option').slideDown(300)
            $('.order-info__options-block').slideDown(300);

            //2 - Выберите адрес магазина
            $('.order-info__options-block_select-shop').css('display','none');  
            $('input[name="shop_adress"]').prop('required',false);
            $('input[name="shop_adress"]').prop('disabled',true);

            //3 - Укажите контактные данные
            $('.order-info__option_input_city').css('display','flex');
            $('.order-info__adress-block').css('display','flex');
            $('#street').prop('disabled',false);
            $('#city').prop('disabled',false);
            $('#house_number').prop('disabled',false);
            $('#flat_number').prop('disabled',false);

            //4 - Выберите способ оплаты
            $('input[name="payment"]').prop('checked',false);
            $('.order-info__option_courier-delivery').css('display','flex');
            $('.order-info__option_courier-delivery-cash').css('display','flex');
            $('.order-info__option_samovyvoz').css('display','none');
            $('.order-info__option_postal-delivery').css('display','none');
            switchCheckedIcon();
        }
    });
    

    //Show popup
    function showPopup(popupName) {
        $('body').css('overflow','hidden');
        $(popupName).fadeIn(200);
        $(popupName).css('display', 'flex');
        $('body').css('padding-right','17px');
    };

    //close popup
    function closePopup() {
        setTimeout(function() {
            $('body').css('overflow','auto');
            $('body').css('padding-right','0px');
            }
        ,300);
        $('.overlay').fadeOut(300);
    };

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

    //if delivery method is not selected
    $('.order-info__make-order-button').on('click', function() {
        if( $('input[name="delivery"]').is(':checked') === false){
            $('.order-info__select-deliver-method-warning').css('display','block');
        } 
    });


    $('.cart__content-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: $(this).serialize(),
            success: function () {
                showPopup('.overlay_thnx-for-order');
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


    //Phone enter mask 
    jQuery(document).ready(function() {
        jQuery("#phone").mask("+375 (99) 999-99-99");
    });
});