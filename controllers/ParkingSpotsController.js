import sql from "mssql";
import config from "../db/config.js";

// GET ALL  COMMENT
export const getAllParkingSpots = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM ParkingSpots");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE COMMENT
export const createParkingSpots = async(req, res) => {
    try {
        const { SpotID, SpotNumber, SpotType, Availability, Floor } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            // .input("SpotID", sql.Int, SpotID)
            .input("SpotNumber", sql.VarChar, SpotNumber)
            .input("SpotType", sql.VarChar, SpotType)
            .input("Availability", sql.VarChar, Availability)
            .input("Floor", sql.VarChar, Floor)
            .query(
                "INSERT INTO ParkingSpots(SpotNumber,SpotType,Availability, Floor) VALUES (@SpotNumber,@Availability,@SpotType, @Floor)"
            );
        res.status(200).json(" ParkingSpots created successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET COMMENT BY ID
export const getSingleParkingSpots = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM ParkingSpots WHERE SpotID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE COMMENT
export const updateParkingSpots = async(req, res) => {
    try {
        const { id } = req.params;
        const { SpotID, SpotNumber, SpotType, Availability, Floor } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("SpotID", sql.VarChar, SpotID)
            .input("SpotNumber", sql.VarChar, SpotNumber)
            .input("SpotType", sql.VarChar, SpotType)
            .input("Availability", sql.VarChar, Availability)
            .input("Floor", sql.VarChar, Floor)
            .query(
                `UPDATE ParkingSpots SET SpotNumber = @SpotNumber, SpotType = @SpotType,Availability = @Availability,Floor = @Floor WHERE SpotID = @id`
            );
        res.status(200).json("ParkingSpots updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE COMMENT
export const deleteParkingSpots = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM ParkingSpots WHERE SpotID = @id`);
        res.status(200).json("ParkingSpots deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};