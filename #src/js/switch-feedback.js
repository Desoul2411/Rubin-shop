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
