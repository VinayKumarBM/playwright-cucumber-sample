import { Locator, Page } from "@playwright/test";
import CommonConstants from "../../constants/CommonConstants";
import Log from "../../logger/Log";

export default class UIElementActions {
  protected locator: Locator;
  protected description: string;
  protected selector: string;

  constructor(private page: Page) { }

  /**
   * Returns the first locator
   * @returns
   */
  public getLocator(): Locator {
    return this.locator.first();
  }

  /**
   * Returns the all the locators
   * @returns
   */
  public getLocators(): Locator {
    return this.locator;
  }

  /**
   * Sets the locator using the selector * 
   * @param selector 
   * @param description
   * @returns
   */
  public setElement(selector: string, description: string): UIElementActions {
    this.selector = selector;
    this.locator = this.page.locator(this.selector);
    this.description = description;
    return this;
  }

  /**
   * Sets the locator with description
   * @param locator
   * @param description
   * @returns
   */
  public setLocator(locator: Locator, description: string): UIElementActions {
    this.locator = locator;
    this.description = description;
    return this;
  }

  /**
   * Click on element
   * @returns
   */
  public async click() {
    Log.info(`Clicking on ${this.description}`);
    await this.getLocator().click();
    return this;
  }

  /**
   * Double click on element
   * @returns
   */
  public async doubleClick() {
    Log.info(`Double Clicking ${this.description}`);
    await this.getLocator().dblclick();
    return this;
  }

  /**
   * scroll element into view, unless it is completely visible
   * @returns
   */
  public async scrollIntoView() {
    Log.info(`Scroll to element ${this.description}`);
    await this.getLocator().scrollIntoViewIfNeeded();
    return this;
  }

  /**
   * Wait for element to be invisible
   * @returns
   */
  public async waitTillInvisible() {
    Log.info(`Waiting for ${this.description} to be invisible`);
    await this.getLocator().waitFor({ state: "hidden", timeout: CommonConstants.WAIT });
    return this;
  }

  /**
   * wait for element not to be present in DOM
   * @returns
   */
  public async waitTillDetached() {
    Log.info(`Wait for ${this.description} to be detached from DOM`);
    await this.getLocator().waitFor({ state: "detached", timeout: CommonConstants.WAIT });
    return this;
  }

  /**
   * wait for element to be visible
   * @returns
   */
  public async waitTillVisible() {
    Log.info(`Wait for ${this.description} to be visible in DOM`);
    await this.getLocator().waitFor({ state: "visible", timeout: CommonConstants.WAIT });
    return this;
  }

  /**
   * wait for element to be attached to DOM
   * @returns
   */
  public async waitForPresent() {
    Log.info(`Wait for ${this.description} to attach to DOM`);
    await this.getLocator().waitFor({ state: "attached", timeout: CommonConstants.WAIT });
    return this;
  }

  /**
   * This method hovers over the element
   */
  public async hover() {
    Log.info(`Hovering on ${this.description}`);
    await this.getLocator().hover();
    return this;
  }

  /**
   * Returns input.value for <input> or <textarea> or <select> element.
   * @returns
   */
  public async getInputValue(): Promise<string> {
    Log.info(`Getting input value of ${this.description}`);
    await this.waitTillVisible();
    return await this.getLocator().inputValue();
  }

  /**
   * Gets the text content
   * @returns
   */
  public async getTextContent(): Promise<string> {
    Log.info(`Getting text content of ${this.description}`);
    await this.waitTillVisible();
    return (await this.getLocator().textContent()).trim();
  }

  /**
   * Get Attribute value
   * @param attributeName
   * @returns
   */
  public async getAttribute(attributeName: string): Promise<string> {
    Log.info(`Getting attribute value of ${this.description}`);
    await this.waitTillVisible();
    return (await this.getLocator().getAttribute(attributeName)).trim();
  }

  /**
   * Get innerHTML
   * @returns
   */
  public async getInnerHTML(): Promise<string> {
    Log.info(`Get innerHTML of ${this.description}`);
    await this.waitTillVisible();
    return (await this.getLocator().innerHTML()).trim();
  }

  /**
   * Get inner text
   * @returns
   */
  public async getInnerText(): Promise<string> {
    Log.info(`Get inner text of ${this.description}`);
    const element = this.getLocator();
    await this.waitTillVisible();
    return (await element.innerText()).trim();
  }

 /**
  * checks if element is editable
  * @param sec 
  * @returns 
  */
  public async isEditable(sec: number): Promise<boolean> {
    Log.info(`Checking if ${this.description} is editable`);
    const element = this.getLocator();
    return await element.isEditable({ timeout: sec * CommonConstants.ONE_THOUSAND });
  }

  /**
   * checks if element is enabled
   * @param sec
   * @returns Promise<boolean>
   */
  public async isEnabled(sec: number): Promise<boolean> {
    Log.info(`Checking if ${this.description} is enabled`);
    const element = this.getLocator();
    return await element.isEnabled({ timeout: sec * CommonConstants.ONE_THOUSAND });
  }

  /**
   * checks if element is visible
   * @param sec time for element to be visible
   * @returns Promise<boolean>
   */
  public async isVisible(sec: number): Promise<boolean> {
    let visibility: boolean;
    Log.info(`Checking if ${this.description} is visible`);
    try {
      visibility = await this.getLocator().isVisible({ timeout: sec * CommonConstants.ONE_THOUSAND });
    } catch (error) {
      visibility = false;
    }
    return visibility;
  }

  /**
   * Press a key on web element
   * @param key
   */
  public async keyPress(key: string) {
    Log.info(`Pressing ${this.description}`);
    await this.getLocator().press(key);
    return this;
  }

  /**
   * Get all the text Content
   * @returns
   */
  public async getAllTextContent(): Promise<string[]> {
    Log.info(`Getting all the text content of ${this.description}`);
    await this.waitTillVisible();
    return await this.getLocators().allTextContents();
  }

  /**
   * Get the count of
   * @returns
   */
  public async getCount(): Promise<number> {
    Log.info(`Getting the count of ${this.description}`);
    return await this.getLocators().count();
  }
  /**
   * Performs mouse click action on the element
   * @returns 
   */
  public async mouseClick() {
    Log.info(`Clicking on ${this.description}`);
    await this.getLocator().scrollIntoViewIfNeeded();
    const box = await this.getLocator().boundingBox();
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    return this;
  }
  /**
   * Click on element using js
   * @returns
   */
  public async jsClick() {
    Log.info(`Clicking on ${this.description}`);
    await this.waitTillVisible();
    await this.getLocator().evaluate((node: HTMLElement) => { node.click(); });
    return this;
  }
}
