import { Selector } from 'testcafe';

class AddCoursePage {
  constructor() {
    this.pageId = '#add-course-button';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to add a course, then checks to see that submission was successful. */
  async addACourse(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#course-name', 'ICS111');
    await testController.typeText('#course-title', 'Intro to Java');
    await testController.typeText('#professor-selection', 'Cam Moore');
    await testController.typeText('#credit-number', '5');

    await testController.click('#submit-course input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addCourse = new AddCoursePage();
