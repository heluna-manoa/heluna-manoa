import { Selector } from 'testcafe';

class AddCoursePage {
  constructor() {
    this.pageId = '#add-course';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page is currently functional. */
  async addACourse(testController) {
    await this.isDisplayed(testController);
    await testController.click('#add-course');
    await testController.typeText('#name-text', 'ICS 900');
    await testController.typeText('#title-text', 'Software Engineering 3');
    await testController.typeText('#credit-select', '3');
    await testController.click('#submit-button input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addCourse = new AddCoursePage();
