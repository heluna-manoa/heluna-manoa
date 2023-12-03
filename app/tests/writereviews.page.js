import { Selector } from 'testcafe';

class WriteReviewsPage {
  constructor() {
    this.pageId = '#write-review-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to write review, then checks to see that submission was successful. */
  async writeAReview(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#course-selector', 'ICS111');
    await testController.typeText('#professor-selector', 'Cam Moore');
    await testController.typeText('#semester-selector', 'Fall 2023');
    await testController.typeText('#rating-selector', '5');
    await testController.typeText('#grade-selector', 'A');
    await testController.typeText('#review-text', 'Very good class and professor!');
    await testController.click('#submit-button input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const writeReviews = new WriteReviewsPage();
