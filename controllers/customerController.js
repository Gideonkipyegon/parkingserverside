import sql from "mssql";
import config from "../db/config.js";

// GET ALL  CUSTOMER
export const getAllCustomers = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Customers");
        res.json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//CREATE CUSTOMER
export const createCustomer = async(req, res) => {
    try {
        const { CustomerID, FirstName, LastName, EmailAddress, PhoneNumber, Address } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            // .input("CustomerID", sql.Int, CustomerID)
            .input("FirstName", sql.VarChar, FirstName)
            .input("LastName", sql.VarChar, LastName)
            .input("EmailAddress", sql.VarChar, EmailAddress)
            .input("PhoneNumber", sql.VarChar, PhoneNumber)
            .input("Address", sql.VarChar, Address)
            .query(
                "INSERT INTO Vehicles(FirstName,LastName,EmailAddress, PhoneNumber,Address) VALUES (@FirstName,@LastName,@EmailAddress,@PhoneNumber,@Address)"
            );
        res.status(200).json(" You are registered successfully");
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close();
    }
};

//GET CUSTOMER BY ID
export const getSingleCustomer = async(req, res) => {
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

//UPDATE CUSTOMER
export const updateCustomers = async(req, res) => {
    try {
        const { id } = req.params;
        const { CustomerID, FirstName, LastName, EmailAddress, PhoneNumber, Address } = req.body;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .input(" CustomerID", sql.VarChar, CustomerID)
            .input(" FirstName", sql.VarChar, FirstName)
            .input("LastName", sql.VarChar, LastName)
            .input("EmailAddress", sql.VarChar, EmailAddress)
            .input("PhoneNumber", sql.VarChar, PhoneNumber)
            .input("Address", sql.VarChar, Address)
            .query(
                `UPDATE Vehicles SET CustomerID=@CustomerID, FirstName = @FirstName, LastName = @LastName,EmailAddress = @EmailAddress,PhoneNumber=@PhoneNumber,Address=@Address WHERE VehicleID = @id`
            );
        res.status(200).json("Customers updated successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};

//DELETE CUSTOMER
export const deleteCustomer = async(req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input("id", sql.VarChar, id)
            .query(`DELETE FROM Customers WHERE VehicleID = @id`);
        res.status(200).json("Vehicles deleted successfully");
    } catch (error) {
        res.status(500).json(error.message);
    } finally {}
}; {
    sql.close();
};