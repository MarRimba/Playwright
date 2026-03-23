import "dotenv/config";
import { faker } from "@faker-js/faker";

export const loginUserData = {
  userCorrectLogin: process.env.LOGIN_EMAIL,
  userCorrectPassword: process.env.LOGIN_PASSWORD,
};

export const invalidLoginCases = [
  {
    testName: "User should not be logged due to incorrect password",
    email: loginUserData.userCorrectLogin,
    password: faker.internet.password({ length: 5, memorable: false }),
    shouldValidatePlaceholder: false,
  },
  {
    testName: "User should not be logged due to incorrect user mail",
    email: faker.internet.email(),
    password: loginUserData.userCorrectPassword,
    shouldValidatePlaceholder: true,
  },
  {
    testName:
      "User should not be logged due to incorrect user mail (space in password)",
    email: `" " + ${loginUserData.userCorrectPassword}`,
    password: loginUserData.userCorrectPassword,
    shouldValidatePlaceholder: true,
  },
];
