import { Locator } from "@playwright/test";
import CommonConstants from "../../constants/CommonConstants";
import Log from "../../logger/Log";

export default class CheckBoxActions {
  private locator: Locator;
  private description: string;

  /**
   * Sets the locator with description
   * @param locator
   * @param description
   * @returns
   */
  public setLocator(locator: Locator, description: string): CheckBoxActions {
    this.locator = locator;
    this.description = description;
    return this;
  }

  /**
   * check checkbox or radio button
   */
  public async check() {
    Log.info(`Check ${this.description}`);
    await this.locator.check();
    return this;
  }

  /**
   * uncheck checkbox or radio button
   */
  public async uncheck() {
    Log.info(`Uncheck ${this.description}`);
    await this.locator.uncheck();
    return this;
  }

  /**
   * Returns the status of the checkbox
   * @returns
   */
  public async isChecked(): Promise<boolean> {
    Log.info(`Checking status of checkbox ${this.description}`);
    const element = this.locator;
    await element.waitFor({ state: "visible", timeout: CommonConstants.WAIT });
    return await this.locator.isChecked();
  }
}
