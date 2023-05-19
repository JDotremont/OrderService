export class UserDTO {
    constructor(id, name, email, password, role, image) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.image = image;
    }
}