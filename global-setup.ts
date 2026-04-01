import { request, FullConfig } from "@playwright/test";
import * as fs from "fs";
import { API_ENDPOINTS } from "./tests/api/config/api-endpoints";

async function globalSetup(config: FullConfig) {
  const context = await request.newContext();
  const baseURL = config.projects[0].use.baseURL;

  const response = await context.post(`${baseURL}${API_ENDPOINTS.LOGIN}`, {
    data: {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    },
  });

  if (!response.ok()) {
    console.error("❌ Login failed:", response.status(), await response.text());
    await context.dispose();
    throw new Error(`Login failed with status ${response.status()}`);
  }

  const body = await response.json();
  const token = body.access_token;

  const envPath = ".env";
  let envContent = "";

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf-8");
    envContent = envContent.replace(/^BEARER_TOKEN=.*\n?$/gm, "");
  }

  const newEnv = envContent.endsWith("\n")
    ? `${envContent}BEARER_TOKEN=${token}\n`
    : `${envContent}\nBEARER_TOKEN=${token}\n`;

  fs.writeFileSync(envPath, newEnv);

  process.env.BEARER_TOKEN = token;
  await context.dispose();
}

export default globalSetup;
