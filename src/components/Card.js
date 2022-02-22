class Card {

    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;

        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners = () => {
        this._imageElem = this._cardElement.querySelector(".place__image");
        this._cardLikeBtn = this._cardElement.querySelector(".place__button");
        this._cardDeleteBtn = this._cardElement.querySelector(".place__trash");

        this._imageElem.addEventListener("click", () => this._handleCardClick(this._name, this._link));
        this._cardLikeBtn.addEventListener("click", this._handleLikeButton);
        this._cardDeleteBtn.addEventListener("click", this._handleDeleteButton);
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