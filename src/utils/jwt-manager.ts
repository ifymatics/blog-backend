import jwt from "jsonwebtoken";

/**
 * Function for generating token
 * @name verifyJwtToken
 * @function
 * @params userId - string,type - string
 * @returns {Promise} - generated Token
 */
export interface User {
  username: string;
  id: string;
}
export const generateJwtToken = (userId: string) => {
  if (typeof userId !== "string") return;
  return new Promise((resolve, reject) => {
    const payload = {};
    let secret = process.env.JWT_ACCESS_TOKEN_KEY!;
    let options = {
      expiresIn: "3hr",
      issuer: "medicaldepartures",
      audience: userId,
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

/**
 * Function for verifying token
 * @name verifyJwtToken
 * @function
 * @params token - string, type - string
 * @returns {Promise} - verified payload
 */
export const verifyJwtToken = (token: string) => {
  let secret = process.env.JWT_ACCESS_TOKEN_KEY!;

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, value) => {
      if (err) reject(err);
      resolve(value);
    });
  });
};
