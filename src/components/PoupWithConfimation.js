// NEED TO UPDATE//

import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {

    constructor() {

    }

    setAction(action) {
        this._submitHandler = action;
    }

    setEventListeners() {
        this._popupElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._submitHandler();
            // this.close();
        })

        super.setEventListeners();
    }

}

export default PopupWithConfirmation;