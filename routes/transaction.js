import express from 'express';
import { getAllTransaction, creatTransaction, getSingleTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionsController.js';
const router = express.Router();

const Transaction = app => {
    app.route('/Transactions')
        .get(getAllTransaction)
        .post(creatTransaction)
    app.route('/Transactions/:id')
        .get(getSingleTransaction)
        .put(updateTransaction)
        .delete(deleteTransaction);
}
export default Transaction