import { Locator, Page } from "@playwright/test";

export class ArticlesPage {
  articlesLink: Locator;
  addArticleButton: Locator;
  myArticlesButton: Locator;
  titleInput: Locator;
  bodyInput: Locator;
  imageSelect: Locator;
  saveButton: Locator;
  updateButton: Locator;
  editButton: Locator;
  deleteButton: Locator;
  alertPopup: Locator;
  nextButton: Locator;
  currentPage: Locator;
  articleCards: Locator;
  articleTitleLinks: Locator;

  constructor(private page: Page) {
    this.articlesLink = this.page.getByTestId("open-articles");
    this.addArticleButton = this.page.getByRole("button", {
      name: "Add Article",
    });
    this.myArticlesButton = this.page.getByRole("button", {
      name: "My articles",
    });
    this.titleInput = this.page.getByTestId("title-input");
    this.bodyInput = this.page.getByTestId("body-text");
    this.imageSelect = this.page.getByTestId("image-select");
    this.saveButton = this.page.getByTestId("save");
    this.updateButton = this.page.getByTestId("update");
    this.editButton = this.page.getByTestId("edit");
    this.deleteButton = this.page.getByTestId("delete");
    this.alertPopup = this.page.getByTestId("alert-popup");
    this.nextButton = this.page.getByTestId("next-button");
    this.currentPage = this.page.getByTestId("current-page");
    this.articleCards = this.page.locator(".item-card");
    this.articleTitleLinks = this.page.locator('[data-testid$="-title"] a');
  }

  getArticleTitleLink(index: number): Locator {
    return this.articleCards.nth(index).locator('[data-testid$="-title"] a');
  }
}
