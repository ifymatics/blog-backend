"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getProfile = exports.signin = exports.signup = void 0;
const database_1 = require("./../database");
const jwt_manager_1 = require("../utils/jwt-manager");
const encrypter_decrypter_1 = require("../utils/encrypter-decrypter");
const signup = async (req, res, next) => {
    const { firstname, lastname, username, email, password } = req.body;
    const hashedPassword = await (0, encrypter_decrypter_1.hasher)(password);
    const signupQuery = "INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)";
    const checkUserExist = "SELECT * FROM users WHERE username =? OR email=?";
    const values = [firstname, lastname, username, email, hashedPassword];
    const checkValue = [username, email];
    try {
        //check if username or email already exist
        const [field, column] = await database_1.db.query(checkUserExist, checkValue);
        if (Array.isArray(field) && field.length > 0)
            return res.status(409).json("username or email is already in use.");
        //create user
        const result = await database_1.db.query(signupQuery, values);
        return res.status(201).json("user created successfully");
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json("something went wrong");
    }
};
exports.signup = signup;
const signin = async (req, res, next) => {
    const { username, email, password } = req.body;
    const searchUsername = "SELECT id, username, password FROM users WHERE username = ?";
    try {
        const [userData] = await database_1.db.query(searchUsername, [username]);
        if (Array.isArray(userData) && userData.length === 0)
            return res.status(404).json("user not found.");
        if (!Array.isArray(userData)) {
            return res.status(500).json("something went wrong");
        }
        // Check password validity
        const passwordMatch = await (0, encrypter_decrypter_1.decrypter)(userData[0].password, password);
        if (!passwordMatch)
            return res.status(403).json("Invalid credentaials");
        // generate jwt token for user
        const userToken = await (0, jwt_manager_1.generateJwtToken)(userData[0].id.toString());
        return res.status(200).json({ token: userToken });
    }
    catch (error) {
        //console.log(error.message);
        return res.status(500).json("Something went wrong");
    }
};
exports.signin = signin;
const getProfile = async (req, res, next) => {
    const profileQuery = `SELECT id, username, email FROM users WHERE id = ?`;
    try {
        console.log("profile");
        const result = await database_1.db.query(profileQuery, [+req.currentUserId]);
        return res.status(200).json(result[0]);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json("Something went wrong");
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    const { firstname, lastname } = req.body;
    const profileQuery = `SELECT id FROM users WHERE id = ?`;
    try {
        const result = await database_1.db.query(profileQuery, [+req.currentUserId]);
        if (!result[0])
            return res.status(404).json("No record found");
        const updateQuery = `UPDATE users SET firstname = ?, lastname = ? WHERE id = ?`;
        await database_1.db.query(updateQuery, [firstname, lastname, +req.currentUserId]);
        return res.status(200).json("updated successfully");
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json("Something went wrong");
    }
};
exports.updateProfile = updateProfile;
const deleteProfile = async (req, res, next) => {
    const { currentUserId } = req;
    const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
    try {
        await database_1.db.query(deleteUserQuery, [currentUserId]);
        res.status(200).json({});
    }
    catch (error) {
        return res.status(500).json("Something went wrong");
    }
};
exports.deleteProfile = deleteProfile;
