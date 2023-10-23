import express from 'express';
import { getAllCustomers, createCustomer, getSingleCustomer, updateCustomers, deleteCustomer } from '../controllers/customerController.js';
import { register, login } from '../controllers/userController.js';
const router = express.Router();

const Customer = app => {
    app.route('/Customers')
        .get(getAllCustomers)
        .post(createCustomer)
    app.route('/Customers/:id')
        .get(getSingleCustomer)
        .put(updateCustomers)
        .delete(deleteCustomer);
    //auth routes
    app.route('/auth/register')
        .post(register);
    app.route('/auth/login')
        .post(login);

}
export default Customer