import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";

export default class CommonPage {
    constructor(private web: UIActions) { }
    
    private SUCCESS_MESSAGE_TEXT = "h1.page-title";
    private SEARCH_TEXTBOX = "[name='search']";
    private SEARCH_BUTTON = ".search-button";
    private MY_ACCOUNT_LINK = "//li[contains(@class,'dropdown')]//span[contains(text(),'My account')]";
    private MENU_LINK = "//ul[contains(@class,'dropdown-menu')]//span[contains(text(),'{0}')]";

    /**
     * Search for a product from header banner
     * @param product 
     */
    public async searchProduct(product: string) {
        await this.web.editBox(this.SEARCH_TEXTBOX, Constants.PRODUCT).fill(product);
        await this.web.element(this.SEARCH_BUTTON, Constants.SEARCH_BUTTON).click();
    }

    public async logout() {
        await this.web.element(this.MY_ACCOUNT_LINK, Constants.MY_ACCOUNT).hover();
        await this.web.element(StringUtil.formatString(this.MENU_LINK, Constants.LOGOUT), Constants.LOGOUT).click();
    }

    public async navigateToRegisterUser() {
        await this.web.element(this.MY_ACCOUNT_LINK, Constants.MY_ACCOUNT).hover();
        await this.web.element(StringUtil.formatString(this.MENU_LINK, Constants.REGISTER), Constants.REGISTER).click();
    }

    /**
     * Verify the message displayed on title of the page
     * @param message 
     */
    public async verifyTitleMessage(message: string) {
        const actualMsg = await this.web.element(this.SUCCESS_MESSAGE_TEXT, Constants.MESSAGE).getTextContent();
        await Assert.assertEquals(actualMsg, message, Constants.MESSAGE);
    }

}