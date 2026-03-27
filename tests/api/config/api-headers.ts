const getBearerToken = (): string => {
  const token = process.env.BEARER_TOKEN;

  if (!token) {
    throw new Error(
      "BEARER_TOKEN is not set. Verify global-setup and .env configuration.",
    );
  }

  return token;
};

export const API_HEADERS = {
  AUTHORIZED: () => ({
    Authorization: `Bearer ${getBearerToken()}`,
    Accept: "application/json",
  }),
  STANDARD: {
    Accept: "application/json",
  },
} as const;
