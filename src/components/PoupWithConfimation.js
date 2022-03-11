import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {

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