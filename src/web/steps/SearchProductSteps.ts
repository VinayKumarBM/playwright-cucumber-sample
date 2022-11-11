import { Given, Then, When } from "@cucumber/cucumber";
import CommonPage from "../pages/CommonPage";
import HomePage from "../pages/HomePage";
import SearchResultsPage from "../pages/SearchResultsPage";

Given('user is on home page', async function () {
    await new HomePage(this.web).navigateToHomePage();
});

When('the user searches for product {string}', async function (product: string) {
    await new CommonPage(this.web).searchProduct(product);
});

Then('user should see {string} product displayed on search result', async function (product: string) {
    await new SearchResultsPage(this.web).verifySearchResult(product);
});

Then('user should see a search result message as {string}', async function (message: string) {
    await new SearchResultsPage(this.web).verifyInvalidSearchMessage(message);
});