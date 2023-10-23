import sql from "mssql";
import config from "../db/config.js";

// GET ALL  VECHICLES
export const getAllVehicles = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Vehicles");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE VEHICLES
export const createVehicle = async(req, res) => {
    try {
        const { VehicleID, LicensePlateNumber, VehicleType, OwnerInformation } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("VehicleID", sql.Int, VehicleID)
            .input(" LicensePlateNumber", sql.VarChar, LicensePlateNumber)
            .input(" VehicleType", sql.VarChar, VehicleType)
            .input("OwnerInformation ", sql.VarChar, OwnerInformation)
            .query(
                "INSERT INTO Vehicles(VehicleID,LicensePlateNumber,VehicleType,OwnerInformation , Floor) VALUES (@VehicleID,@LicensePlateNumber,@VehicleType,@OwnerInformation )"
            );
        res.status(200).json(" Vehicle added successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET VEHICLE BY ID
export const getSingleVehicle = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Vehicles WHERE VehicleID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE VEHICLES
export const updateVehicles = async(req, res) => {
    try {
        const { id } = req.params;
        const { VehicleID, LicensePlateNumber, VehicleType, OwnerInformation } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            // .input("VehicleID", sql.VarChar, VehicleID)
            .input("LicensePlateNumber", sql.VarChar, LicensePlateNumber)
            .input("VehicleType", sql.VarChar, VehicleType)
            .input("OwnerInformation", sql.VarChar, OwnerInformation)
            .query(
                `UPDATE Vehicles SET LicensePlateNumber =@LicensePlateNumber, VehicleType=@VehicleType,OwnerInformation=@OwnerInformation WHERE VehicleID=@id`
            );
        res.status(200).json("Vehicles updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE VEHICLES
export const deleteVehicle = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Vehicles WHERE VehicleID=@id`);
        res.status(200).json("Vehicles deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};