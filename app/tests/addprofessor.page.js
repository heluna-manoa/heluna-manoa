import { Selector } from 'testcafe';

class AddProfessorPage {
  constructor() {
    this.pageId = '#add-professor';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page is currently functional. */
  async addAProfessor(testController) {
    await this.isDisplayed(testController);
    await testController.click('#add-professor');
    await testController.typeText('#professor-name', 'Carson Fu');
    await testController.typeText('#department-name', 'Asian Studies');
    await testController.typeText('#biography-text', 'A Great Up-and-Coming Professor');
    await testController.typeText('#image-url', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png');
    await testController.click('#submit-button input.btn.btn-primary');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addProfessor = new AddProfessorPage();
