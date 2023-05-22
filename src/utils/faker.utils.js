import { User } from '../models/user.model.js';
import { Product } from '../models/product.model.js';
import { faker } from '@faker-js/faker';

const generateProducts = async () => {
    const products = [];
    const statusValues = ['in stock'];
  
    for (let i = 0; i < 10; i++) {

      const product = {
        name: faker.commerce.productName(),
        qty: Math.floor(Math.random() * 100) + 1,
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        status: faker.helpers.arrayElement(statusValues),
        alert: Math.floor(Math.random() * 10) + 1,
        image: faker.image.url()
      };
      products.push(product);
    }
  
    try {
      await Product.bulkCreate(products);
      console.log('150 products have been created.');
    } catch (error) {
      console.error('Error while creating products:', error);
    }
  };

const generateUsers = async () => {
    const users = [];

    for (let i = 0; i < 10; i++) {
        const user = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            image: faker.image.url(),
            role: 'seller',
        };
        users.push(user);
    }

    try {
        await User.bulkCreate(users);
        console.log('150 users have been created.');
    } catch (error) {
        console.error('Error while creating users:', error);
    }
};

export const fakerUtils = {  generateProducts, generateUsers };