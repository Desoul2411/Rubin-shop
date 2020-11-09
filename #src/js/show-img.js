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

