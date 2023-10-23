import express from 'express';
import config from "./db/config.js";
import bodyParser from "body-parser";
import customer from './routes/customer.js';
import admin from './routes/admin.js';
import alert from './routes/alert.js';
import ParkingSport from './routes/ParkingSpots .js';
import rate from './routes/rate.js'
import report from './routes/report.js';
import security from './routes/security.js';
import transaction from './routes/transaction.js';
import vehicle from './routes/vehicle.js';
import cors from "cors";
const app = express();
const port = 3001; // Define your desired port number
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//routes set up
customer(app);
admin(app);
alert(app);
ParkingSport(app);
rate(app);
report(app);
security(app);
transaction(app);
vehicle(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});