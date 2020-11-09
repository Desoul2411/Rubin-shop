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

    //Slider "Популярные" 
    $('.slider_popular').owlCarousel({
        loop: true,
        items:7,
        margin: 25,
        nav:true,
        navText: false,
        responsive: true,
        dots: false,
        responsive:{
            1856 : {
                items:7,
            },
            
            1326 : {
                items:6,
            }, 
            1100 : {
                items:5,
            }, 
            900 : {
                items:4,
            }, 
            725: {
                items:3.5,
                margin:20
            }, 

            670 : {
                items:3,
            }, 
            525 : {
                items:2.5,
            }, 
            425 : {
                items:2,
            }, 
            320 : {
                items:1.5,
                nav: false
            }, 
        }
    });

    $('.slider_recently').owlCarousel({
        loop: true,
        items:7,
        margin: 25,
        nav:true,
        navText: false,
        responsive: true,
        dots: false,
        responsive:{
            1856 : {
                items:7,
            },
            
            1326 : {
                items:6,
            }, 
            1100 : {
                items:5,
            }, 
            900 : {
                items:4,
            }, 
            725: {
                items:3.5,
                margin:20
            }, 

            670 : {
                items:3,
            }, 
            525 : {
                items:2.5,
            }, 
            425 : {
                items:2,
                nav:true,
            }, 
            320 : {
                items:1.5,
                nav: false
            }, 
        }
    });

    /* hashtag__list */
    $('.hashtag__list').owlCarousel({
        loop: true,
        items:5,
        margin: 24,
        nav:true,
        navText: false,
        responsive: true,
        dots: false,
        responsive:{
            1541 : {
                items:5,
            },
            1220: {
                items:4,
            },
            920: {
                items:3,
            },

            600: {
                items:2,
            },
            425: {
                items:1.5,  
                nav: true,
            },
            400: {
                items:1.5,
            },
            320: {
                nav:false,
                items:1.2,
            },         
        }
    });


    //Show popup
    function showPopup(popupName) {
        $('body').css({"overflow":"hidden", "padding-right":"17px"});
        $(popupName).fadeIn(200);
        $(popupName).css('display', 'flex');
    };

    //close popup
    function closePopup(fadeOutDuration = 300,timeOut = 300) {
        setTimeout(function() { 
            $('body').css({"overflow":"auto", "padding-right":"0"})
        },timeOut);
        $('.overlay').fadeOut(fadeOutDuration);
    };

    // close popup on click 'Хорошо' button
    $('.modal-confirm__ok-button').on('click', closePopup);

    // close popup on click 'X' button
    $('.modal-close-button').on('click', closePopup);

    // close popup on click on overlay
    $('.overlay').on('click', function(e) {
        if($(e.target).hasClass('overlay') || $(e.target).hasClass('main-card')) {
            closePopup();
        };
     });

    //Show product detailed info modal
    $('.card__fast-browse').on('click', function(e) {
        e.preventDefault();
        showPopup('.overlay_main-card');
    });

    //show sizes table
    $('.criteria__link').on('click', function() {
        showPopup('.overlay_sizes-table');
    });

    //close sizes table 
    $('.sizes-table-modal__close-button').on('click', function() {
        $('.overlay_sizes-table').fadeOut(200);
    });

    $('.overlay_sizes-table').on('click',function(e) {
        if($(e.target).hasClass('overlay_sizes-table')) {
            $('.overlay_sizes-table').fadeOut(200);
        };
    });

    //click on "В корзину" button (in detailed info modal)
    $('.criteria__btn-full').on('click', function() {
        $('body').css({"overflow":"auto", "padding-right":"0"});
        $('.overlay').fadeOut(0);
        showPopup('.overlay_added-to-cart');
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

    //open 'added to cart' modal
    $('.card__into-basket').on('click', function(e) {
        e.preventDefault();
        showPopup('.overlay_added-to-cart');
    });
    
    //close 'added to cart' modal
    $('.modal-added-to-cart__continue-shopping-button').on('click', function() {
        closePopup();
    });


//slick slider gor product card
    $( document ).ready(function() {

        $(".gallery__nav-list").slick({
            arrows: false,
            vertical: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            verticalSwiping: true,
            infinite: false,
            touchThreshold: 10,
            responsive: [ {
                breakpoint: 576,
                settings: 'unslick'
            }
            ]
        });
    });

    //show images
    const galleryNavModal = document.getElementById('carousel-gallery-modal');

    galleryNavModal.addEventListener('click', function (event) {
        const buttonsModal = document.querySelectorAll('.gallery__nav-item.gallery__nav-item_modal');
        const imagesModal = document.querySelectorAll('.gallery__item.gallery__item_modal');

        let showImage = function (btn, image) {
            if(btn.contains(event.target)){

                imagesModal.forEach(item => {
                    if(!item.classList.contains("visually-hidden") ){
                        item.classList.add('visually-hidden');
                    }
                });

                image.classList.remove('visually-hidden');

                buttonsModal.forEach(item => {
                    if(item.classList.contains("gallery__nav-item_active") ){
                        item.classList.remove('gallery__nav-item_active');
                    }
                });

                btn.classList.add('gallery__nav-item_active');
            }
        };

        for (let i = 0; i < buttonsModal.length; i++){
            showImage(buttonsModal[i], imagesModal[i]);
        }

    });

    //change criteria in cards
    const listSizesModal = document.getElementById('list-sizes-modal');
    const chosenSizeModal = document.getElementById('chosen-size-modal');

    listSizesModal.addEventListener('change', function (event) {
        const sizes = document.querySelectorAll('.main-card_modal input[name="very"]');
        console.log ("страницы кнопки: " + sizes);
        console.log ("страницы кликнули по: " + event.target);

        let addSize = function (sizeBtn) {
            if(sizeBtn.contains(event.target)){
                chosenSizeModal.textContent = sizeBtn.value;
            }
        };

        for (let i = 0; i < sizes.length; i++) {
            addSize(sizes[i]);
        }

    });

    const listColorsModal = document.getElementById('list-colors-modal');
    const chosenColorModal = document.getElementById('chosen-color-modal');

    listColorsModal.addEventListener('change', function (event) {
        const colors = document.querySelectorAll('.main-card_modal input[name="color"]');

        let addColor = function (colorBtn) {
            if(colorBtn.contains(event.target)){
                chosenColorModal.textContent = colorBtn.value;
            }
        };

        for (let j = 0; j < colors.length; j++) {
            addColor(colors[j]);
        }

    });


    //add favorites
    const mainBody = document.querySelector('body');

    mainBody.addEventListener('click', function (event) {
        const btnAddToFavorites = document.querySelectorAll('.criteria__btn-empty');

        let changeBtnAddToFavorites = function(btn){
            if( btn.contains(event.target) && !btn.classList.contains("in-favorites")){
                btn.innerHTML = `<svg width="15" height="13" viewBox="0 0 15 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.353 12.9618C7.39799 12.9884 7.44901 13.0002 7.5 13.0002C7.551 13.0002 7.60201 12.9884 7.647 12.9618C7.947 12.7934 15 8.79591 15 4.13661C15 1.85569 13.116 0.000244141 10.8 0.000244141C9.49799 0.000244141 8.29501 0.585238 7.5 1.58388C6.70499 0.585238 5.50201 0.000244141 4.2 0.000244141C1.88401 0.000244141 0 1.85569 0 4.13661C0 8.79591 7.053 12.7934 7.353 12.9618Z"
                                          fill="#333333"/>
                                </svg> в избранном`;
                btn.classList.add('in-favorites');
            } else if (btn.contains(event.target) && btn.classList.contains("in-favorites")){
                btn.innerHTML = `<svg width="15" height="13" viewBox="0 0 15 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.353 12.9618C7.39799 12.9884 7.44901 13.0002 7.5 13.0002C7.551 13.0002 7.60201 12.9884 7.647 12.9618C7.947 12.7934 15 8.79591 15 4.13661C15 1.85569 13.116 0.000244141 10.8 0.000244141C9.49799 0.000244141 8.29501 0.585238 7.5 1.58388C6.70499 0.585238 5.50201 0.000244141 4.2 0.000244141C1.88401 0.000244141 0 1.85569 0 4.13661C0 8.79591 7.053 12.7934 7.353 12.9618Z"
                                          fill="#333333"/>
                                </svg> добавить в избранное`;
                btn.classList.remove('in-favorites');
            }
        }

        for (let i = 0; i < btnAddToFavorites.length; i++){
            changeBtnAddToFavorites(btnAddToFavorites[i]);
        }

    })

});

