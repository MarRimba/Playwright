import { Locator, Page } from "@playwright/test";

export class ArticlesPage {
  articlesLink: Locator;
  addArticleButton: Locator;
  titleInput: Locator;
  bodyInput: Locator;
  imageSelect: Locator;
  saveButton: Locator;

  constructor(private page: Page) {
    this.articlesLink = this.page.getByTestId("open-articles");
    this.addArticleButton = this.page.getByRole("button", {
      name: "Add Article",
    });
    this.titleInput = this.page.getByTestId("title-input");
    this.bodyInput = this.page.getByTestId("body-text");
    this.imageSelect = this.page.getByTestId("image-select");
    this.saveButton = this.page.getByTestId("save");
  }
}
