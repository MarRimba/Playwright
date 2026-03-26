import { faker } from "@faker-js/faker";

export const userIds = {
    userIdToGet: 1,
    userIdToDelete: 2,
    userIdToPatch: 4,
    userIdToPut: 3,
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
