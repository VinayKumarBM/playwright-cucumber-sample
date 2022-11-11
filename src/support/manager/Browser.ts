import { chromium, ChromiumBrowser, firefox, FirefoxBrowser, LaunchOptions, webkit, WebKitBrowser } from "@playwright/test";
import BrowserConstants from "../constants/BrowserConstants";

const browserOptions: LaunchOptions = {
    slowMo: 50,
    args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
    firefoxUserPrefs: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
    },
    headless: false,
    timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10),
    downloadsPath: "./test-results/downloads",
};

export default class Browser {
    public static async launch() {
        const browserType = process.env.BROWSER;
        let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
        if (BrowserConstants.FIREFOX === browserType) {
            browser = await firefox.launch(browserOptions);
        } else if (BrowserConstants.WEBKIT === browserType) {
            browser = await webkit.launch(browserOptions);
        } else {
            browser = await chromium.launch(browserOptions);
        }
        return browser;
    }
    /*
        public static channel() {
            const browser = process.env.BROWSER.toLowerCase();
            let browserChannel;
            if (browser === BrowserConstants.CHROME) {
                browserChannel = BrowserConstants.CHROME;
            } else if (browser === BrowserConstants.EDGE) {
                browserChannel = BrowserConstants.MSEDGE;
            } else {
                browserChannel = BrowserConstants.BLANK;
            }
            return browserChannel;
        }   */
}
