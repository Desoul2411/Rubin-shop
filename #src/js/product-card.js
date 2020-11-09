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

    $('.slider_buy-extra').owlCarousel({
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


    //Pagination
    //Pagination
    function paginationInit(paginationContainerClass) {
        var paginationWrapper = $(paginationContainerClass + '.pagination__pages-wrapper');
        var pagesWrapper = $(paginationContainerClass + '.pagination__page-numbers');
        var prevButton = $(paginationContainerClass + '.pagination__prevButton');
        var nextButton = $(paginationContainerClass + '.pagination__nextButton');
        var slides = $(paginationContainerClass + '.pagination__page-number');
        var position = 0;
        var slidesToShow = 5;
        var slidesTotalAmount = slides.length;
        var lastVisibleIndex = slidesToShow - 1;
        var firstVisibleIndex = 0;
        var widthToMove = 0;

        switch (slidesTotalAmount) {
            case 1:
            $(paginationContainerClass + '.pagination').css('display','none');
            break;
            case 2:
            slidesToShow = 2;
            break;
            case 3:
            slidesToShow = 3;
            break;
            case 4:
            slidesToShow = 4;
            break;
            default:
        }

        var pageWidthSum = 0;
        function calculatePagesWrapperWidth()  {
            paginationWrapper.width(0);
            pageWidthSum = 0;

            for (let i = firstVisibleIndex; i <=  lastVisibleIndex; i++) {
                pageWidthSum += $(slides[i]).width();
                paginationWrapper.width(pageWidthSum);
            }
        }
        calculatePagesWrapperWidth();
        

        //Disable prev arrow at start
        $(slides).each(function(index, page) { 
            if($(page).hasClass('active') && index === 0) {
                $(paginationContainerClass + '.pagination__prevButton').addClass('disabled');
            };
        });

        //Disable arrows when there are no pages to turn
        function disableControls(target,index) {
            if (target.hasClass('active')) {
                if(index === 0) {
                    $(paginationContainerClass + '.pagination__prevButton').addClass('disabled');
                } else {
                    $(paginationContainerClass + '.pagination__prevButton').removeClass('disabled');
                }
                
                if (index === slidesTotalAmount - 1) {
                $(paginationContainerClass + '.pagination__nextButton').addClass('disabled')
                } else {
                    $(paginationContainerClass + '.pagination__nextButton').removeClass('disabled');
                }
            };
        };

        prevButton.on('click',function() {
            if (position > 0 && slidesTotalAmount <= 5) {
                position--;
                $(slides).removeClass('active');
                $(slides[position]).addClass('active');
            }
            else if (position > 0 && lastVisibleIndex > 4) {
                $(slides).each(function(index, page) { 
                    if ($(page).hasClass('active') && index > slidesTotalAmount - 3) {
                        $(page).prev().addClass('active');
                        $(page).removeClass('active');
                        return false;
                    } else if ($(page).hasClass('active') && index <= slidesTotalAmount - 3) {
                        firstVisibleIndex === 0 ? firstVisibleIndex = 0 : firstVisibleIndex--;
                        position = firstVisibleIndex + 1;
                        lastVisibleIndex === 0 ? lastVisibleIndex : lastVisibleIndex--;
                        position--;
                        lastVisibleIndex >= slidesTotalAmount - 1 ? position = lastVisibleIndex : position;
                        pagesWrapper.css('transform', 'translateX(' + '-' + position*$(slides[firstVisibleIndex]).width() + 'px' + ')');
                        $(slides).each(function(index, page) { 
                            if($(page).hasClass('active')) {
                                $(page).prev().addClass('active');
                                $(page).removeClass('active');
                                return false;
                            };
                        });
                    };
                });
            }
            else if (lastVisibleIndex <= 4) {
                $(slides).each(function(index, page) { 
                    if($(page).hasClass('active') && index === 0) {
                        return false;
                    } else if($(page).hasClass('active')) {
                        $(page).prev().addClass('active');
                        $(page).removeClass('active');
                        return false;
                    }
                });
            };
        });

        nextButton.on('click',function() {
            if (slidesTotalAmount <= 5 && position === slidesTotalAmount - 1) {
                position = position;
            }
            else if (slidesTotalAmount === 5 && position < 4) {
                position++;
                $(slides).removeClass('active');
                $(slides[position]).addClass('active');
            }
            else if (slidesTotalAmount === 4 && position < 3) {
                position++;
                $(slides).removeClass('active');
                $(slides[position]).addClass('active');
            }
            else if (slidesTotalAmount === 3 && position < 2) {
                position++;
                $(slides).removeClass('active');
                $(slides[position]).addClass('active');     
            }
            else if (slidesTotalAmount === 2 && position < 1) {
                position++;
                $(slides).removeClass('active');
                $(slides[position]).addClass('active');     
            }
            else if (lastVisibleIndex <= 4) {
                $(slides).each(function(index, page) { 
                    if (index === 2 ) {
                        position++;
                        firstVisibleIndex++;
                        lastVisibleIndex++;
                        widthToMove = paginationWrapper.width() / slidesToShow;
                        pagesWrapper.css('transform', 'translateX(' + '-' + position*widthToMove + 'px' + ')');
                    }
                    if($(page).hasClass('active')) {
                        $(page).next().addClass('active');
                        $(page).removeClass('active');
                        return false;
                    }
                });
            }
            else if ((position < slidesTotalAmount - slidesToShow) || (lastVisibleIndex > 4 && lastVisibleIndex < slidesTotalAmount - 1)) {    
                position++;
                lastVisibleIndex === slidesTotalAmount - 1 ? lastVisibleIndex : lastVisibleIndex++;
                firstVisibleIndex++;
                widthToMove = paginationWrapper.width() / slidesToShow;
                pagesWrapper.css('transform', 'translateX(' + '-' + position*widthToMove + 'px' + ')');

                $(slides).each(function(index, page) { 
                    if($(page).hasClass('active')) {
                        $(page).next().addClass('active');
                        $(page).removeClass('active');
                        return false;
                    }
                });
            } else if (lastVisibleIndex === slidesTotalAmount - 1) {
                $(slides).each(function(index, page) { 
                    if (index === slidesTotalAmount - 1) {
                        return false;
                    }
                    else if ($(page).hasClass('active')) {
                        $(page).next().addClass('active');
                        $(page).removeClass('active');
                        return false;
                    }
                });
            };
        });

        //set class 'active' when click on page
        $(slides).each(function(index, page) {
            $(page).on('click',function(e) {
                $(slides).removeClass('active');
                $(e.target).addClass('active');
                if (slidesTotalAmount > 5 && slidesTotalAmount - index >= 3 ) {
                    index <=2 ? position = 0 : position = index - 2; 
                    widthToMove = paginationWrapper.width() / slidesToShow;
                    pagesWrapper.css('transform', 'translateX(' + '-' + position*widthToMove + 'px' + ')');
                    index <=2 ? firstVisibleIndex = 0 : firstVisibleIndex = index - 2;  
                    lastVisibleIndex = index + 2;
                } else if (slidesTotalAmount <= 5) {
                    position = index;
                }
                disableControls($(e.target), index);
            });
        });

        //Send AJAX
        $(paginationContainerClass + '.pagination__pages').on('click', function(e) {
            if ($(e.target).hasClass('active') ) {
               /*  alert('AJAX for ' + $(e.target).text()) */
                //AJAX goes here
            }
        });

        $(paginationContainerClass + '.pagination__prevButton').on('click',function() {
            $(slides).each(function(index, page) {
                if($(page).hasClass('active')) {
                    disableControls($(page), index);
                /*     alert('AJAX for ' + $(page).text()); */
                    //AJAX goes here
                }
            });
        });

        $(paginationContainerClass + '.pagination__nextButton').on('click',function() {
            $(slides).each(function(index, page) {
                if($(page).hasClass('active')) {
                    disableControls($(page), index);
                 /*    alert('AJAX for ' + $(page).text()); */
                    //AJAX goes here
                }
            });
        });
    };

    paginationInit('.pagination_feedback ');
    paginationInit('.pagination_questions ');


    //Show popup
    function showPopup(popupName) {
        $('body').css({"overflow":"hidden", "padding-right":"17px"});
        $(popupName).fadeIn(200);
        $(popupName).css('display', 'flex');
    };

    //close popup
    function closePopup(fadeOutDuration = 300,timeOut = 300) {
        setTimeout(function() {
            $('body').css({"overflow":"auto", "padding-right":"0"});
            },timeOut);
        $('.overlay').fadeOut(fadeOutDuration);
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

    //Show product detailed info modal
    $('.card__fast-browse').on('click', function(e) {
        e.preventDefault();
        showPopup('.overlay_main-card');
    });

    //Send "leave_feedback" form
    $('.leave_feedback').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: $(this).serialize(),
            success: function () {
                $('.modal-confirm__title').text('Отзыв отправлен!');
                $('.modal-confirm__message').text('');
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

    //Send "leave_question" form
    $('.leave_question').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: $(this).serialize(),
            success: function () {
                $('.modal-confirm__title').text('Вопрос отправлен!');
                $('.modal-confirm__message').text('');
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


    //show sizes table
    $('.criteria__link').on('click', function() {
        showPopup('.overlay_sizes-table');
    });

    
    //close sizes table when click on overlay
    $('.overlay_sizes-table').on('click',function(e) {
        if($(e.target).hasClass('overlay_sizes-table')) {
            $('.overlay_sizes-table').fadeOut(200);
            $('body').css('overflow', 'auto');
        };
        if ($('.sizes-table-modal__close-button').hasClass('from-page')) {
            $('.sizes-table-modal__close-button').removeClass('from-page');
        }
    });

    //add class to distinguish close button from the main page from close button from modal window
    $('main .criteria__link').on('click',function() {
        $('.sizes-table-modal__close-button').addClass('from-page');
    });

    //close sizes table
    $('.sizes-table-modal__close-button').on('click', function() {
        if ($(this).hasClass('from-page')) {
            setTimeout(function() {
                $('body').css({"overflow":"auto", "padding-right":"0"});
                },300);
            $('.overlay_sizes-table').fadeOut(300);
            $(this).removeClass('from-page');
        } else {
            $('.overlay_sizes-table').fadeOut(200);
            if ($('.sizes-table-modal__close-button').hasClass('from-page')) {
                $('.sizes-table-modal__close-button').removeClass('from-page');
            }
        }
    });
    

    //click on "В корзину" button (in detailed info modal)
    $('.criteria__btn-full').on('click', function() {
        $('body').css({"overflow":"auto", "padding-right":"0"});
        $('.overlay').fadeOut(0);
        showPopup('.overlay_added-to-cart');
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
    const galleryNav = document.getElementById('carousel-gallery');

    galleryNav.addEventListener('click', function (event) {
        const buttons = document.querySelectorAll('.main-card_dafault .gallery__nav-item');
        const images = document.querySelectorAll('.main-card_dafault .gallery__item');

        let showImage = function (btn, image) {
            if(btn.contains(event.target)){
                images.forEach(item => {
                    if(!item.classList.contains("visually-hidden") ){
                        item.classList.add('visually-hidden');
                    }
                });
                image.classList.remove('visually-hidden');
                buttons.forEach(item => {
                    if(item.classList.contains("gallery__nav-item_active") ){
                        item.classList.remove('gallery__nav-item_active');
                    }
                });
                btn.classList.add('gallery__nav-item_active');
            }
        };
        for (let i = 0; i < buttons.length; i++){
            showImage(buttons[i], images[i]);
        }

    });

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
    const listSizes = document.getElementById('list-sizes');
    const chosenSize = document.getElementById('chosen-size');

    listSizes.addEventListener('change', function (event) {
        const sizes = document.querySelectorAll('.main-card_dafault input[name="size"]');

        let addSize = function (sizeBtn) {
            if(sizeBtn.contains(event.target)){
                chosenSize.textContent = sizeBtn.value;
            }
        };

        for (let i = 0; i < sizes.length; i++) {
            addSize(sizes[i]);
        }

    });


    const listSizesModal = document.getElementById('list-sizes-modal');
    const chosenSizeModal = document.getElementById('chosen-size-modal');

    listSizesModal.addEventListener('change', function (event) {
        const sizes = document.querySelectorAll('.main-card_modal input[name="very"]');

        let addSize = function (sizeBtn) {
            if(sizeBtn.contains(event.target)){
                chosenSizeModal.textContent = sizeBtn.value;
            }
        };

        for (let i = 0; i < sizes.length; i++) {
            addSize(sizes[i]);
        }

    });


    const listColors = document.getElementById('list-colors');
    const chosenColor = document.getElementById('chosen-color');

    listColors.addEventListener('change', function (event) {
        const colors = document.querySelectorAll('.main-card_dafault input[name="color"]');

        let addColor = function (colorBtn) {
            if(colorBtn.contains(event.target)){
                chosenColor.textContent = colorBtn.value;
            }
        };

        for (let j = 0; j < colors.length; j++) {
            addColor(colors[j]);
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

    //switch dor feedback
    const feedback = document.getElementById('feedback');
    const titleForm = document.querySelector('.feedback__title');

    feedback.addEventListener('click', function (event) {
        const btns = document.querySelectorAll('.feedback__btn');
        const forms = document.querySelectorAll('.leave');

        let showForm = function (btn, form) {
            if(btn.contains(event.target)) {

                forms.forEach(item => {
                    if(!item.classList.contains("visually-hidden") ){
                        item.classList.add('visually-hidden');
                    }

                    if (btns[0].contains(event.target)) {
                        titleForm.textContent = "Отзывы клиентов";
                    } else {
                        titleForm.innerText = "Вопросы клиентов";
                    }

                });

                form.classList.remove('visually-hidden');
            }
        };

        for (let i = 0; i < btns.length; i++) {
            showForm(btns[i], forms[i]);
        }

        const bookmarks = document.querySelectorAll('.feedback__nav-item');
        const notes = document.querySelectorAll('.notes');

        let showNote = function (bookmark, note) {
            if(bookmark.contains(event.target)) {

                bookmarks.forEach(item => {
                    if(item.classList.contains("feedback__nav-item_active") ){
                        item.classList.remove('feedback__nav-item_active');
                    }

                });

                bookmark.classList.add('feedback__nav-item_active');

                notes.forEach(item => {
                    if(!item.classList.contains("visually-hidden") ){
                        item.classList.add('visually-hidden');
                    }

                });

                note.classList.remove('visually-hidden');
            }
        };

        for (let i = 0; i < bookmarks.length; i++) {
            showNote(bookmarks[i], notes[i]);
        }

    });


    //STARS
    const ratingItemList = document.querySelectorAll('.rating__item');
    const ratingItemsArray = Array.prototype.slice.call(ratingItemList);

    ratingItemsArray.forEach(item =>
        item.addEventListener('click',() => {
            const {itemValue} = item.dataset;
            item.parentNode.dataset.totalValue = itemValue;
            console.log(itemValue);
            //back-end query
        })
    );


    //show answers
    const notesQuestions = document.getElementById('notes-questions');

    notesQuestions.addEventListener('click', function (event) {
        const btnsSwitchAnswers = document.querySelectorAll('.notes__answers-link');
        const listOfAnswers = document.querySelectorAll('.notes__answers-list');
        const iconsOfAnswers = document.querySelectorAll('.notes__answers-img');

        let showAnswers = function (btn, list, icon){
            if(btn.contains(event.target)){
                btn.classList.toggle('notes__answers-link_active');
                list.classList.toggle('visually-hidden');
                icon.classList.toggle('notes__answers-img_active');
            }
        }

        for (let i = 0; i < btnsSwitchAnswers.length; i++){
            showAnswers(btnsSwitchAnswers[i], listOfAnswers[i], iconsOfAnswers[i]);
        }

    });

});
