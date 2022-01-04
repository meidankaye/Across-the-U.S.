const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
];

/* -------------------------------------------------------------------------- */
/*                                  Wrappers                                  */
/* -------------------------------------------------------------------------- */

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_add");
const imagePopup = document.querySelector(".popup_type_preview");
const places = document.querySelector(".places");
const previewImage = document.querySelector(".popup__image-preview");

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
const editPopupCloseBtn = editPopup.querySelector(".popup__close-button");
const addPopupCloseBtn = addPopup.querySelector(".popup__close-button");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close-button");

/* -------------------------------------------------------------------------- */
/*                                  Inputs                                    */
/* -------------------------------------------------------------------------- */

const popupInputName = editForm.querySelector(".popup__input_text_name");
const popupInputProfession = editForm.querySelector(
    ".popup__input_text_profession"
);
const popupInputTitle = addForm.querySelector(".popup__input_text_title");
const popupInputLink = addForm.querySelector(".popup__input_text_link");


/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editBtn.addEventListener("click", () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    togglePopup(editPopup);
});

editForm.addEventListener("submit", (e) => {
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    togglePopup(editPopup);
    e.preventDefault();
});

editPopupCloseBtn.addEventListener("click", () => {
    togglePopup(editPopup);
});

addBtn.addEventListener("click", () => togglePopup(addPopup));

addForm.addEventListener("submit", (e) => {
    card.name = popupInputTitle.value;
    card.link = popupInputLink.value;
    togglePopup(addPopup);
    e.preventDefault();
});

addPopupCloseBtn.addEventListener("click", () => {
    togglePopup(addPopup);
});

imagePopupCloseBtn.addEventListener("click", () => {
    togglePopup(imagePopup);
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function togglePopup(popup) {
    popup.classList.toggle("popup_opened");
}

function createPlace(card) {
    const placesTemplate = document
    .querySelector("#place-template")
    .content.querySelector(".places__item");

    const placeElement = placesTemplate.cloneNode(true);
    const placeTitle = placeElement.querySelector(".place__title");
    const imageElem = placeElement.querySelector(".place__image");
    const cardLikeBtn = placeElement.querySelector(".place__button");

    placeTitle.textContent = card.name;

    imageElem.style.backgroundImage = `url(${card.link})`;

    imageElem.addEventListener("click", function() {
        previewImage.src = card.link;
        togglePopup(imagePopup);
    })

    cardLikeBtn.addEventListener("click", () => {
        cardLikeBtn.classList.toggle("place__button_active");
    });

    return placeElement;
}

function renderPlace(card, container) {
    container.append(card);
}

initialCards.forEach(function(card) {
    const newPlace = createPlace(card);
    renderPlace(newPlace, places);
});