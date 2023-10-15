const {CreateUserHistoryDto} = require("./create-user.dto");

class UpdateUserDto extends CreateUserHistoryDto {
    constructor(obj) {
        super(obj);
        this.name = obj.name;
        this.surname = obj.surname;
        this.city = obj.city;
        this.age = Number(obj.age);
    }

    name;
    surname;
    city;
    age;
}

module.exports = {
    UpdateUserHistoryDto: UpdateUserDto
}