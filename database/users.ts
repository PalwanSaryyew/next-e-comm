import { pool } from "./dbCon.mjs";
import { BusinessModal, UserModal } from "./types";

export const getEmail = async (email: string) => {
   const [row]: any = await pool.query(`
        select * from users
        WHERE email =?;
    `,[email])
    return row[0]
};
export const getId = async (id: string | unknown) => {
   const [row]: any = await pool.query(`
        select * from users
        WHERE id =?;
    `,[id])
    return row[0]
};

export const createUser = async (user: UserModal) => {
   const now = new Date()
   const results = await pool.query(
      `INSERT INTO users
         (username, password, email, user_role)
      VALUES
         (?, ?, ?, ?);`,
      [
         user.username,
         user.password,
         user.email,
         user.role,
      ]
   );
   return results;
};

export const createBusiness = async (user: BusinessModal) => {
   const results = await pool.query(
      `UPDATE users
      SET business_name = ?,
          user_role = 'business'
      WHERE id = ?;`,
      [
         user.business_name,
         user.id
      ]
   );
   const result = await getId(user.id)
   return result;
};