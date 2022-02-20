class UserInfo {

    constructor({ nameSelector, professionSelector }) {
        this._userName = nameSelector;
        this._userProfession = professionSelector;
    }

    getUserInfo() {
        return { 
            name: this._userName.textContent,
            profession: this._userProfession.textContent 
        };
    }

}

export default UserInfo;