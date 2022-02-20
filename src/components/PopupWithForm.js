import Popup from "./Popup.js";

class PopupWithForm extends Popup {

    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._submitHandler = submitHandler;
    }

    _getInputValues() {
        const inputValues = {};
        const inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
        inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._submitHandler(this._getInputValues());
        })

        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();

        super.close();
    }

}

export default PopupWithForm;