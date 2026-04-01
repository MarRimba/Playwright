export const TAG = {
  API: "@api",
  UI: "@ui",
  SMOKE: "@smoke",
  AUTH: "@auth",
  USERS: "@users",
  ARTICLES: "@articles",
  LOGIN: "@login",
  LOGOUT: "@logout",
  TOKEN: "@token",
  REGISTER_USER: "@registerUser",
  GET_USERS: "@getUsers",
  POST_USER: "@postUser",
  PUT_USER: "@putUser",
  PATCH_USER: "@patchUser",
  DELETE_USER: "@deleteUser",
  GET_ARTICLES: "@getArticles",
  POST_ARTICLE: "@postArticle",
  UPDATE_ARTICLE: "@updateArticle",
  DELETE_ARTICLE: "@deleteArticle",
  UNHAPPY_PATH: "@unhappyPath",
} as const;

export type TestTag = (typeof TAG)[keyof typeof TAG];

export function tags(...values: TestTag[]) {
  return values;
}
