import { Selector } from 'testcafe';

class EditReviewsPage {
  constructor() {
    this.pageId = '#edit-review';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page is currently functional. */
  async editAReview(testController) {
    await this.isDisplayed(testController);
    await testController.click('#edit-review');
    await testController.typeText('#rating-selector', '5');
    await testController.typeText('#rating-selector', '5');
    await testController.typeText('#rating-selector', '5');
    await testController.click('#submit-button input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editReviews = new EditReviewsPage();
