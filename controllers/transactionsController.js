import sql from "mssql";
import config from "../db/config.js";

// GET ALL  TRANSACTION
export const getAllTransaction = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM  Transactions");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE TRANSACTION
export const creatTransaction = async(req, res) => {
    try {
        const { TransactionID, CustomerID, VehicleID, SpotID, CheckInTime, CheckOutTime, PaymentStatus } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("TransactionID", sql.Int, TransactionID)
            .input("CustomerID", sql.VarChar, CustomerID)
            .input("VehicleID", sql.VarChar, VehicleID)
            .input("SpotID", sql.VarChar, SpotID)
            .input("CheckInTime", sql.VarChar, CheckInTime)
            .input("CheckOutTime", sql.VarChar, CheckOutTime)
            .input("PaymentStatus", sql.VarChar, PaymentStatus)
            .query(
                "INSERT INTO Vehicles(TransactionID,CustomerID,VehicleID,SpotID,CheckInTime, CheckOutTime,PaymentStatus) VALUES (@TransactionID,@CustomerID,@VehicleID,@SpotID,@CheckInTime,@CheckOutTime,@PaymentStatus)"
            );
        res.status(200).json(" You are registered successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET TRANSACTION BY ID
export const getSingleTransaction = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`SELECT * FROM Customers WHERE CustomerID = @id`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//UPDATE TRANSACTION
export const updateTransaction = async(req, res) => {
    try {
        const { id } = req.params;
        const { TransactionID, CustomerID, VehicleID, SpotID, CheckInTime, CheckOutTime, PaymentStatus } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input("TransactionID", sql.VarChar, TransactionID)
            .input("CustomerID", sql.VarChar, CustomerID)
            .input("VehicleID ", sql.VarChar, VehicleID)
            .input("SpotID", sql.VarChar, SpotID)
            .input("CheckInTime", sql.VarChar, CheckInTime)
            .input("CheckOutTime", sql.VarChar, CheckOutTime)
            .input("PaymentStatus", sql.VarChar, PaymentStatus)
            .query(
                `UPDATE Vehicles SET  TransactionID=@ TransactionID, CustomerID = @CustomerID, VehicleID = @VehicleID,SpotID = @SpotID,CheckInTime=@CheckInTime,CheckOutTime=@CheckOutTime,PaymentStatus=@PaymentStatus WHERE VehicleID = @id`
            );
        res.status(200).json("transaction updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE TRANSACTION
export const deleteTransaction = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Transactions WHERE VehicleID = @id`);
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};