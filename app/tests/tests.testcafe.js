import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userReviews } from './userreviews.page';
import { writeReviews } from './writereviews.page';
import { editReviews } from './editreviews.page';
import { listCoursesPage } from './listcourses.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the write reviews page by writing a review', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoWriteReviewsPage(testController);
  await writeReviews.isDisplayed(testController);
  await writeReviews.writeAReview(testController);
});

test('Test the user reviews after writing a review page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoWriteReviewsPage(testController);
  await writeReviews.isDisplayed(testController);
  await writeReviews.writeAReview(testController);
  await navBar.gotoUserReviewsPage(testController);
  await userReviews.isDisplayed(testController);
  await userReviews.deleteReview(testController);
});

test('Test the edit reviews after writing a review page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoWriteReviewsPage(testController);
  await writeReviews.isDisplayed(testController);
  await writeReviews.writeAReview(testController);
  await navBar.gotoUserReviewsPage(testController);
  await userReviews.isDisplayed(testController);
  await editReviews.editAReview(testController);
});

// Cade: go to list courses page
test('Test the List Courses page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.isDisplayed(testController);
  await listCoursesPage.hasTable(testController);
});
