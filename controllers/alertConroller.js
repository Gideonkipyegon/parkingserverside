import sql from "mssql";
import config from "../db/config.js";

// GET ALL  ALERTS
export const getAllAlerts = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Alerts");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE  ALERTS
export const createAlert = async(req, res) => {
    try {
        const { AlertID, SpotID, AlertType, Timestamp, Description } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("AlertID", sql.Int, AlertID)
            .input("SpotID", sql.VarChar, SpotID)
            .input("AlertType", sql.VarChar, AlertType)
            .input("Timestamp", sql.VarChar, Timestamp)
            .input("Description", sql.VarChar, Description)
            .query(
                "INSERT INTO Alerts(AlertID,SpotID,AlertType,Timestamp, Description) VALUES (@AlertID,@SpotID,@AlertType,@Timestamp,@Description )"
            );
        res.status(200).json("added successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET  ALERTS BY ID
export const getSingleAlert = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Alerts WHERE CustomerID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE  ALERTS
export const updateAlerts = async(req, res) => {
    try {
        const { id } = req.params;
        const { AlertID, SpotID, AlertType, Timestamp, Description } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input(" AlertID", sql.VarChar, AlertID)
            .input(" SpotID", sql.VarChar, SpotID)
            .input("AlertType", sql.VarChar, AlertType)
            .input("Timestamp", sql.VarChar, Timestamp)
            .input("Description", sql.VarChar, Description)
            .query(
                `UPDATE Alerts SET AlertID=@AlertID, SpotID = @SpotID, AlertType = @AlertType,Timestamp = @Timestamp,Description=@Description WHERE AlertID = @id`
            );
        res.status(200).json("updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE  ALERTS
export const deleteAlert = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Alerts WHERE VehicleID = @id`);
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};