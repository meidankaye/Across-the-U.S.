import Popup from "./Popup.js";

class PopupWithForm extends Popup {

    constructor(popupSelector, handleSubmit, buttonText) {
        super(popupSelector);

        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._button = this._popupForm.querySelector(".popup__button");
        this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));

        this._buttonText = buttonText;

        this._handleSubmit = handleSubmit;
    }

    getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    close() {
        this._popupForm.reset();

        super.close();
    }

    showLoading() {
        this._button.textContent = "Saving...";
    }

    hideLoading() {
        this._button.textContent = this._buttonText;
    }

    setEventListeners() {
        this._popupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleSubmit(this.getInputValues());
        })

        super.setEventListeners();
    }

}

export default PopupWithForm;