import { Selector } from 'testcafe';

class ListCoursesPage {
  constructor() {
    this.pageId = '#search-course-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page has a table with at least two rows. */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(2);
  }
}

export const listCoursesPage = new ListCoursesPage();
