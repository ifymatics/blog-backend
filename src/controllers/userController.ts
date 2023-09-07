import { Request, Response, NextFunction } from "express";
import { db } from "./../database";
import { generateJwtToken } from "../utils/jwt-manager";
import { decrypter, hasher } from "../utils/encrypter-decrypter";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, username, email, password } = req.body;
  const hashedPassword = await hasher(password);
  const signupQuery =
    "INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)";
  const checkUserExist = "SELECT * FROM users WHERE username =? OR email=?";

  const values = [firstname, lastname, username, email, hashedPassword];
  const checkValue = [username, email];

  try {
    //check if username or email already exist
    const [field, column] = await db.query(checkUserExist, checkValue);

    if (Array.isArray(field) && field.length > 0)
      return res.status(409).json("username or email is already in use.");

    //create user
    const result = await db.query(signupQuery, values);
    return res.status(201).json("user created successfully");
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json("something went wrong");
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  const searchUsername =
    "SELECT id, username, password FROM users WHERE username = ?";
  try {
    const [userData] = await db.query(searchUsername, [username]);
    if (Array.isArray(userData) && userData.length === 0)
      return res.status(404).json("user not found.");

    if (!Array.isArray(userData)) {
      return res.status(500).json("something went wrong");
    }

    // Check password validity
    const passwordMatch = await decrypter(
      (userData[0] as { password: string }).password,
      password
    );
    if (!passwordMatch) return res.status(403).json("Invalid credentaials");

    // generate jwt token for user
    const userToken = await generateJwtToken(
      (userData[0] as { id: number }).id.toString()
    );
    return res.status(200).json({ token: userToken });
  } catch (error: any) {
    //console.log(error.message);
    return res.status(500).json("Something went wrong");
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const profileQuery = `SELECT id, username, email FROM users WHERE id = ?`;
  try {
    console.log("profile");
    const result = await db.query(profileQuery, [+req.currentUserId]);
    return res.status(200).json(result[0]);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json("Something went wrong");
  }
};
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname } = req.body;
  const profileQuery = `SELECT id FROM users WHERE id = ?`;
  try {
    const result = await db.query(profileQuery, [+req.currentUserId]);
    if (!result[0]) return res.status(404).json("No record found");

    const updateQuery = `UPDATE users SET firstname = ?, lastname = ? WHERE id = ?`;
    await db.query(updateQuery, [firstname, lastname, +req.currentUserId]);

    return res.status(200).json("updated successfully");
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json("Something went wrong");
  }
};
export const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentUserId } = req;
  const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
  try {
    await db.query(deleteUserQuery, [currentUserId]);
    res.status(200).json({});
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
