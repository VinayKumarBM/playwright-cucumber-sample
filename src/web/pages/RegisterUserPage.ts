import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";

export default class RegisterUserPage {    
    constructor(private web: UIActions) { }
        
    private FIRST_NAME_TEXTBOX = "#input-firstname";
    private LAST_NAME_TEXTBOX = "#input-lastname";
    private EMAIL_TEXTBOX = "#input-email";
    private TELEPHONE_TEXTBOX = "#input-telephone";
    private PASSWORD_TEXTBOX = "#input-password";
    private CONFIRM_PASSWORD_TEXTBOX = "#input-confirm";
    private SUBSCRIBE_RADIO = "[for='input-newsletter-{0}']";
    private PRIVACY_POLICY_CHECKBOX = "[for='input-agree']";
    private PRIVACY_POLICY_LINK = "//a/b[text()='Privacy Policy']";
    private CONTINUE_BUTTON = "[value='Continue']";
    
    public async enterRegistrationDetails(firstName: string, lastName: string, email: string, telephone: string, password: string, confirmPassword: string, subscribe: string) {
        await this.web.editBox(this.FIRST_NAME_TEXTBOX, Constants.FIRST_NAME).fill(firstName);
        await this.web.editBox(this.LAST_NAME_TEXTBOX, Constants.LAST_NAME).fill(lastName);
        await this.web.editBox(this.EMAIL_TEXTBOX, Constants.EMAIL).fill(email);
        await this.web.editBox(this.TELEPHONE_TEXTBOX, Constants.TELEPHONE).fill(telephone);
        await this.web.editBox(this.PASSWORD_TEXTBOX, Constants.PASSWORD).fill(password);
        await this.web.editBox(this.CONFIRM_PASSWORD_TEXTBOX, Constants.CONFIRM_PASSWORD).fill(confirmPassword);
        await this.web.element(StringUtil.formatString(this.SUBSCRIBE_RADIO, subscribe.toLowerCase()), subscribe.toUpperCase()).click();
    }

    public async agreePrivacyPolicy() {
        await Assert.assertTrue(await this.web.element(this.PRIVACY_POLICY_LINK, Constants.PRIVACY_POLICY).isVisible(1),
            Constants.PRIVACY_POLICY);
        await this.web.element(this.PRIVACY_POLICY_CHECKBOX, Constants.PRIVACY_POLICY).click();
    }

    public async clickContinueButton() {
        await this.web.element(this.CONTINUE_BUTTON, Constants.CONTINUE).click();
    }
}