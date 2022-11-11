import { Given, Then, When } from "@cucumber/cucumber";
import StringUtil from "../../support/utils/StringUtil";
import CommonPage from "../pages/CommonPage";
import RegisterUserPage from "../pages/RegisterUserPage";

Given('user navigate to registration page', async function () {
    await new CommonPage(this.web).navigateToRegisterUser();
});

When('the user enters the registration details {string}, {string}, {string}, {string}, {string}, {string}, {string}',
    async function (firstName, lastName, email, telephone, password, confirmPassword, subscribe) {
        email = StringUtil.formatString(email, StringUtil.randomNumberString(5));
        await new RegisterUserPage(this.web).enterRegistrationDetails(firstName, lastName, email, telephone, password, confirmPassword, subscribe);
        await new RegisterUserPage(this.web).agreePrivacyPolicy();
        await new RegisterUserPage(this.web).clickContinueButton();
});

Then('user should see a message {string}', async function (message) {
    await new CommonPage(this.web).verifyTitleMessage(message);
});

Then('user logs out of application', async function () {
    await new CommonPage(this.web).logout();
});