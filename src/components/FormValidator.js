class FormValidator {

    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._form = formElement;
    }

    _showInputError = (inputEl) => {
        const errorMessage = this._form.querySelector(`#${inputEl.id}-error`);
        errorMessage.textContent = inputEl.validationMessage;
        errorMessage.classList.add(this._errorClass);
        inputEl.classList.add(this._inputErrorClass);
    }

    _hideInputError = (inputEl) => {
        const errorMessage = this._form.querySelector(`#${inputEl.id}-error`);
        errorMessage.textContent = "";
        errorMessage.classList.remove(this._errorClass);
        inputEl.classList.remove(this._inputErrorClass);
    }

    _hasOnlyValidInputs = () => this._inputList.every((inputEl) => inputEl.validity.valid);


    _checkInputValidity = (inputEl) => {
        if (inputEl.validity.valid) {
            this._hideInputError(inputEl);
        } else {
            this._showInputError(inputEl);
        }
    }


    _setEventListeners = () => {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    
        this._toggleButton();
    
        this._inputList.forEach((inputEl) => {
            inputEl.addEventListener("input", () => {
                this._checkInputValidity(inputEl);
                this._toggleButton();
            });
        });
    }

    _toggleButton = () => {
        const submitButton = this._form.querySelector(this._submitButtonSelector);

        if (this._hasOnlyValidInputs()) {
            submitButton.disabled = false;
            submitButton.classList.remove(this._inactiveButtonClass);
        } else {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.disabled = true;
        }
    }

    resetFormValidation = () => {
        this._inputList.forEach(inputEl => {
            this._hideInputError(inputEl);
        })

        this._toggleButton();
    }

    enableValidation = () => {
        this._setEventListeners();
    }
    
}


export default FormValidator;