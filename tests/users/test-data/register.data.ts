import { faker } from "@faker-js/faker";

export const userData = {
  firstName: "John",
  lastName: "Doe",
  password: "extremlySecretPassword",
  email: faker.internet.email(),
  notUniqueEmail: "john.doe@test.com",
  date: faker.date.anytime(),
};

export const requiredFieldCases = [
  {
    testName: "a new user should not be created due to missing first name",
    firstName: "",
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    errorSelector: "#octavalidate_firstname",
  },
  {
    testName: "a new user should not be created due to missing last name",
    firstName: userData.firstName,
    lastName: "",
    email: userData.email,
    password: userData.password,
    errorSelector: "#octavalidate_lastname",
  },
  {
    testName: "a new user should not be created due to missing email",
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: "",
    password: userData.password,
    errorSelector: "#octavalidate_email",
  },
  {
    testName: "a new user should not be created due to missing password",
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: "",
    errorSelector: "#octavalidate_password",
  },
];


