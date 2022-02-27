import "./index.css";
import initialCards from "../utils/initialcards.js";
import { places, cardTemplate, editForm, addForm, editBtn, addBtn, popupInputName, popupInputProfession, validationSettings } from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

function createCard(card) {
    const newCard = new Card({
        name: card.name,
        link: card.link
    },
    cardTemplate, handleCardClick,
    )
    return newCard.getElement()
}

function renderPlace(card) {
    section.addItem(createCard(card));
}

function handleCardClick (name, link) {
    imagePopup.open(name, link);
}

const section = new Section({
    items: initialCards,
    renderer: renderPlace,
}, ".places");

section.render();

const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    professionSelector: ".profile__profession"
});

const imagePopup = new PopupWithImage(".popup_type_preview");
imagePopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit", (data) => {
    userInfo.setUserInfo(data)
});

editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_type_add", (data) => {
    renderPlace({
        name: data.title,
        link: data.link
    }, places)
});

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