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


    // Show trackbar for filters' custom scrollbar
    function showColorsScrollTrack() {
        if($('.filter__colors').height() >= 266) {
            $('#colors').addClass('scrolled');
        };
    };

    function showSizesScrollTrack() {
        if($('.filter__sizes').height() >= 266) {
            $('#sizes').addClass('scrolled');
        };
    };
    showColorsScrollTrack();
    showSizesScrollTrack();

    // Init custom scrollbars 
    const simpleBarColors = new SimpleBar(document.getElementById('colors'), {
        scrollbarMinSize:100,
        autoHide:false
    });

    const simpleBarSizes = new SimpleBar(document.getElementById('sizes'), {
        scrollbarMinSize:100,
        autoHide:false
    });


    // Open filter block
    $('.filter__headline').on('click',function() {
        $(this).next().slideToggle(300);    
        $(this).find('.filter__headline-arrow').toggleClass('opened');
        showColorsScrollTrack();
        showSizesScrollTrack();
    });

    if ($(window).width() <= 768) {
        $('.catalogue-content__filter-mobile').on('click', function() {
            $('.filter').slideToggle(400); 
        });
    };


    //Show/delete filter markers when click on filter items
    var filterMarkerHtml = '';

    function renderFilterMarker(filterItemDataVal, filterItemText) {
        filterMarkerHtml = `
            <div class="filter-markers__item" data-filter-value=${filterItemDataVal}>
                <span class="filter-markers__item-text">${filterItemText}</span>
                <svg class="filter-markers__item-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L4.75 4.75M8.5 8.5L4.75 4.75M4.75 4.75L8.5 1L1 8.5" stroke="#333333" stroke-width="2"/>
                </svg>                                        
            </div>
        `;
        $(filterMarkerHtml).appendTo( ".filter-markers" );
    };


    $('.filter__item').on('click', function(elem) {
        $(this).toggleClass('selected');
        var filterItemText = $(this).text();
        var filterItemDataVal = $(this).attr('data-filter-value'); 

        if(!$(this).hasClass('selected')) {
            if($('.filter-markers__item-text').length !== 0) {
                $('.filter-markers__item-text').each(function(i,elem) {
                    if($(elem).text() === filterItemText) {
                        $(elem).parent().remove();
                    };
                });
            };
        } else {
            if($('.filter-markers__item-text').length === 0) {
                renderFilterMarker(filterItemDataVal, filterItemText);
                
            } else {
                var markersTextArr = [];
                $('.filter-markers__item-text').each(function(i,elem) {
                    markersTextArr.push($(elem).text());
                });
                if(!(markersTextArr).includes(filterItemText)) {
                    renderFilterMarker(filterItemDataVal, filterItemText);
                }; 
            };

            $('.filter-markers__item-icon').on('click', function() { 
                $(this).parent().remove();
                let filterMarkerText= $(this).prev().text();
                $('.filter__item').each(function(i,elem) {
                    if($(elem).text() === filterMarkerText) {
                        $(elem).removeClass('selected');
                    };
                });
            });
        };
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
            $('body').css({"overflow":"auto", "padding-right":"0"});
        },timeOut);
        $('.overlay').fadeOut(fadeOutDuration);
    };

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
     

    //To screen top button
    let upButton = document.querySelector('.up-button');
        upButton.addEventListener('click', ()=>{
        slowScroll('#top');
    })
    function slowScroll(id) {
        var offset = 20;
        $('html,body').animate ({
            scrollTop: $(id).offset().top - offset
        },500);
        return false;
    };


    window.onscroll = function () {
        var showUpBottonOffsetTop = $('.card').height() * 3.3;
        var scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        if(scrollTop >= showUpBottonOffsetTop) {
            $('.up-button').removeClass('hidden');
            $('.up-button').addClass('shown');
            /* alert('Документ прокручен на 200px или больше'); */
        } 
        if(scrollTop < showUpBottonOffsetTop) {
            $('.up-button').remove('shown');
            $('.up-button').addClass('hidden');
            /* alert('Документ прокручен на 200px или больше'); */
        } 
    }


    //Pagination
    var paginationWrapper = $('.pagination__pages-wrapper');
    var pagesWrapper = $('.pagination__page-numbers');
    var prevButton = $('.pagination__prevButton');
    var nextButton = $('.pagination__nextButton');
    var slidesPaginationTop = $('.pagination_catalogue-top .pagination__page-number');
    var slidesPaginationBottom = $('.pagination_catalogue-bottom .pagination__page-number');
    var position = 0;
    var slidesToShow = 5;
    var slidesTotalAmount = slidesPaginationTop.length;
    var lastVisibleIndex = slidesToShow - 1;
    var firstVisibleIndex = 0;
    var widthToMove = 0;

    switch (slidesTotalAmount) {
        case 1:
          $('.pagination').css('display','none');
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
            pageWidthSum += $(slidesPaginationTop[i]).width();
            paginationWrapper.width(pageWidthSum);
        }
    }
    calculatePagesWrapperWidth();
    

    //Disable prev arrow at start
    $(slidesPaginationTop).each(function(index, page) { 
        if($(slidesPaginationTop).hasClass('active') && index === 0) {
            $('.pagination__prevButton').addClass('disabled');
        };
    });

    //Disable arrows when there are no pages to turn
    function disableControls(target,index) {
        if (target.hasClass('active')) {
            if (index === 0) {
                $('.pagination__prevButton').addClass('disabled');
            } else {
                $('.pagination__prevButton').removeClass('disabled');
            }
            
            if (index === slidesTotalAmount - 1) {
            $('.pagination__nextButton').addClass('disabled')
            } else {
                $('.pagination__nextButton').removeClass('disabled');
            }
        };
    };


    prevButton.on('click',function() {
        if (position > 0 && slidesTotalAmount <= 5) {
            position--;
            $(slidesPaginationTop).removeClass('active');
            $(slidesPaginationTop[position]).addClass('active');
            $(slidesPaginationBottom).removeClass('active');
            $(slidesPaginationBottom[position]).addClass('active');
        }
        else if (position > 0 && lastVisibleIndex > 4) {  
            $(slidesPaginationTop).each(function(index, page) { 
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
                    pagesWrapper.css('transform', 'translateX(' + '-' + position*$(slidesPaginationTop[firstVisibleIndex]).width() + 'px' + ')');
                    $(slidesPaginationTop).each(function(index, page) { 
                        if($(page).hasClass('active')) {
                            $(page).prev().addClass('active');
                            $(page).removeClass('active');
                            return false;
                        };
                    });
                };
            });

            $(slidesPaginationBottom).each(function(index, page) { 
                if ($(page).hasClass('active') && index > slidesTotalAmount - 3) {
                    $(page).prev().addClass('active');
                    $(page).removeClass('active');
                    return false;
                } else if ($(page).hasClass('active') && index <= slidesTotalAmount - 3) {
                    pagesWrapper.css('transform', 'translateX(' + '-' + position*$(slidesPaginationBottom[firstVisibleIndex]).width() + 'px' + ')');
                    $(slidesPaginationBottom).each(function(index, page) { 
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
            $(slidesPaginationTop).each(function(index, page) { 
                if($(page).hasClass('active') && index === 0) {
                    return false;
                } else if($(page).hasClass('active')) {
                    $(page).prev().addClass('active');
                    $(page).removeClass('active');
                    return false;
                }
            });

            $(slidesPaginationBottom).each(function(index, page) { 
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
        else if (slidesTotalAmount === 5 && position < 4 || slidesTotalAmount === 4 && position < 3 || slidesTotalAmount === 3 && position < 2 || slidesTotalAmount === 2 && position < 1) {
            position++;
            $(slidesPaginationTop).removeClass('active');
            $(slidesPaginationTop[position]).addClass('active');
            $(slidesPaginationBottom).removeClass('active');
            $(slidesPaginationBottom[position]).addClass('active');

        }
        else if (lastVisibleIndex <= 4) {
            $(slidesPaginationTop).each(function(index, page) { 
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

            $(slidesPaginationBottom).each(function(index, page) { 
                if (index === 2 ) {
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

            $(slidesPaginationTop).each(function(index, page) { 
                if($(page).hasClass('active')) {
                    $(page).next().addClass('active');
                    $(page).removeClass('active');
                    return false;
                }
            });

            $(slidesPaginationBottom).each(function(index, page) { 
                if($(page).hasClass('active')) {
                    $(page).next().addClass('active');
                    $(page).removeClass('active');
                    return false;
                }
            });
        } else if (lastVisibleIndex === slidesTotalAmount - 1) {
            $(slidesPaginationTop).each(function(index, page) { 
                if (index === slidesTotalAmount - 1) {
                    return false;
                }
                else if ($(page).hasClass('active')) {
                    $(page).next().addClass('active');
                    $(page).removeClass('active');
                    return false;
                }
            });

            $(slidesPaginationBottom).each(function(index, page) { 
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
    $(slidesPaginationTop).each(function(index, page) {
        $(page).on('click',function(e) {
            $(slidesPaginationTop).removeClass('active');
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

    $(slidesPaginationBottom).each(function(index, page) {
        $(page).on('click',function(e) {
            $(slidesPaginationBottom).removeClass('active');
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

    //Add class 'active' to the other pagination slider when click on page number
    $('.pagination_catalogue-top .pagination__page-number').each(function(indexTop, pageTop) {
        $(pageTop).on('click',function() {
            if($(pageTop).hasClass('active')) {
                $('.pagination_catalogue-bottom .pagination__page-number').each(function(indexBottom, pageBottom) {
                    $(pageBottom).removeClass('active');
                    if (indexTop === indexBottom) {
                        $(pageBottom).addClass('active');
                    }
                });
            };
        });
    });

    $('.pagination_catalogue-bottom .pagination__page-number').each(function(indexBottom, pageBottom) {
        $(pageBottom).on('click',function() {
            if($(pageBottom).hasClass('active')) {
                $('.pagination_catalogue-top .pagination__page-number').each(function(indexTop, pageTop) {
                    $(pageTop).removeClass('active');
                    if (indexBottom === indexTop) {
                        $(pageTop).addClass('active');
                    }
                });
            };
        });
    });

    //Send AJAX
    $('.pagination__pages').on('click', function(e) {
        if ($(e.target).hasClass('active') ) {
            //AJAX goes here
            console.log('AJAX for ' + $(e.target).text() + ' page');
        }
    });

    $('.pagination__prevButton').on('click',function() {
        $(slidesPaginationTop).each(function(index, page) {
            if($(page).hasClass('active')) {
                disableControls($(page), index);
                //AJAX goes here
                console.log('AJAX for ' + $(page).text() + ' page');
            }
        });
    });

    $('.pagination__nextButton').on('click',function() {
        $(slidesPaginationTop).each(function(index, page) {
            if($(page).hasClass('active')) {
                disableControls($(page), index);
                //AJAX goes here
                console.log('AJAX for ' + $(page).text() + ' page');
            }
        });
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