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