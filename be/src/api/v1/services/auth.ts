import { userLogin } from "../models/authModel";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env";

export const loginUser = async (
  username: string,
  hashedPassword: string
): Promise<{
  status: number;
  message: string;
  token?: string;
  userData?: any;
}> => {
  try {
    const response = await userLogin(username, hashedPassword);
    const {
      status = 500,
      userData,
      message = "something went wrong",
    } = response;
    if (status === 200) {
      const token = jwt.sign(
        {
          username: userData.USER_CD,
        },
        env.JWT_SECRET as string
      );
      return {
        status: 200,
        message: "Login successfull",
        token: token,
        userData: userData,
      };
    } else {
      // throw new appError(status, message);
      return {
        status,
        message,
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};
