import Log from "../../logger/Log";
import XMLParserUtil from "../../utils/XMLParserUtil";

export default class SOAPResponse {
    public constructor(private headers: any, private body: any, private status: number, private description: string) { }
    /**
     * Get content of tag in response body using xpath
     * @param xPathExpression xpath for the tag
     * @param description 
     */
    public async getTagContentByXpath(xPathExpression: string, description: string): Promise<string> {
        Log.info(`Getting tag value of action ${description}`);
        return XMLParserUtil.getTagContentByXpath(this.body, xPathExpression);
    }

    /**
     * Get value of attribute in response body using xpath
     * @param xPathExpression xpath for the attribute
     * @param description 
     */
    public async getAttributeValueByXpath(xPathExpression: string, description: string): Promise<string> {
        Log.info(`Getting attribute value of action ${description}`);
        return XMLParserUtil.getAttributeValueByXpath(this.body, xPathExpression);
    }

    /**
     * Get header value by header key
     * @param key 
     * @returns 
     */
    public async getHeaderValueByKey(key: string): Promise<string> {
        Log.info(`Getting header value of ${key}`);
        const jsonHeaders = await JSON.parse(JSON.stringify(this.headers));
        return jsonHeaders[key];
    }

    /**
     * Get response status code
     * @returns 
     */
    public async getStatusCode(): Promise<number> {
        Log.info(`Getting status code of ${this.description}`);
        return this.status;
    }

    /**
     * Get response body
     * @returns 
     */
    public async getBody(): Promise<string> {
        Log.info(`Getting response body of ${this.description}`);
        return this.body;
    }

    /**
     * Get response headers 
     * @returns 
     */
    public async getHeaders(): Promise<string> {
        Log.info(`Getting response Headers of ${this.description}`);
        return JSON.stringify(this.headers);
    }
}
