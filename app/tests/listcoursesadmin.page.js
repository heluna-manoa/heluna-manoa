import { Selector } from 'testcafe';

class ListCoursesAdmin {
  constructor() {
    this.pageId = '#search-admin-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Goes to the AddCourse page. */
  async gotoAddCourse(testController) {
    await testController.click('#add-course-button');
  }

  /** Goes to the AddProfessor page. */
  async gotoAddProfessor(testController) {
    await testController.click('#add-professor-button');
  }
}

export const listCoursesAdmin = new ListCoursesAdmin();
