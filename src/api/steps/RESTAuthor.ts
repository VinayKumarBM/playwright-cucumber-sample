import { Given, Then, When } from "@cucumber/cucumber";
import RequestHeader from "../../support/playwright/API/RequestHeader";
import RESTResponse from "../../support/playwright/API/RESTResponse";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import Constants from "../constants/Constants";

function getHeader() {
    return new RequestHeader().set(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON)
        .set(Constants.ACCEPT, Constants.APPLICATION_JSON)
        .set(Constants.AUTHORIZATION, `${Constants.BASIC} ${Buffer.from(`${Constants.USER}:${Constants.USER}`)
            .toString(Constants.BASE64)}`).get();
}

Given('user has access to Library Information System', async function () {
    const endPoint = `${process.env.REST_API_BASE_URL}${Constants.SESSION_EP}`;
    const response: RESTResponse = await this.rest.get(this.attach, endPoint, getHeader(), Constants.SESSION);
    await Assert.assertEquals(await response.getStatusCode(), 200, Constants.STATUS_CODE);
    this.id = await response.getBody();
});

When('user makes a request to retrieves all the Authors in the System', async function () {
    const endPoint = `${process.env.REST_API_BASE_URL}${Constants.AUTHOR_EP}${this.id}`;
    this.response = await this.rest.get(this.attach, endPoint, getHeader(), Constants.AUTHORS);
});

Then('user should get a status code {int}', async function (status: number) {
    const response: RESTResponse = this.response;
    await Assert.assertEquals(await response.getStatusCode(), status, Constants.STATUS_CODE);
});

Then('user should get list of Authors', async function () {
    const response: RESTResponse = this.response;
    await Assert.assertNotNull(await response.getBody(), Constants.AUTHORS);
});

When('user makes a request to retrieve an Author with id {int}', async function (id: number) {
    const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.SINGLE_AUTHOR_EP, id.toString(), this.id)}`;
    this.response = await this.rest.get(this.attach, endPoint, getHeader(), Constants.SINGLE_AUTHOR);
});

Then('user should get the author with id {int}', async function (id: number) {
    const response: RESTResponse = this.response;
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.ID_JSON_PATH, Constants.SINGLE_AUTHOR), id, Constants.SINGLE_AUTHOR);
});