// NEED TO UPDATE//

import "./index.css";

import { cardTemplate, editForm, addForm, editBtn, addBtn, avatarBtn, popupInputName, popupInputProfession, validationSettings } from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PoupWithConfimation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";

let userId;

const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    professionSelector: ".profile__profession",
    imageSelector: ".profile__image"
});

// API

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "439544b2-326e-4000-bd7d-7d8ec93af705",
        "Content-Type": "application/json",
    },
});


Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        section.render(cards);

        userInfo.setUserImage(userData.avatar);
        userInfo.setUserInfo({ name: userData.name, about: userData.about });
    })
    .catch(err => console.log(`Error.....: ${err}`));

// Functions

function createCard(data) {
    const newCard = new Card({
        data,
        handleCardClick,
        handleLikeButton: (id) => {
            const isAlreadyliked = newCard.isLiked();

            if (isAlreadyliked) {
                api.dislikeCard(id).then((res) => {
                    newCard.updateLikes(res.likes);
                })
                .catch(err => console.log(`Error.....: ${err}`));
            } else {
                api.likeCard(id).then((res) => {
                    newCard.updateLikes(res.likes);
                })
                .catch(err => console.log(`Error.....: ${err}`));
            }
        },
        handleDeleteCard: (id) => {
            confirmPopup.open();
            confirmPopup.setAction(() => {
                confirmPopup.showLoading();
                api.removeCard(id).then(() => {
                    newCard.removeCard();
                    confirmPopup.close();
                })
                .catch(err => console.log(`Error.....: ${err}`))
                .finally(() => {
                    confirmPopup.hideLoading();
                });
            })
        }
    }, cardTemplate, userId)

    return newCard.getElement();
}

function handleCardClick (name, link) {
    imagePopup.open(name, link);
}

function handleAddFormSubmit() {
    const inputValues = addPopup.getInputValues();
    const data = { name: inputValues.title, link: inputValues.link };
    addPopup.showLoading();
    api.addCard(data).then(res => {
        section.addItem(createCard(res));
    })
    .catch(err => console.log(`Error.....: ${err}`))
    .finally(() => {
        addPopup.hideLoading();
    });
}

function handleEditFormSubmit() {
    const inputValues = editPopup.getInputValues();
    const data = { name: inputValues.name, profession: inputValues.profession };
    api.updateProfile(data).then(res => {
        userInfo.setUserInfo(res);
    })
    .catch(err => console.log(`Error.....: ${err}`));
    editPopup.showLoading();
}

function handleAvatarFormSubmit(userData) {
    api.updateUserImage(userData.link).then(res => {
        userInfo.setUserImage(res.avatar);
    })
    .catch(err => console.log(`Error.....: ${err}`));
    avatarPopup.showLoading();
}

// Classes
const section = new Section({
    renderer: (card) => {
        section.addItem(createCard(card));
    }
}, ".places");

const imagePopup = new PopupWithImage(".popup_type_preview");
imagePopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit", handleEditFormSubmit, "Save");

editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_type_add", handleAddFormSubmit, "Create");

addPopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_type_avatar", handleAvatarFormSubmit, "Save");

avatarPopup.setEventListeners();

const confirmPopup = new PopupWithConfirmation(".popup_type_confirm");

confirmPopup.setEventListeners();

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

avatarBtn.addEventListener("click", () => {
    avatarPopup.open();
})