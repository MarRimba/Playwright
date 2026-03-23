import { faker } from "@faker-js/faker";



export const loginUserData = {
userCorrectLogin : "Kerra.JD@test.net",
userCorrectPassword : "gdsa",
}

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
