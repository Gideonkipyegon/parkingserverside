import express from 'express';
import { getAllAlerts, createAlert, getSingleAlert, updateAlerts, deleteAlert } from '../controllers/alertConroller.js';
const router = express.Router();

const Alert = app => {
    app.route('/Alerts')
        .get(getAllAlerts)
        .post(createAlert)
    app.route('/Alerts/:id')
        .get(getSingleAlert)
        .put(updateAlerts)
        .delete(deleteAlert);
}
export default Alert