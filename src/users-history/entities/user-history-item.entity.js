class UserHistoryItemEntity {
    constructor(obj) {
       this.name = obj.name || obj.currentName;
       this.surname = obj.surname || obj.currentSurname;
       this.city = obj.city || obj.currentCity;
       this.age = Number(obj.age || obj.currentAge);
       this.updatedAt = obj.updatedAt;
    }

    name;
    surname;
    city;
    age;
    updatedAt;
}

module.exports = {
    UserHistoryEntity: UserHistoryItemEntity
}