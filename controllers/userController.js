import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.User) {
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized user' })
    }
}



export const register = async(req, res) => {
    const { FirstName, LastName, EmailAddress, PhoneNumber, Address, Password } = req.body;
    const hashedPassword = bcrypt.hashSync(Password, 10);
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('FirstName', sql.VarChar, FirstName)
            .input('EmailAddress', sql.VarChar, EmailAddress)
            .query('SELECT * FROM Customers WHERE FirstName=@FirstName OR EmailAddress=@EmailAddress');
        const user = result.recordset[0];

        if (user) {
            res.status(409).json({ error: 'user already exist' });
        } else {
            // let pool = await sql.connect(config.sql);
            await pool.request()
                .input('FirstName', sql.VarChar, FirstName)
                .input('LastName', sql.VarChar, LastName)
                .input('EmailAddress', sql.VarChar, EmailAddress)
                .input('PhoneNumber', sql.VarChar, PhoneNumber)
                .input('Address', sql.VarChar, Address)
                .input('Password', sql.VarChar, hashedPassword)
                .query('INSERT INTO Customers(FirstName, LastName, EmailAddress, PhoneNumber,Address,Password) values(@FirstName,@LastName,@EmailAddress,@PhoneNumber,@Address,@Password)');
            res.status(200).send({ message: "user created successfully" });
        }
    } catch (error) {
        res.status(200).json(error.message);
    } finally {
        sql.close()
    }
};

export const login = async(req, res) => {
    const { FirstName, password } = req.body;

    // Validate user input
    if (!FirstName || !password) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input('FirstName', sql.VarChar, FirstName)
            .query('SELECT * FROM Customers WHERE FirstName=@FirstName');
        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed. Wrong credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed. Wrong credentials' });
        }

        const token = jwt.sign({
                FirstName: user.FirstName,
                LastName: user.LastName
            },
            config.jwt_secret, { expiresIn: '1h' } // Token expires in 1 hour
        );

        return res.status(200).json({
            FirstName: user.FirstName,
            LastName: user.LastName,
            id: user.UserID,
            token: token
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (sql) {
            await sql.close();
        }
    }
};