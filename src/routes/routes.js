import { Router } from "express";
import { customerController } from "../controllers/customer.controller.js";
import { orderController } from "../controllers/order.controller.js";
import { productController } from "../controllers/product.controller.js";
import { userController } from "../controllers/user.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { orderBodySchema } from "../validations/order.body.schema.js";
import { productBodySchema } from "../validations/product.body.schema.js";
import { userBodySchema } from "../validations/user.body.schema.js";
import { customerBodySchema } from "../validations/customer.body.schema.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";
import { authorizationMiddleware } from "../middlewares/auth.middleware.js";
import { loginBodySchema } from "../validations/login.body.schema.js";
import { loginController } from "../controllers/login.controller.js";
import multer from "multer";

const upload = multer({ dest: './uploads/' });

export const routes = Router();

// Users routes
routes.route('/users')
    .get(jwtMiddleware, authorizationMiddleware('admin'), userController.getAllUsers)
    .post(upload.single('image'), validationMiddleware(userBodySchema),  userController.createUser)
    
    routes.route('/users/:id')
    .get(jwtMiddleware, authorizationMiddleware('admin'), userController.getUserById)
    .delete(jwtMiddleware, authorizationMiddleware('admin'), userController.deleteUser)
    .put(jwtMiddleware, authorizationMiddleware('admin'), userController.updateUser)

// Customers routes
routes.route('/customers')
    .get(jwtMiddleware, customerController.getAllCustomers)
    .post(validationMiddleware(customerBodySchema), jwtMiddleware, authorizationMiddleware(['seller', 'admin']), customerController.createCustomer)

routes.route('/customers/:id')
    .get(jwtMiddleware, customerController.getCustomerById)
    .put(jwtMiddleware, authorizationMiddleware(['seller', 'admin']), customerController.updateCustomer)
    .delete(jwtMiddleware, authorizationMiddleware(['seller', 'admin']), customerController.deleteCustomer)

// Products routes
routes.route('/products')
    .get(jwtMiddleware, productController.getAllProducts)

routes.route('/products')
    .post(upload.single('image'), validationMiddleware(productBodySchema), jwtMiddleware, authorizationMiddleware('admin'), productController.createProduct)

routes.route('/products/:id')
    .get(jwtMiddleware, productController.getProductById)
    .put(jwtMiddleware, authorizationMiddleware('admin'), productController.updateProduct)
    .delete(jwtMiddleware, authorizationMiddleware('admin'), productController.deleteProduct)

// Orders routes
routes.route('/orders')
    .get(jwtMiddleware, authorizationMiddleware(['seller', 'admin']), orderController.getOrders)
    .post(validationMiddleware(orderBodySchema), jwtMiddleware, authorizationMiddleware(['seller', 'admin']), orderController.createOrder)

routes.route('/orders/:id')
    .get(jwtMiddleware, authorizationMiddleware(['seller', 'admin']), orderController.getOrderById)
    .put(jwtMiddleware, authorizationMiddleware(['seller', 'admin']), orderController.updateOrder)
    .delete(jwtMiddleware, authorizationMiddleware(['seller', 'admin']), orderController.deleteOrder)


// Login route
routes.route('/login')
    .post(validationMiddleware(loginBodySchema), loginController.login)