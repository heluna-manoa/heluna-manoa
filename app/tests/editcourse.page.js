import { Selector } from 'testcafe';

class EditCoursePage {
  constructor() {
    this.pageId = '#edit-course';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page is currently functional. */
  async editACourse(testController) {
    await this.isDisplayed(testController);
    await testController.click('#edit-course');
    await testController.typeText('#name-text', 'ICS 1', { replace: true });
    await testController.typeText('#title-text', 'Pre-Software Engineering', { replace: true });
    await testController.typeText('#professor-text', 'Zeb Lakey', { replace: true });
    await testController.typeText('#credit-text', '3', { replace: true });
    await testController.click('#submit-button input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editCourse = new EditCoursePage();
