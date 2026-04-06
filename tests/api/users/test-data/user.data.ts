import { faker } from "@faker-js/faker";

export const userIds = {
    userIdToGet: 1,
    userIdToDelete: 4,
    userIdToPatch: 4,
    userIdToPut: 4,
    userIdToTestPutComments: 3,
}

export const userPayload = {
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: faker.internet.password(),
  avatar: faker.image.personPortrait(),
  id: undefined,
};

export const patchUserPayload = {
  email: process.env.TEST_USER_EMAIL,
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: process.env.TEST_USER_PASSWORD,
  avatar: faker.image.personPortrait(),
  id: undefined,
};

const defaultApiRequiredFieldCaseData = {
  email: userPayload.email,
  firstname: userPayload.firstname,
  lastname: userPayload.lastname,
  password: userPayload.password,
  avatar: userPayload.avatar,
  id: userPayload.id
};

export const apiRequiredFieldCases = [
    {
        testName: "a new user should not be created due to missing first name",
        ...defaultApiRequiredFieldCaseData,
        firstname: ""
    },    {
        testName: "a new user should not be created due to missing last name",
        ...defaultApiRequiredFieldCaseData,
        lastname: ""
    },
        {
        testName: "a new user should not be created due to missing email",
        ...defaultApiRequiredFieldCaseData,
        email: ""
    },
        {
        testName: "a new user should not be created due to missing password",
        ...defaultApiRequiredFieldCaseData,
        password: ""
    },
        {
        testName: "a new user should not be created due to missing avatar",
        ...defaultApiRequiredFieldCaseData,
        avatar: ""
    }
]

export const apiPutUserRequiredFieldCases = [
    {
        testName: "a given user data should not be updated due to missing first name",
        ...defaultApiRequiredFieldCaseData,
        firstname: ""
    },    {
        testName: "a given user data should not be updated due to missing last name",
        ...defaultApiRequiredFieldCaseData,
        lastname: ""
    },
        {
        testName: "a given user data should not be updated due to missing email",
        ...defaultApiRequiredFieldCaseData,
        email: ""
    },
        {
        testName: "a given user data should not be updated due to missing password",
        ...defaultApiRequiredFieldCaseData,
        password: ""
    },
        {
        testName: "a given user data should not be updated due to missing avatar",
        ...defaultApiRequiredFieldCaseData,
        avatar: ""
    }
]
