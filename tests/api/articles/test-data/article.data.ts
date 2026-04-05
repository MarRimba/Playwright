import { faker } from "@faker-js/faker";

export const articlePayload = {
  title: faker.lorem.words({ min: 6, max: 10 }),
  body: faker.lorem.paragraphs({ min: 2, max: 4 }),
  date: faker.date.past(),
  image: faker.image.personPortrait(),
};

export const defaultApiRequiredFieldCaseData = {
  title: articlePayload.title,
  body: articlePayload.body,
  date: articlePayload.date,
  image: articlePayload.image,
};

export const defaultApiRequiredFieldCases = [
  {
    testName: "a new article should not be created due to missing title",
    ...defaultApiRequiredFieldCaseData,
    title: "",
  },
  {
    testName: "a new article should not be created due to missing body",
    ...defaultApiRequiredFieldCaseData,
    body: "",
  },
  {
    testName: "a new article should not be created due to missing date",
    ...defaultApiRequiredFieldCaseData,
    date: "",
  },
];

export const apiPutArticleRequiredFieldCases = [
  {
    testName: "a given article should not be updated due to missing title",
    ...defaultApiRequiredFieldCaseData,
    title: "",
  },
  {
    testName: "a given article should not be updated due to missing body",
    ...defaultApiRequiredFieldCaseData,
    body: "",
  },
  {
    testName: "a given article should not be updated due to missing date",
    ...defaultApiRequiredFieldCaseData,
    date: "",
  },
];
