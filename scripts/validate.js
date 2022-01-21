//Hi Sergey, I hope I fixed what you meant...
//None of my instructors are online and I want to turn this in as soon as possible, and I believe this is my last iteration.
//I understood what you meant as far as I can tell, but I don't fully understand where it should be applied.


const pageSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};


const showInputError = (inputEl, formEl) => {
    const errorMessage = formEl.querySelector("#" + inputEl.id + "-error");
    errorMessage.textContent = inputEl.validationMessage;
    errorMessage.classList.add(pageSettings.errorClass);
    inputEl.classList.add(pageSettings.inputErrorClass);
}

const hideInputError = (inputEl, formEl) => {
    const errorMessage = formEl.querySelector("#" + inputEl.id + "-error");
    errorMessage.textContent = "";
    errorMessage.classList.remove(pageSettings.errorClass);
    inputEl.classList.remove(pageSettings.inputErrorClass);
}

const checkInputValidity = (formEl, inputEl) => {
    if (inputEl.validity.valid) {
        hideInputError(inputEl, formEl);
    } else {
        showInputError(inputEl, formEl);
    }
};

const hasValidInputs = (inputList) => inputList.every((inputEl) => inputEl.validity.valid);

const toggleButton = (inputList, submitButton) => {
    if (hasValidInputs(inputList)) {
        submitButton.disabled = false;
        submitButton.classList.remove(pageSettings.inactiveButtonClass);
    } else {
        disableSubmitButton(submitButton);
    }
};

const disableSubmitButton = (buttonElement) => {
    buttonElement.classList.add(pageSettings.inactiveButtonClass);
    buttonElement.disabled = true;
};

const setEventListeners = (formEl, settings) => {
    const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
    const submitButton = formEl.querySelector(settings.submitButtonSelector);

    toggleButton(inputList, submitButton);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
            checkInputValidity(formEl, inputEl);

            toggleButton(inputList, submitButton);
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

enableValidation(pageSettings);