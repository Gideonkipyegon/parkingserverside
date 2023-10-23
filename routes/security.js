import express from 'express';
import { getAllSecurity, createSecurity, getSingleSecurity, updateSecurity, deleteSecurity } from '../controllers/securityController.js';
const router = express.Router();

const Security = app => {
    app.route('/SecurityCameraFootage')
        .get(getAllSecurity)
        .post(createSecurity)
    app.route('/SecurityCameraFootage/:id')
        .get(getSingleSecurity)
        .put(updateSecurity)
        .delete(deleteSecurity);
}
export default Security