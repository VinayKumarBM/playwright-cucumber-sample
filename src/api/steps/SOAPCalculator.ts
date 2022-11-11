import { Then, When } from "@cucumber/cucumber";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import RequestHeader from "../../support/playwright/API/RequestHeader";
import SOAPRequest from "../../support/playwright/API/SOAPRequest";
import SOAPResponse from "../../support/playwright/API/SOAPResponse";
import Assert from "../../support/playwright/asserts/Assert";
import Constants from "../constants/Constants";

async function makePostRequest(attach: ICreateAttachment, soap: SOAPRequest, soapAction: string, operation: string,
    number1: number, number2: number) {
    const header = new RequestHeader().set(Constants.CONTENT_TYPE, Constants.TEXT_XML)
        .set(Constants.SOAP_ACTION, soapAction).get();
    const requestData = {
        number1: number1,
        number2: number2,
    };
    return await soap.post(attach, process.env.SOAP_API_BASE_URL, header, `${operation}${Constants.XML_FORMAT}`,
        requestData, operation);
}

async function validateResult(response: SOAPResponse, xpath: string, operation: string, result: string) {
    await Assert.assertEquals((await response.getTagContentByXpath(xpath, operation)), result, operation);
}

When('user adds two numbers {int} and {int} in the calculator', async function (number1: number, number2: number) {
    this.response = await makePostRequest(this.attach, this.soap, Constants.ADD_SOAP_ACTION, Constants.ADD, number1, number2);
});

Then('user should get the result of addition as {string}', async function (result: string) {
    await validateResult(this.response, Constants.ADD_RESULT_XPATH, Constants.ADD, result);
});

When('user subtracts two numbers {int} and {int} in the calculator', async function (number1: number, number2: number) {
    this.response = await makePostRequest(this.attach, this.soap, Constants.SUBTRACT_SOAP_ACTION, Constants.SUBTRACT, number1, number2);
});

When('user multiplies two numbers {int} and {int} in the calculator', async function (number1: number, number2: number) {
    this.response = await makePostRequest(this.attach, this.soap, Constants.MULTIPLY_SOAP_ACTION, Constants.MULTIPLY, number1, number2);
});

When('user divides two numbers {int} and {int} in the calculator', async function (number1: number, number2: number) {
    this.response = await makePostRequest(this.attach, this.soap, Constants.DIVIDE_SOAP_ACTION, Constants.DIVIDE, number1, number2);
});

Then('user should get the result of subtraction as {string}', async function (result: string) {
    await validateResult(this.response, Constants.SUBTRACT_RESULT_XPATH, Constants.SUBTRACT, result);
});

Then('user should get the result of multiplication as {string}', async function (result: string) {
    await validateResult(this.response, Constants.MULTIPLY_RESULT_XPATH, Constants.MULTIPLY, result);
});

Then('user should get the result of division as {string}', async function (result: string) {
    await validateResult(this.response, Constants.DIVIDE_RESULT_XPATH, Constants.DIVIDE, result);
});