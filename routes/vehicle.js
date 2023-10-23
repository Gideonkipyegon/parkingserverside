import express from 'express';
import { getAllVehicles, createVehicle, getSingleVehicle, updateVehicles, deleteVehicle } from '../controllers/VehicleController.js';
const router = express.Router();

const Vehicle = app => {
    app.route('/Vehicles')
        .get(getAllVehicles)
        .post(createVehicle)
    app.route('/Vehicles/:id')
        .get(getSingleVehicle)
        .put(updateVehicles)
        .delete(deleteVehicle);
}
export default Vehicle