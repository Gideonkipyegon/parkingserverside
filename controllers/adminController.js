import sql from "mssql";
import config from "../db/config.js";

// GET ALL  ADMIN
export const getAllAdmins = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Admins");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE  ADMIN
export const createAdmin = async(req, res) => {
    try {
        const { AdminID, Username, Password, FirstName, LastName, EmailAddress } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("AdminID", sql.Int, AdminID)
            .input("Username", sql.VarChar, Username)
            .input("Password", sql.VarChar, Password)
            .input("FirstName", sql.VarChar, FirstName)
            .input("LastName", sql.VarChar, LastName)
            .input("EmailAddress", sql.VarChar, EmailAddress)
            .query(
                "INSERT INTO Admins(AdminID,Username,Password,FirstName, LastName,EmailAddress) VALUES (@AdminID,@Username,@Password,@FirstName,@LastName,@EmailAddress )"
            );
        res.status(200).json("added successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET  ADMIN BY ID
export const getSingleAdmin = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Admins WHERE CustomerID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE  ADMIN
export const updateAdmins = async(req, res) => {
    try {
        const { id } = req.params;
        const { AdminID, Username, Password, FirstName, LastName, EmailAddress } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("AdminID", sql.Int, AdminID)
            .input("Username", sql.VarChar, Username)
            .input("Password", sql.VarChar, Password)
            .input("FirstName", sql.VarChar, FirstName)
            .input("LastName", sql.VarChar, LastName)
            .input("EmailAddress", sql.VarChar, EmailAddress)
            .query(
                `UPDATE Admins SET AdminID=@AdminID, Username = @Username, Password = @Password,FirstName = @FirstName,LastName=@LastName,EmailAddress=@EmailAddress WHERE AdminID = @id`
            );
        res.status(200).json("updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE  ADMIN
export const deleteAdmin = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Admins WHERE AdminID = @id`);
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};