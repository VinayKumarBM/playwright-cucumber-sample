import { Locator } from "@playwright/test";
import CommonConstants from "../../constants/CommonConstants";
import HTMLConstants from "../../constants/HTMLConstants";
import Log from "../../logger/Log";

export default class DropDownActions {
  private locator: Locator;
  private description: string;

  /**
   * Sets the locator with description
   * @param locator
   * @param description
   * @returns
   */
  public setLocator(locator: Locator, description: string): DropDownActions {
    this.locator = locator;
    this.description = description;
    return this;
  }

  /**
   * Select the dropdown by value
   * @param value
   * @returns
   */
  public async selectByValue(value: string) {
    Log.info(`Selecting value ${value} from ${this.description}`);
    await this.locator.selectOption({ value });
    return this;
  }

  /**
   * Select the dropdown by Label
   * @param text
   * @returns
   */
  public async selectByVisibleText(text: string) {
    Log.info(`Selecting text ${text} from ${this.description}`);
    await this.locator.selectOption({ label: text });
    return this;
  }

  /**
   * Select the dropdown by index
   * @param index
   * @returns
   */
  public async selectByIndex(index: number) {
    Log.info(`Selecting index ${index} of ${this.description}`);
    await this.locator.selectOption({ index });
    return this;
  }

  /**
   * Gets all the options in dropdown
   * @param index
   * @returns
   */
  public async getAllOptions(): Promise<string[]> {
    Log.info(`Getting all the options of ${this.description}`);
    await this.locator.waitFor({state: "visible", timeout: CommonConstants.WAIT});
    return await this.locator.locator(HTMLConstants.OPTION).allTextContents();
  }

  /**
   * Gets all the selected options in dropdown
   * @param index
   * @returns
   */
  public async getAllSelectedOptions(): Promise<string[]> {
    Log.info(`Getting all the selected options of ${this.description}`);
    await this.locator.waitFor({ state: "visible", timeout: CommonConstants.WAIT });
    return await this.locator.locator(HTMLConstants.SELECTED_OPTION).allTextContents();
  }
}
