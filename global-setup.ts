import { request, FullConfig } from "@playwright/test";
import * as fs from "fs";

async function globalSetup(config: FullConfig) {
  const context = await request.newContext();
  const baseURL = "http://localhost:3000";

  const response = await context.post(`${baseURL}/api/login`, {
    data: {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    },
  });

  if (!response.ok()) {
    console.error("❌ Login failed:", response.status(), await response.text());
    throw new Error(`Login failed with status ${response.status()}`);
  }

  const body = await response.json();
  const token = body.access_token;

  const envPath = ".env";
  let envContent = "";

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf-8");
    envContent = envContent.replace(/BEARER_TOKEN=.*/g, "");
  }

  const newEnv = envContent.endsWith("\n")
    ? `${envContent}BEARER_TOKEN=${token}\n`
    : `${envContent}\nBEARER_TOKEN=${token}\n`;

  fs.writeFileSync(envPath, newEnv);

  process.env.BEARER_TOKEN = token;

}

export default globalSetup;
