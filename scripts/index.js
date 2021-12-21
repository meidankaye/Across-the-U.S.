let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let editBtn = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close-button');
let saveBtn = document.querySelector('.popup__save-button');
let popupInputName = document.querySelector('.popup__input_text_name');
let popupInputProfession = document.querySelector('.popup__input_text_profession');


editBtn.addEventListener('click', () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    openPopup();
});

saveBtn.addEventListener('click', () => {
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup();
});

closeBtn.addEventListener('click', closePopup);

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}