import sql from "mssql";
import config from "../db/config.js";

// GET ALL  SECURITY CAMERA FOOTAGE
export const getAllSecurity = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM SecurityCameraFootage");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE SECURITY CAMERA FOOTAGE
export const createSecurity = async(req, res) => {
    try {
        const { FootageID, SpotID, Timestamp, VideoImageFile } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("FootageID", sql.Int, FootageID)
            .input("SpotID", sql.VarChar, SpotID)
            .input("Timestamp", sql.VarChar, Timestamp)
            .input("VideoImageFile ", sql.VarChar, VideoImageFile)
            .query(
                "INSERT INTO SecurityCameraFootage(FootageID,SpotID,Timestamp,VideoImageFile ) VALUES (@FootageID,@SpotID,@Timestamp,@VideoImageFile )"
            );
        res.status(200).json("added successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET SECURITY CAMERA FOOTAGE BY ID
export const getSingleSecurity = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM SecurityCameraFootage WHERE FootageID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE SECURITY CAMERA FOOTAGE
export const updateSecurity = async(req, res) => {
    try {
        const { id } = req.params;
        const { FootageID, SpotID, Timestamp, VideoImageFile } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input(" FootageID", sql.VarChar, FootageID)
            .input("SpotID", sql.VarChar, SpotID)
            .input("Timestamp", sql.VarChar, Timestamp)
            .input("VideoImageFile", sql.VarChar, VideoImageFile)
            .query(
                `UPDATE SecurityCameraFootage SET FootageID=@FootageID,SpotID = @SpotID, Timestamp = @Timestamp,VideoImageFile = @VideoImageFile WHERE FootageID = @id`
            );
        res.status(200).json(" updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE SECURITY CAMERA FOOTAGE
export const deleteSecurity = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM SecurityCameraFootage WHERE FootageID = @id`);
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};