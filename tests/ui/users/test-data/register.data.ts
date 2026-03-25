import { faker } from "@faker-js/faker";

export const userData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  notUniqueEmail: "john.doe@test.com",
  date: faker.date.anytime(),
};

const defaultRequiredFieldCaseData = {
  firstName: userData.firstName,
  lastName: userData.lastName,
  email: userData.email,
  password: userData.password,
};

export const requiredFieldCases = [
  {
    testName: "a new user should not be created due to missing first name",
    ...defaultRequiredFieldCaseData,
    firstName: "",
    errorSelector: "#octavalidate_firstname",
  },
  {
    testName: "a new user should not be created due to missing last name",
    ...defaultRequiredFieldCaseData,
    lastName: "",
    errorSelector: "#octavalidate_lastname",
  },
  {
    testName: "a new user should not be created due to missing email",
    ...defaultRequiredFieldCaseData,
    email: "",
    errorSelector: "#octavalidate_email",
  },
  {
    testName: "a new user should not be created due to missing password",
    ...defaultRequiredFieldCaseData,
    password: "",
    errorSelector: "#octavalidate_password",
  },
];
