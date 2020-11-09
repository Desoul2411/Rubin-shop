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