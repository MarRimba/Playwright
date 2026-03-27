import { request, FullConfig } from "@playwright/test";

async function globalTeardown(_config: FullConfig) {
  const context = await request.newContext();
  const restoreUrl = "http://localhost:3000/api/restoreDB";

  let response = await context.post(restoreUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status() === 404 || response.status() === 405) {
    response = await context.get(restoreUrl, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  if (!response.ok()) {
    throw new Error(`restoreDB failed with status ${response.status()}`);
  }

  await context.dispose();
}

export default globalTeardown;
