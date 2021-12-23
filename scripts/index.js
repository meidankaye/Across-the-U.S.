let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let editBtn = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let closeBtn = document.querySelector('.popup__close-button');
let popupInputName = document.querySelector('.popup__input_text_name');
let popupInputProfession = document.querySelector('.popup__input_text_profession');


editBtn.addEventListener('click', () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    openPopup();
});

form.addEventListener('submit', (e) => {
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup();
    e.preventDefault();
});

closeBtn.addEventListener('click', closePopup);

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}