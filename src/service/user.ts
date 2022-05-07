import { User } from "../models/user";
import { userType } from "../types/user";
import { Op } from "sequelize";
import { userResponse } from "../types/userResponse";
import argon2 from "argon2";
import { createToken, sendRefreshToken } from "../utils/auth";
import { Response } from "express";

export const registerUserService = async (
  registerInput: userType
): Promise<userResponse | undefined> => {
  try {
    const existingUser = await User.findOne({
      where: {
        username: {
          [Op.eq]: registerInput.username,
        },
      },
    });
    if (existingUser) {
      return {
        code: 400,
        status: false,
        message: "Username already exists",
      };
    }
    let hashedPassword = null;
    if (registerInput.password) {
      hashedPassword = await argon2.hash(registerInput.password);
    }

    const newUser = await User.create({
      username: registerInput.username,
      password: hashedPassword,
      email: registerInput.email,
      address: registerInput.address,
      gender: registerInput.gender,
      phone: registerInput.phone,
      date_of_birth: registerInput.date_of_birth,
      role: registerInput.role
    });
    if (newUser) {
      const resultUser: userType = newUser as unknown as userType;
      return {
        code: 200,
        status: true,
        message: "User registration successful",
        user: {
          id: resultUser.id,
          username: resultUser.username,
          address: resultUser.address,
          email: resultUser.email,
          gender: resultUser.gender,
          date_of_birth: resultUser.date_of_birth,
          updatedAt: resultUser.updatedAt,
          createdAt: resultUser.createdAt,
          phone: resultUser.phone,
          role: resultUser.role
        },
      };
    }
  } catch (err) {
    return {
      code: 500,
      status: false,
      message: err.message,
    };
  }
};
export const loginUserService = async ({
  username,
  password,
  res
}: {
  username: string;
  password: string;
  res: Response;
}) : Promise<userResponse> => {
  const existingUser = await User.findOne({
    where: {
      username: {
        [Op.eq]: username,
      },
    },
  });
  if (!existingUser) {
    return {
      code: 400,
      status: false,
      message: "User not found",
    };
  }
  const resultUser: userType = existingUser as unknown as userType;
  const isPasswordValid = await argon2.verify(
    resultUser.password as string,
    password
  );
  if (!isPasswordValid) {
    return {
      code: 400,
      status: false,
      message: "Incorrect password",
    };
  }
  
  sendRefreshToken(res,resultUser);

  return {
    code: 200,
    status: true,
    message: "Login successful",
    user: {
      id: resultUser.id,
      username: resultUser.username,
      address: resultUser.address,
      email: resultUser.email,
      gender: resultUser.gender,
      date_of_birth: resultUser.date_of_birth,
      updatedAt: resultUser.updatedAt,
      createdAt: resultUser.createdAt,
      phone: resultUser.phone,
      role: resultUser.role
    },
    token: createToken("accessToken",{
      id: resultUser.id,
      username: resultUser.username,
      address: resultUser.address,
      email: resultUser.email,
      gender: resultUser.gender,
      date_of_birth: resultUser.date_of_birth,
      updatedAt: resultUser.updatedAt,
      createdAt: resultUser.createdAt,
      phone: resultUser.phone,
      role: resultUser.role
    }),
  };
};
