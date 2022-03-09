class Card {

    constructor(data, cardSelector, handleCardClick, handleDeleteCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._id = data.id;

        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
    }

    getID() {
        return this._id;
    }

    _setEventListeners = () => {
        this._cardElement.querySelector(".place__image")
        .addEventListener("click", () => this._handleCardClick(this._name, this._link));

        this._cardElement.querySelector(".place__button")
        .addEventListener("click", this._handleLikeButton);

        this._cardElement.querySelector(".place__trash")
        .addEventListener("click", this._handleDeleteButton);
    }

    _handleLikeButton = () => this._cardElement.querySelector(".place__button")
    .classList.toggle("place__button_active");
    

    _handleDeleteButton = () => this._cardElement.remove();

    _getTemplate = () => {
        return this._cardSelector
        .content.querySelector(".places__item")
        .cloneNode(true);
    }

    getElement = () => {
        this._cardElement = this._getTemplate();
        this._setEventListeners();

        this._cardElement.querySelector(".place__image")
        .style.backgroundImage = `url(${this._link})`;
        
        this._cardElement.querySelector(".place__title").textContent = this._name;

        return this._cardElement;
    }

}

export default Card;