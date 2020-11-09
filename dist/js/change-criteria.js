const listSizes = document.getElementById('list-sizes');
const chosenSize = document.getElementById('chosen-size');

listSizes.addEventListener('change', function (event) {
    const sizes = document.querySelectorAll('.main-card_dafault input[name="size"]');
    console.log ("страницы кнопки: " + sizes);
    console.log ("страницы кликнули по: " + event.target);

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






