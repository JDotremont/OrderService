export class CustomerDto {
    constructor(id, email, firstname, lastname, street, number, zipcode, city, country) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.street = street;
        this.number = number;
        this.zipcode = zipcode;
        this.city = city;
        this.country = country;
    }
}