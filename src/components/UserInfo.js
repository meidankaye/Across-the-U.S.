// Work in Progress

class UserInfo {

    constructor({ nameSelector, professionSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userProfession = document.querySelector(professionSelector);
    }

    getUserInfo() {
        return { 
            name: this._userName.textContent,
            profession: this._userProfession.textContent 
        };
    }

    setUserInfo({ name, profession }) {
        this._userName.textContent = name
        this._userProfession.textContent = profession
    }

}

export default UserInfo;