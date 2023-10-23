import express from 'express';
import { getAllReports, createReport, getSingleReport, updateReports, deleteReport } from '../controllers/reportController.js';
const router = express.Router();

const Report = app => {
    app.route('/Reports')
        .get(getAllReports)
        .post(createReport)
    app.route('/Reports/:id')
        .get(getSingleReport)
        .put(updateReports)
        .delete(deleteReport);
}
export default Report