import { Selector } from 'testcafe';

class UserReviewsPage {
  constructor() {
    this.pageId = '#user-reviews-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page is able to remove an item. */
  async deleteReview(testController) {
    await this.isDisplayed(testController);
    await testController.click('#delete-review');
  }
}

export const userReviews = new UserReviewsPage();
