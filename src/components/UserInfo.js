class UserInfo {

    constructor({ nameSelector, professionSelector, imageSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userProfession = document.querySelector(professionSelector);
        this._userImage = document.querySelector(imageSelector);
    }

    getUserInfo() {
        return { 
            name: this._userName.textContent,
            profession: this._userProfession.textContent 
        };
    }

    setUserInfo(data) {
        this._userName.textContent = data.name
        this._userProfession.textContent = data.about
    }

    setUserImage(url) {
        this._userImage.style.backgroundImage = `url("${url}")`;
    }

}

export default UserInfo;