const ratingItemList = document.querySelectorAll('.rating__item');
const ratingItemsArray = Array.prototype.slice.call(ratingItemList);

ratingItemsArray.forEach(item =>
    item.addEventListener('click',() => {
        const {itemValue} = item.dataset;
        item.parentNode.dataset.totalValue = itemValue;
        console.log(itemValue);
        //запрос на бэкэнд
    })
);