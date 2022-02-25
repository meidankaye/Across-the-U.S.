export const places = document.querySelector(".places");
export const cardTemplate = document.querySelector("#place-template");

export const editForm = document.querySelector(".popup_type_edit").querySelector(".popup__form");
export const addForm = document.querySelector(".popup_type_add").querySelector(".popup__form");

export const editBtn = document.querySelector(".profile__edit-button");
export const addBtn = document.querySelector(".profile__add-button");

export const popupInputName = document.querySelector(".popup__input_type_name");
export const popupInputProfession = document.querySelector(".popup__input_type_profession");

export const validationSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};