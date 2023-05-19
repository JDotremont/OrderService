export class OrderDTO {
    constructor(id, customer, product, qty, total) {
        this.id = id;
        this.customer = customer;
        this.product = product;
        this.qty = qty;
        this.total = total;
    }
}