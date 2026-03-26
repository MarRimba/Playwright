export const API_HEADERS = {
  AUTHORIZED: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    Accept: "application/json",
  },
  STANDARD: {
    Accept: "application/json",
  },
} as const;
