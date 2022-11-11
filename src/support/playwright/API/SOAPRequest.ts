import soapRequest from "easy-soap-request";
import format from "xml-formatter";
import fs from 'fs';
import SOAPResponse from "./SOAPResponse";
import StringUtil from "../../utils/StringUtil";
import CommonConstants from "../../constants/CommonConstants";
import Log from "../../logger/Log";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class SOAPRequest {
    /**
     * Creates request body by replacing the input parameters
     * @param xmlFileName 
     * @param data 
     * @returns 
     */
    private async createRequestBody(attach: ICreateAttachment, xmlFileName: string, data: any): Promise<string> {
        let xml = fs.readFileSync(CommonConstants.SOAP_XML_REQUEST_PATH + xmlFileName, 'utf-8');
        xml = StringUtil.formatStringValue(xml, data);
        Log.attachText(attach, `SOAP request : \n${format(xml, { collapseContent: true })}`);
        return xml;
    }

    /**
     * Make POST request and return response
     * @param endPoint 
     * @param requestHeader 
     * @param fileName 
     * @param gData 
     * @param data 
     * @param description 
     * @returns 
     */
    public async post(attach: ICreateAttachment, endPoint: string, requestHeader: any, fileName: string,
        requestData: any, description: string): Promise<SOAPResponse> {
        Log.info(`Making SOAP request for ${description}`);
        Log.attachText(attach, `URL: ${endPoint}`);
        const xml = await this.createRequestBody(attach, fileName, requestData);        
        const { response } = await soapRequest({ url: endPoint, headers: requestHeader, xml: xml });
        const { headers, body, statusCode } = response;
        Log.attachText(attach, `SOAP Response: \n${format(body, { collapseContent: true })}`);
        return new SOAPResponse(headers, body, statusCode, description);
    }
}
