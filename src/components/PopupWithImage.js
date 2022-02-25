import Popup from "./Popup.js";

class PopupWithImage extends Popup {

    open(name, link) {
        this._title = this._popupElement.querySelector(".popup__image-name");
        this._image = this._popupElement.querySelector(".popup__image-preview");
        
        this._title.textContent = name;
        this._image.src = link;
        this._image.alt = `Image of ${name}`
        super.open();
    }

}

export default PopupWithImage;