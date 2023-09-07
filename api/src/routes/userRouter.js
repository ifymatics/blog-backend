"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const router = express_1.default.Router();
exports.userRouter = router;
router.post("/signup", controllers_1.signup);
router.post("/signin", controllers_1.signin);
router.get("/profile", isLoggedIn_1.isLoggedIn, controllers_1.getProfile);
// PUT /profile
router.patch("/profile", isLoggedIn_1.isLoggedIn, controllers_1.updateProfile);
// DELETE /profile
router.delete("/profile", isLoggedIn_1.isLoggedIn, controllers_1.deleteProfile);
