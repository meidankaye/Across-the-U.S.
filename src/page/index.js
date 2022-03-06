import "regenerator-runtime/runtime";
import "./index.css";

import { cardTemplate, editForm, addForm, editBtn, addBtn, popupInputName, popupInputProfession, validationSettings } from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// API

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "439544b2-326e-4000-bd7d-7d8ec93af705"
});

api.getInitialCards().then(cards => {
    section.render(cards);
});

// api.getUserInfo().then(userData => {
//     userInfo.setUserInfo({ name: userData.name, profession: userData.about })
// });


// Functions

function createCard(card) {
    const newCard = new Card({
        name: card.name,
        link: card.link
    },
    cardTemplate, handleCardClick,
    )
    return newCard.getElement()
}

function handleCardClick (name, link) {
    imagePopup.open(name, link);
}

function handleAddFormSubmit() {
    const inputValues = addPopup._getInputValues();
    const card = { name: inputValues.title, link: inputValues.link };
    section.addItem(createCard(card));
}

function handleEditFormSubmit(data) {
    userInfo.setUserInfo(data)
}

// Classes
const section = new Section({
    renderer: (card) => {
        section.addItem(createCard(card));
    }
}, ".places");

section.render();

const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    professionSelector: ".profile__profession"
});

const imagePopup = new PopupWithImage(".popup_type_preview");
imagePopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit", handleEditFormSubmit);

editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_type_add", handleAddFormSubmit);

addPopup.setEventListeners();

const editFormValidator = new FormValidator(validationSettings, editForm);
const addFormValidator = new FormValidator(validationSettings, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//Event Listeners

editBtn.addEventListener("click", () => {
    const data = userInfo.getUserInfo()
    editPopup.open();
    popupInputName.value = data.name;
    popupInputProfession.value = data.profession;
    editFormValidator.resetFormValidation();
});


addBtn.addEventListener("click", () => {
    addFormValidator.resetFormValidation();
    addPopup.open();
});