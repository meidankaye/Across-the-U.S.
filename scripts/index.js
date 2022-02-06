import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_add");
const places = document.querySelector(".places");

/* -------------------------------------------------------------------------- */
/*                                    Forms                                   */
/* -------------------------------------------------------------------------- */

const editForm = editPopup.querySelector(".popup__form");
const addForm = addPopup.querySelector(".popup__form");

/* -------------------------------------------------------------------------- */
/*                            Buttons and DOM nodes                           */
/* -------------------------------------------------------------------------- */

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const closeBtnList = Array.from(document.querySelectorAll(".popup__close-button"));

/* -------------------------------------------------------------------------- */
/*                                  Inputs                                    */
/* -------------------------------------------------------------------------- */

const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(
    ".popup__input_type_profession"
);
const placeName = document.querySelector(".popup__input_type_title");
const placeLink = document.querySelector(".popup__input_type_link");



/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const validationSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

const editFormValidator = new FormValidator(validationSettings, editForm);
const addFormValidator = new FormValidator(validationSettings, addForm);

// editFormValidator.enableValidation();
// addFormValidator.enableValidation();


/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editBtn.addEventListener("click", () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    openPopup(editPopup);
});

editForm.addEventListener("submit", (e) => {
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup(editPopup);
    e.preventDefault();
});

addBtn.addEventListener("click", () => openPopup(addPopup));

addForm.addEventListener("submit", (e) => {
    // const card = {
    //     name: placeName.value,
    //     link: placeLink.value,
    // };
    renderPlace({
        name: placeName.value,
        link: placeLink.value
    }, places);
    closePopup(addPopup);
    e.preventDefault();
    addForm.reset();
});

closeBtnList.forEach((btn) => btn.addEventListener("click", closePopup));

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

// const handleLikeButton = (e) => {
//     e.target.classList.toggle("place__button_active");
// };

// const handleDeleteButton = (e) => {
//     e.target.placeElement.remove();
// };

// const handlePreviewImage = (data) => {
//     previewImage.src = data.link;
//     previewTitle.textContent = data.name;
//     openPopup(imagePopup);
// };

// function createPlace(card) {
//     const placeElement = placesTemplate.cloneNode(true);
//     const placeTitle = placeElement.querySelector(".place__title");
//     const imageElem = placeElement.querySelector(".place__image");
//     const cardLikeBtn = placeElement.querySelector(".place__button");
//     const cardDeleteBtn = placeElement.querySelector(".place__trash");

//     placeTitle.textContent = card.name;

//     imageElem.style.backgroundImage = `url(${card.link})`;

//     imageElem.addEventListener("click", () => handlePreviewImage(data));
//     cardLikeBtn.addEventListener("click", handleLikeButton);
//     cardDeleteBtn.addEventListener("click", handleDeleteButton);

//     return placeElement;
// }

const cardTemplateSelector = document.querySelector("#place-template");

function renderPlace(data, container) {
    const card = new Card(data, cardTemplateSelector);
    container.prepend(card.getElement());
}

initialCards.forEach((data) => {
    renderPlace(data, places);
});