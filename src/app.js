import express, {json} from 'express';
import expressAsyncErrors from 'express-async-errors';
import { sequelize } from './db.js';
import { Order } from './models/order.model.js';
import { OrderLine } from './models/order_line.model.js';
import { Product } from './models/product.model.js';
import { Customer } from './models/customer.model.js';
import { User } from './models/user.model.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { hashPassword } from './bcrypt.js';
import { routes } from './routes/routes.js';
import { jwtMiddleware } from './middlewares/jwt.middleware.js';
import cors from 'cors';
import { faker } from '@faker-js/faker';
import { fakerUtils } from './utils/faker.utils.js';


const app = express();
const port = 3000;

app.use(cors())
app.use(express.static('./uploads'));

app.use(express.json());


app.use(routes);

app.use(jwtMiddleware);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// hashPassword('585436').then((hash) => {
//     console.log(hash);
//     return hash;
// });

// sequelize.sync({ force: true })
//   .then(() => console.log('Database & tables created!'))
//   .catch(err => console.log(err));

const generateProducts = async () => {
  const products = [];

  for (let i = 0; i < 150; i++) {
    const product = {
      name: faker.commerce.productName(),
      qty: Math.floor(Math.random() * 100) + 1,
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      alert: Math.floor(Math.random() * 10) + 1,
      image: faker.image.imageUrl()
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

// fakerUtils.generateProducts();
// fakerUtils.generateUsers();
