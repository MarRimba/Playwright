import "dotenv/config";
import { faker } from "@faker-js/faker";

export const loginUserData = {
  userCorrectLogin: process.env.LOGIN_EMAIL,
  userCorrectPassword: process.env.LOGIN_PASSWORD,
};

export const articlePayload = {
  title: faker.lorem.words({min: 5, max: 8}),
  body: faker.lorem.paragraphs({min: 2, max: 4}),
  image: 'tester-app_2e6c67e2-a2b5-4753-95d1-5045475c719e.jpg',
  id: undefined,
};