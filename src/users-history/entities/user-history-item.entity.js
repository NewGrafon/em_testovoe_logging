class UserHistoryItemEntity {
    constructor(obj) {
       this.name = obj.name;
       this.surname = obj.surname;
       this.city = obj.city;
       this.age = Number(obj.age);
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