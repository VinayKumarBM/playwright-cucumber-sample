import { Page, APIResponse } from '@playwright/test';
import fs from 'fs';
import fetchToCurl from 'fetch-to-curl';
import CommonConstants from '../../constants/CommonConstants';
import StringUtil from '../../utils/StringUtil';
import RESTResponse from "./RESTResponse";
import Log from '../../logger/Log';
import { ICreateAttachment } from '@cucumber/cucumber/lib/runtime/attachment_manager';

export default class RESTRequest {
    constructor(private page: Page) { }
    /**
     * Creates request body from JSON file by replacing the input parameters
     * @param jsonFileName 
     * @param data 
     * @returns 
     */
    public async createRequestBody(jsonFileName: string, data: any): Promise<string> {
        let json = fs.readFileSync(CommonConstants.REST_JSON_REQUEST_PATH + jsonFileName, 'utf-8');
        json = StringUtil.formatStringValue(json, data);
        return json;
    }
    /**
     * Make POST request and return response
     * @param endPoint 
     * @param requestHeader 
     * @param jsonAsString
     * @param description 
     * @returns 
     */
    public async post(attach: ICreateAttachment, endPoint: string, requestHeader: any, jsonAsString: string,
        description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making POST request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, jsonAsString, 'post');
        const response = await this.page.request.post(endPoint,
            { headers: headersAsJson, data: JSON.parse(jsonAsString) });
        return await this.setRestResponse(attach, response, description);
    }
    /**
     * Sets the API Response into RestResponse object
     * @param response 
     * @param description 
     * @returns RestResponse object
     */
    private async setRestResponse(attach: ICreateAttachment, response: APIResponse, description: string): Promise<RESTResponse> {
        const body = await response.text();
        const headers = response.headers();
        const statusCode = response.status();
        const restResponse: RESTResponse = new RESTResponse(headers, body, statusCode, description);  
        const responseBody = body === CommonConstants.BLANK ? CommonConstants.BLANK : JSON.stringify(JSON.parse(body), undefined, 2);
        Log.attachText(attach, `Response body: ${responseBody}`);    
        return restResponse;
    }
    /**
     * Make Get request and return response
     * @param endPoint 
     * @param requestHeader 
     * @param description 
     * @returns 
     */
    public async get(attach: ICreateAttachment, endPoint: string, requestHeader: any, description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making GET request for ${description}`);
        this.printRequest(attach ,endPoint, headersAsJson, null, 'get');
        const response = await this.page.request.get(endPoint, { headers: headersAsJson });
        return await this.setRestResponse(attach, response, description);
    }
    /**
     * Make Put request and return response
     * @param endPoint 
     * @param requestHeader 
     * @param jsonAsString 
     * @param description 
     * @returns 
     */
    public async put(attach: ICreateAttachment, endPoint: string, requestHeader: any, jsonAsString: any,
        description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making PUT request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, jsonAsString, 'put');
        const response = await this.page.request.put(endPoint,
            { headers: headersAsJson, data: JSON.parse(jsonAsString) });
        return await this.setRestResponse(attach, response, description);
    }
    /**
     * Make Patch request and return response
     * @param endPoint 
     * @param requestHeader 
     * @param jsonAsString 
     * @param description 
     * @returns 
     */
    public async patch(attach: ICreateAttachment, endPoint: string, requestHeader: any, jsonAsString: any,
        description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making PATCH request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, jsonAsString, 'patch');
        const response = await this.page.request.patch(endPoint,
            { headers: headersAsJson, data: JSON.parse(jsonAsString) });
        return await this.setRestResponse(attach, response, description);
    }
    /**
     * Make Delete request and return response
     * @param endPoint 
     * @param requestHeader 
     * @param description 
     * @returns 
     */
    public async delete(attach: ICreateAttachment, endPoint: string, requestHeader: any, description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making DELETE request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, null, 'delete');
        const response = await this.page.request.delete(endPoint, { headers: headersAsJson });
        return await this.setRestResponse(attach, response, description);
    }
    /**
     * Prints the API request on console in curl format
     * @param endPoint 
     * @param requestHeader 
     * @param jsonRequestBody 
     * @param method 
     */
    private printRequest(attach: ICreateAttachment, endPoint: string, requestHeader: any, jsonRequestBody: string, method: string) {
        let requestBody = jsonRequestBody;
        if (jsonRequestBody !== null) {
            requestBody = JSON.stringify(JSON.parse(jsonRequestBody), undefined, 2);
        }
        Log.attachText(attach, `Request:  ${fetchToCurl({
            url: endPoint,
            headers: requestHeader,
            body: requestBody,
            method: method,
        })}`);
    }
}
