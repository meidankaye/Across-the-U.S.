class FormValidator {

    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        // this.settings = settings;
        this._form = formElement;
    }

    _showInputError = (inputEl, errorMessage) => {
        errorMessage = this._form.querySelector("#" + inputEl.id + "-error");
        errorMessage.textContent = inputEl.validationMessage;
        errorMessage.classList.add(this._errorClass);
        inputEl.classList.add(this._inputErrorClass);
    }

    _hideInputError = (inputEl, errorMessage) => {
        errorMessage = this._form.querySelector("#" + inputEl.id + "-error");
        errorMessage.textContent = "";
        errorMessage.classList.remove(this._errorClass);
        inputEl.classList.remove(this._inputErrorClass);
    }


    _disableSubmitButton = (submitButton) => {
        submitButton.classList.add(this._inactiveButtonClass);
        submitButton.disabled = true;
    };

    _hasValidInputs = inputList => inputList.every((inputEl) => inputEl.validity.valid);


    _checkInputValidity = (inputEl) => {
        if (inputEl.validity.valid) {
            this._hideInputError(inputEl, inputEl.validationMessage);
        } else {
            this._showInputError(inputEl);
        }
    }


    _setEventListeners = () => {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    
        this._toggleButton(inputList);
    
        inputList.forEach((inputEl) => {
            inputEl.addEventListener("input", () => {
                this._checkInputValidity(inputEl);
                this._toggleButton(inputList);
            });
        });
    }

    _toggleButton = (inputList) => {
        const submitButton = this._form.querySelector(this._submitButtonSelector);

        if (this._hasValidInputs(inputList)) {
            submitButton.disabled = false;
            submitButton.classList.remove(this._inactiveButtonClass);
        } else {
            this._disableSubmitButton(submitButton);
        }
    }


    enableValidation = () => {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }
    
}

// const settings = {
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__button",
//     inactiveButtonClass: "popup__button_disabled",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__error_visible"
// }

// const formElement = document.querySelector(".popup__form");

// const editFormValidator = new FormValidator(settings, formElement);
// const addFormValidator = new FormValidator(settings, formElement);

// formValidator.enableValidation();


export default FormValidator;