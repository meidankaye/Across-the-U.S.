const showInputError = (inputEl, formEl, settings) => {
    const errorMessage = formEl.querySelector("#" + inputEl.id + "-error");
    errorMessage.textContent = inputEl.validationMessage;
    errorMessage.classList.add(settings.errorClass);
    inputEl.classList.add(settings.inputErrorClass);
}

const hideInputError = (inputEl, formEl, settings) => {
    const errorMessage = formEl.querySelector("#" + inputEl.id + "-error");
    errorMessage.textContent = "";
    errorMessage.classList.remove(settings.errorClass);
    inputEl.classList.remove(settings.inputErrorClass);
}

const checkInputValidity = (formEl, inputEl, settings) => {
    if (inputEl.validity.valid) {
        hideInputError(inputEl, formEl, settings);
    } else {
        showInputError(inputEl, formEl, settings);
    }
};

const hasValidInputs = (inputList) => inputList.every((inputEl) => inputEl.validity.valid);

const toggleButton = (inputList, submitButton, settings) => {
    if (hasValidInputs(inputList)) {
        submitButton.disabled = false;
        submitButton.classList.remove(settings.inactiveButtonClass);
    } else {
        submitButton.disabled = true;
        submitButton.classList.add(settings.inactiveButtonClass);
    }
};

const setEventListeners = (formEl, settings) => {
    const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
    const submitButton = formEl.querySelector(settings.submitButtonSelector);

    toggleButton(inputList, submitButton, settings);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
            checkInputValidity(formEl, inputEl, settings);

            toggleButton(inputList, submitButton, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formElements = Array.from(document.querySelectorAll(settings.formSelector));
    formElements.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => e.preventDefault());
        setEventListeners(formEl, settings);
    });
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}); 