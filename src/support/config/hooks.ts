import { Before, BeforeAll, AfterAll, After, setDefaultTimeout, ITestCaseHookParameter, Status, formatterHelpers } from "@cucumber/cucumber";
import { Browser } from "@playwright/test";
import WebBrowser from "../manager/Browser";
import fse from "fs-extra";
import UIActions from "../playwright/actions/UIActions";
import Log from "../logger/Log";
import RESTRequest from "../playwright/API/RESTRequest";
import SOAPRequest from "../playwright/API/SOAPRequest";

const timeInMin: number = 60 * 1000;
setDefaultTimeout(Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin);
let browser: Browser;

// launch the browser
BeforeAll(async function () {
    browser = await WebBrowser.launch();
});

// close the browser
AfterAll(async function () {
    await browser.close();
});

// Create a new browser context and page per scenario
Before(async function ({ pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle })
    Log.testBegin(`${pickle.name}: ${line}`);
    this.context = await browser.newContext({
        viewport: null,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        recordVideo: process.env.RECORD_VIDEO === "true" ? { dir: './test-results/videos' } : undefined,
    });
    this.page = await this.context?.newPage();
    this.web = new UIActions(this.page);
    this.rest = new RESTRequest(this.page);
    this.soap = new SOAPRequest();
});

// Cleanup after each scenario
After(async function ({ result, pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle })
    const status = result.status;
    const scenario = pickle.name;
    const videoPath = await this.page?.video()?.path();
    if (status === Status.FAILED) {
        const image = await this.page?.screenshot({ path: `./test-results/screenshots/${scenario} (${line}).png`, fullPage: true });
        await this.attach(image, 'image/png');
        Log.error(`${scenario}: ${line} - ${status}\n${result.message}`);
    }
    await this.page?.close();
    await this.context?.close();
    if (process.env.RECORD_VIDEO === "true") {
        if (status === Status.FAILED) {
            fse.renameSync(videoPath, `./test-results/videos/${scenario}(${line}).webm`);            
            await this.attach(fse.readFileSync(`./test-results/videos/${scenario}(${line}).webm`), 'video/webm');
        } else {
            fse.unlinkSync(videoPath);
        }
    }
    Log.testEnd(`${scenario}: ${line}`, status);
});