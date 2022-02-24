import "./index.css";
import initialCards from "./utils/initialcards.js";
import { places, cardTemplate, editForm, addForm, editBtn, addBtn, popupInputName, popupInputProfession } from "./utils/constants.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";


function renderPlace(data, container) {
    const card = new Card(data, cardTemplate, (name, link) => {
        imagePopup.open(name, link)
    });
container.prepend(card.getElement());
}


const section = new Section({
    items: initialCards,
    renderer: (data) => {
        renderPlace(data, places)
    }
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

editPopup.setSubmitEventListeners();

const addPopup = new PopupWithForm(".popup_type_add", (data) => {

    renderPlace({
        name: data.title,
        link: data.link
    }, places)

});

addPopup.setSubmitEventListeners();

// Validation

const validationSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

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
});


addBtn.addEventListener("click", () => {
    addFormValidator.resetFormValidation(addForm);
    addPopup.open();
});