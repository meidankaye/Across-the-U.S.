import Popup from "./Popup.js";

class PopupWithImage extends Popup {

    open({ name, link }) {
        this._popupElement.querySelector(".popup__image-name").textContent = name;
        const image = this._popupElement.querySelector(".popup__image-preview");
        image.src = link;
        image.alt = `Image of ${name}`
        super.open();
    }

}

export default PopupWithImage;