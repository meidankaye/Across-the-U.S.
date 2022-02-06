import { previewImage, previewTitle, imagePopup, openPopup} from "./utils.js"

class Card {

    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;

        this._cardSelector = cardSelector;

        this._cardTemplate = cardSelector.content.querySelector(".places__item");
    }

    _setEventListeners() {
        this._imageElem = this._cardElement.querySelector(".place__image");
        this._cardLikeBtn = this._cardElement.querySelector(".place__button");
        this._cardDeleteBtn = this._cardElement.querySelector(".place__trash");

        this._imageElem.addEventListener("click", () => this._handlePreviewImage);
        this._cardLikeBtn.addEventListener("click", this._handleLikeButton);
        this._cardDeleteBtn.addEventListener("click", this._handleDeleteButton);
    }

    _handlePreviewImage() {
        previewImage.src = this._link;
        previewTitle.textContent = this._name;
        openPopup(imagePopup);
    }

    _handleLikeButton = e => e.target.classList.toggle("place__button_active");

    _handleDeleteButton = () => this._cardElement.remove();

    getElement() {
        this._cardElement = this._cardTemplate.cloneNode(true);
        this._setEventListeners();

        this._cardElement.querySelector(
            ".place__image"
        ).style.backgroundImage = `url(${this._link})`;
        
        this._cardElement.querySelector(".place__title").textContent = this._name;

        return this._cardElement;
    }

}

export default Card;