// NEED TO UPDATE//

import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popupElement.querySelector(".popup__button");
    }

    setAction(action) {
        this._submitHandler = action;
    }

    showLoading() {
        this._button.textContent = "Deleting...";
    }

    setEventListeners() {
        this._popupElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._submitHandler();
        })

        super.setEventListeners();
    }

}

export default PopupWithConfirmation;