const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];
  
/* -------------------------------------------------------------------------- */
/*                                  Wrappers                                  */
/* -------------------------------------------------------------------------- */

const popup = document.querySelector('.popup');
const editForm = document.querySelector('.popup__form');
const places = document.querySelector('.places');

/* -------------------------------------------------------------------------- */
/*                            Buttons and DOM nodes                           */
/* -------------------------------------------------------------------------- */

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');

/* -------------------------------------------------------------------------- */
/*                                  Inputs                                    */
/* -------------------------------------------------------------------------- */

const popupInputName = editForm.querySelector('.popup__input_text_name');
const popupInputProfession = editForm.querySelector('.popup__input_text_profession');

/* -------------------------------------------------------------------------- */
/*                                  Templates                                 */
/* -------------------------------------------------------------------------- */

const placesTemplate = document.querySelector('#place-template')
.content.querySelector('.places__item');


/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editBtn.addEventListener('click', () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    togglePopup();
});

editForm.addEventListener('submit', (e) => {
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    togglePopup();
    e.preventDefault();
});

closeBtn.addEventListener('click', togglePopup);


/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

function createPlace(card) {
    const placeElement = placesTemplate.cloneNode(true);

    placeElement.querySelector('.place__title').textContent = card.name;

    placeElement.querySelector('.place__image').style.backgroundImage = `url(${card.link})`;

    return placeElement;
}

function renderPlace(card, container) {
    container.append(card);
}

initialCards.forEach(function (card) {
    const newPlace = createPlace(card);
    renderPlace(newPlace, places);
});