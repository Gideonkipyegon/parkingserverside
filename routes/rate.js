import express from 'express';
import { getAllRates, createRate, getSingleRate, updateRates, deleteRate } from '../controllers/rateController.js';
const router = express.Router();

const Rate = app => {
    app.route('/Rates')
        .get(getAllRates)
        .post(createRate)
    app.route('/Rates/:id')
        .get(getSingleRate)
        .put(updateRates)
        .delete(deleteRate);
}
export default Rate