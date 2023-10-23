import express from 'express';
import { getAllParkingSpots, createParkingSpots, getSingleParkingSpots, updateParkingSpots, deleteParkingSpots } from '../controllers/ParkingSpotsController.js';
const router = express.Router();

const ParkingSpots = app => {
    app.route('/ParkingSpots')
        .get(getAllParkingSpots)
        .post(createParkingSpots)
    app.route('/ParkingSpots/:id')
        .get(getSingleParkingSpots)
        .put(updateParkingSpots)
        .delete(deleteParkingSpots);
}
export default ParkingSpots