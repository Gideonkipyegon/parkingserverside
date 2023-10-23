import express from 'express';
import { getAllAdmins, createAdmin, getSingleAdmin, updateAdmins, deleteAdmin } from '../controllers/adminController.js';
const router = express.Router();

const Admins = app => {
    app.route('/Admins')
        .get(getAllAdmins)
        .post(createAdmin)
    app.route('/Admins/:id')
        .get(getSingleAdmin)
        .put(updateAdmins)
        .delete(deleteAdmin);
    //auth routes
    // app.route('/auth/register')
    //     .post(register);
    // app.route('/auth/login')
    //     .post(login);
}
export default Admins