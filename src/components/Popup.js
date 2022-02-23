class Popup {

    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscUp = this._handleEscUp.bind(this);
        this.close = this.close.bind(this);
    }

    _handleEscUp(e) {
        e.preventDefault();

        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.querySelector(".popup__close-button").addEventListener("click", this.close);

        this._popupElement.addEventListener("mousedown", (e) => {
            if ([...e.target.classList].includes("popup")) {
                this.close()
            }
        })
    }

    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keyup", this._handleEscUp);
        this.setEventListeners();
    }

    close() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keyup", this._handleEscUp);
    }

}

export default Popup;