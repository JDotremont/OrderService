export class ProductDTO {
    constructor(id, name, qty, price, status, image, description) {
        this.id = id;
        this.name = name;
        this.qty = qty;
        this.price = price;
        this.status = status;
        this.image = image;
        this.description = description;
    }
}