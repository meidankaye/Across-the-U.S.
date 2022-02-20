import Popup from "./Popup.js";

class PopupWithImage extends Popup {

    open(name, link) {
        const title = this._popupElement.querySelector(".popup__image-name");
        const image = this._popupElement.querySelector(".popup__image-preview");
        title.textContent = name;
        image.src = link;
        image.alt = `Image of ${name}`
        super.open();
    }

}

export default PopupWithImage;