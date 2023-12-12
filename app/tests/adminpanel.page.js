import { Selector } from 'testcafe';

class AdminPanelPage {
  constructor() {
    this.pageId = '#search-admin-nav';
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

  /** Asserts that this page is able to remove an item. */
  async deleteCourse(testController) {
    await this.isDisplayed(testController);
    await testController.click('#delete-course');
    await testController.click('.swal-button--confirm');
  }
}

export const adminPanel = new AdminPanelPage();
