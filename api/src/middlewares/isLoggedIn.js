"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_manager_1 = require("../utils/jwt-manager");
dotenv_1.default.config();
const isLoggedIn = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized request!" });
        //throw new NotAuthorizedError
    }
    try {
        const UserToken = req.headers.authorization.split(" ")[1];
        const { aud } = (await (0, jwt_manager_1.verifyJwtToken)(UserToken));
        req.currentUserId = aud;
        //next();
    }
    catch (error) {
        //console.log(error?.response);
        return res.status(401).json({ message: "You're not logged in!" });
    }
    next();
};
exports.isLoggedIn = isLoggedIn;
