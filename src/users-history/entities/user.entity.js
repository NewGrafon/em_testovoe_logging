class UserEntity {
    constructor(obj) {
        this.id = Number(obj.id);
        this.currentName = obj.name;
        this.currentSurname = obj.surname;
        this.currentCity = obj.city;
        this.currentAge = Number(obj.age);
        this.history = obj.history;
        this.updatedAt = obj.updatedAt;
    }

    id;
    currentName;
    currentSurname;
    currentCity;
    currentAge;
    history;
    updatedAt;
}

module.exports = {
    UserEntity
}