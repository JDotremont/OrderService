import express, {json} from 'express';
import expressAsyncErrors from 'express-async-errors';
import { sequelize } from './models/index.js';
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
import './models/index.js'


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

// fakerUtils.generateProducts();
// fakerUtils.generateUsers();
