import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import Constants from "../constants/Constants";

export default class SearchResultsPage {
    constructor(private web: UIActions) { }
    
    private SEARCH_RESULT_PRODUCT_TEXT = ".product-thumb .title a";
    private SEARCH_MESSAGE_TEXT = ".entry-content.content-products p";
    
    /**
     * Verify the product search results
     * @param product 
     */
    public async verifySearchResult(product: string) {
        const products = await this.web.element(this.SEARCH_RESULT_PRODUCT_TEXT, Constants.PRODUCT).getAllTextContent();
        for(const prod of products) {
            await Assert.assertContainsIgnoreCase(prod, product, Constants.PRODUCT);
        }
    }
    /**
     * Verify the message displayed when searched for invalid product
     * @param message 
     */
    public async verifyInvalidSearchMessage(message: string) {
        const actualMsg = await this.web.element(this.SEARCH_MESSAGE_TEXT, Constants.MESSAGE).getTextContent();
        await Assert.assertEquals(actualMsg, message, Constants.MESSAGE);
    }
}