import { test, expect } from "@playwright/test";

test("user creates profile, visitor sends message, user sees it", async ({ page }) => {
  const email = `e2e-${Date.now()}@demo.local`;
  const username = `e2e_${Date.now()}`;
  await page.goto("/signup");
  await page.getByTestId("auth-email").fill(email);
  await page.getByTestId("auth-password").fill("Senha123!");
  await page.getByRole("button", { name: "Criar conta" }).click();
  await page.getByTestId("onboarding-display-name").fill("Usuário E2E");
  await page.getByTestId("onboarding-username").fill(username);
  await page.getByTestId("onboarding-submit").click();
  await expect(page.getByText(/Usuário E2E/)).toBeVisible();
  await page.goto(`/v/${username}`);
  await page.getByTestId("public-message").fill("Você me inspirou muito.");
  await page.getByTestId("public-safety").check();
  await page.getByRole("button", { name: /Enviar mensagem/ }).click();
  await expect(page.getByText(/Mensagem enviada/)).toBeVisible();
  await page.goto("/dashboard/messages");
  await expect(page.getByText("Você me inspirou muito.")).toBeVisible();
});
