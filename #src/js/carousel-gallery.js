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