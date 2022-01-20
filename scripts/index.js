
/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_add");
const imagePopup = document.querySelector(".popup_type_preview");
const popupList = Array.from(document.querySelectorAll(".popup"));
const places = document.querySelector(".places");
const placesTemplate = document.querySelector("#place-template").content.querySelector(".places__item");
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
const closeBtnList = Array.from(document.querySelectorAll(".popup__close-button"));

/* -------------------------------------------------------------------------- */
/*                                  Inputs                                    */
/* -------------------------------------------------------------------------- */

const popupInputName = editForm.querySelector(".popup__input_type_name");
const popupInputProfession = editForm.querySelector(
    ".popup__input_type_profession"
);
const placeName = addForm.querySelector(".popup__input_type_title");
const placeLink = addForm.querySelector(".popup__input_type_link");


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
    const card = {
        name: placeName.value,
        link: placeLink.value,
    };
    renderPlace(createPlace(card), places);
    closePopup(addPopup);
    e.preventDefault();
    addForm.reset();
});

closeBtnList.forEach((btn) => btn.addEventListener("click", closePopup));

popupList.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
        if (e.target == e.currentTarget) {
            closePopup(popupList);
        };
    });
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupEsc);
    const saveButton = popup.querySelector(".popup__button");
    if (popup.contains(saveButton)) {
        disableSubmitButton(saveButton);
    }
};

function closePopup() {
    popupList.forEach((popup) => popup.classList.remove("popup_opened"));
    document.removeEventListener("keydown", closePopupEsc);
};

function closePopupEsc(e) {
    if (e.key === "Escape") {
        closePopup(popupList);
    }
}

function createPlace(card) {
    const placeElement = placesTemplate.cloneNode(true);
    const placeTitle = placeElement.querySelector(".place__title");
    const imageElem = placeElement.querySelector(".place__image");
    const cardLikeBtn = placeElement.querySelector(".place__button");
    const cardDeleteBtn = placeElement.querySelector(".place__trash");
    const previewTitle = imagePopup.querySelector(".popup__image-name")

    placeTitle.textContent = card.name;

    imageElem.style.backgroundImage = `url(${card.link})`;

    imageElem.addEventListener("click", function() {
        previewImage.src = card.link;
        previewTitle.textContent = card.name;
        openPopup(imagePopup);
    })

    cardLikeBtn.addEventListener("click", () => {
        cardLikeBtn.classList.toggle("place__button_active");
    });

    cardDeleteBtn.addEventListener("click", () => {
        placeElement.remove();
    });

    return placeElement;
}

function renderPlace(card, container) {
    container.prepend(card);
}

initialCards.forEach(function(card) {
    const newPlace = createPlace(card);
    renderPlace(newPlace, places);
});