import { Selector } from 'testcafe';

class ListProfessorsPage {
  constructor() {
    this.pageId = '#search-professor-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const listProfessors = new ListProfessorsPage();
