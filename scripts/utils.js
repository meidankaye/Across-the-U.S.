export const imagePopup = document.querySelector(".popup_type_preview");
export const previewImage = imagePopup.querySelector(".popup__image-preview");
export const previewTitle = imagePopup.querySelector(".popup__image-name");
export const popupList = Array.from(document.querySelectorAll(".popup"));

export const openPopup = (popup) => {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupEsc);
};

export const closePopup = () => {
    popupList.forEach((popup) => popup.classList.remove("popup_opened"));
    document.removeEventListener("keydown", closePopupEsc);
};


export const closePopupEsc = (e) => {
    if (e.key === "Escape") {
        closePopup(popupList);
    }
};

popupList.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
        if (e.target == e.currentTarget) {
            closePopup(popupList);
        };
    });
});