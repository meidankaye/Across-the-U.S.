class FormValidator {

    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._form = formElement;
    }

    _showInputError = (inputEl, errorMessage) => {
        errorMessage = this._form.querySelector("#" + inputEl.id + "-error");
        errorMessage.textContent = inputEl.validationMessage;
        errorMessage.classList.add(this._errorClass);
        inputEl.classList.add(this._inputErrorClass);
    }

    _hideInputError = (inputEl) => {
        errorMessage = this._form.querySelector("#" + inputEl.id + "-error");
        errorMessage.textContent = "";
        errorMessage.classList.remove(this._errorClass);
        inputEl.classList.remove(this._inputErrorClass);
    }


    //need to fix
    _disableSubmitButton = (submitButton) => {
        submitButton.classList.add(this._inactiveButtonClass);
        submitButton.disabled = true;
    };

    _hasValidInputs = () => this._inputList.every((inputEl) => inputEl.validity.valid);


    _checkInputValidity = (inputEl) => {
        if (inputEl.validity.valid) {
            this._hideInputError(inputEl);
        } else {
            this._showInputError(inputEl, inputEl.validationMessage);
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

    //need to fix
    _toggleButton = () => {
        const submitButton = this._form.querySelector(this._submitButtonSelector);

        if (this._hasValidInputs()) {
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


export default FormValidator;