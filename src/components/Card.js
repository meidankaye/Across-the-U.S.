import { previewImage, previewTitle, imagePopup, openPopup} from "./utils.js"

class Card {

    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;

        this._cardSelector = cardSelector;
    }

    _setEventListeners = () => {
        this._imageElem = this._cardElement.querySelector(".place__image");
        this._cardLikeBtn = this._cardElement.querySelector(".place__button");
        this._cardDeleteBtn = this._cardElement.querySelector(".place__trash");

        this._imageElem.addEventListener("click", this._handlePreviewImage);
        this._cardLikeBtn.addEventListener("click", this._handleLikeButton);
        this._cardDeleteBtn.addEventListener("click", this._handleDeleteButton);
    }

    _handlePreviewImage = () => {
        previewImage.src = this._link;
        previewImage.alt = `Image of ${this._name}`;
        previewTitle.textContent = this._name;
        openPopup(imagePopup);
    }

    _handleLikeButton = () => this._cardLikeBtn.classList.toggle("place__button_active");

    _handleDeleteButton = () => this._cardElement.remove();

    _getTemplate = () => {
        return this._cardSelector
        .content.querySelector(".places__item")
        .cloneNode(true);
    }

    getElement = () => {
        this._cardElement = this._getTemplate();
        this._setEventListeners();

        this._cardElement.querySelector(
            ".place__image"
        ).style.backgroundImage = `url(${this._link})`;
        
        this._cardElement.querySelector(".place__title").textContent = this._name;

        return this._cardElement;
    }

}

export default Card;