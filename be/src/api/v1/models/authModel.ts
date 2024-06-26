import { connectToDB } from "../../../config/database";

export const userLogin = async (
  username: string,
  hashedPassword: string
): Promise<{ status?: number; message?: string; userData?: any }> => {
  try {
    const connection = await connectToDB();
    const result = await connection.execute(
      `SELECT USER_CD, USER_PASSWORD FROM secu_user_mst WHERE USER_CD = :username AND USER_PASSWORD = :hashedPassword`,
      { username, hashedPassword }
    );

    if (result.rows && result.rows.length > 0) {
      const rows: any[] = result.rows;
      const users = rows.map((row) => {
        return {
          USER_CD: row[0],
        };
      });
      const userData = users[0];
      return { status: 200, message: "User logged in successfully", userData };
    } else {
      // throw { statusCode: 401, message: "Invalid username or password" };
      // throw new appError(401, "Invalid username or password");
      return { status: 401, message: "Invalid username or password" };
    }
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};
