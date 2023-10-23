import sql from "mssql";
import config from "../db/config.js";

// GET ALL  RATES
export const getAllRates = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Rates");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE  RATES
export const createRate = async(req, res) => {
    try {
        const { RateID, VehicleType, SpotType, HourlyRate, DailyRate, MonthlyRate } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("RateID", sql.Int, RateID)
            .input("VehicleType", sql.VarChar, VehicleType)
            .input("SpotType", sql.VarChar, SpotType)
            .input("HourlyRate ", sql.VarChar, HourlyRate)
            .input(" DailyRate ", sql.VarChar, DailyRate)
            .input("MonthlyRate ", sql.VarChar, MonthlyRate)
            .query(
                "INSERT INTO Rates(RateID,VehicleType,SpotType,HourlyRate,DailyRate,MonthlyRate ) VALUES (@RateID,@VehicleType,@SpotType,@HourlyRate,@DailyRate,@MonthlyRate )"
            );
        res.status(200).json("created successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET  RATES
export const getSingleRate = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Rates WHERE RateID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE RATES
export const updateRates = async(req, res) => {
    try {
        const { id } = req.params;
        const { RateID, VehicleType, SpotType, HourlyRate, DailyRate, MonthlyRate } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("RateID", sql.Int, RateID)
            .input("VehicleType", sql.VarChar, VehicleType)
            .input("SpotType", sql.VarChar, SpotType)
            .input("HourlyRate ", sql.VarChar, HourlyRate)
            .input("DailyRate ", sql.VarChar, DailyRate)
            .input("MonthlyRate ", sql.VarChar, MonthlyRate)
            .query(
                `UPDATE Rates SET RateID=@RateID,VehicleType = @VehicleType, SpotType = @SpotType,HourlyRate = @HourlyRate,DailyRate=@DailyRate,MonthlyRate=@MonthlyRate WHERE RateID = @id`
            );
        res.status(200).json(" updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE RATES
export const deleteRate = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Rates WHERE RateID = @id`);
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};