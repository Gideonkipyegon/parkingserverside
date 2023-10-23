import sql from "mssql";
import config from "../db/config.js";

// GET ALL  REPORT
export const getAllReports = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Reports");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE REPORT
export const createReport = async(req, res) => {
    try {
        const { ReportID, AdminID, ReportDate, ReportType, ReportData } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("ReportID", sql.Int, ReportID)
            .input("AdminID", sql.VarChar, AdminID)
            .input("ReportDate", sql.VarChar, ReportDate)
            .input("ReportType ", sql.VarChar, ReportType)
            .input("ReportData ", sql.VarChar, ReportData)
            .query(
                "INSERT INTO Reports(ReportID,AdminID,ReportDate,ReportType,ReportData ) VALUES (@ReportID,@AdminID,@ReportDate,@ReportType,@ReportData )"
            );
        res.status(200).json("added successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET REPORT BY ID
export const getSingleReport = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Reports WHERE FootageID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE REPORT
export const updateReports = async(req, res) => {
    try {
        const { id } = req.params;
        const { ReportID, AdminID, ReportDate, ReportType, ReportData } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input(" ReportID", sql.VarChar, ReportID)
            .input("AdminID", sql.VarChar, AdminID)
            .input("ReportDate", sql.VarChar, ReportDate)
            .input("ReportType", sql.VarChar, ReportType)
            .input("ReportData", sql.VarChar, ReportData)
            .query(
                `UPDATE Reports SET ReportID=@ReportID,AdminID = @AdminID, ReportDate = @ReportDate,ReportType = @ReportType,ReportData = @ReportData WHERE ReportID = @id`
            );
        res.status(200).json(" updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
}

//DELETE SECURITY CAMERA FOOTAGE
export const deleteReport = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Reports WHERE ReportID = @id`);
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};