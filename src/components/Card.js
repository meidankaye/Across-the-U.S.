class Card {

    constructor({ data, handleCardClick, handleDeleteCard, handleLikeButton }, cardSelector, userId) {
        this._name = data.name;
        this._link = data.link;

        this._id = data._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeButton = handleLikeButton;

        this._cardSelector = cardSelector;
        this._userId = userId;
        this._ownerId = data.owner._id;
    }

    isLiked() {
        return this._likes.some((person) => person._id === this._userId);
    };

    updateLikes = (newLikes) => {
        this._likes = newLikes;

        this._renderLikes();
        
        this._cardElement.querySelector(".place__button").classList.toggle("place__button_active");
    }
    
    removeCard = () => this._cardElement.remove();

    _renderLikes = () => {
        const likesCounter = this._cardElement.querySelector(".place__like-count");
        likesCounter.textContent = this._likes.length;
    }

    _setEventListeners = () => {
        this._cardElement.querySelector(".place__image")
        .addEventListener("click", () => this._handleCardClick(this._name, this._link));

        this._cardElement.querySelector(".place__button")
        .addEventListener("click", () => this._handleLikeButton(this._id));

        this._cardElement.querySelector(".place__trash")
        .addEventListener("click", () => this._handleDeleteCard(this._id));
    }

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

        if (this._ownerId !== this._userId) {
            this._cardElement.querySelector(".place__trash").style.display = "none";
        }

        this._renderLikes();

        if (this.isLiked()) {
            this.updateLikes(this._likes);
        }

        return this._cardElement;
    }

}

export default Card;