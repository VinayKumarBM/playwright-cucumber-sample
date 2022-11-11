import jp from "jsonpath";
import Log from "../../logger/Log";

export default class RESTResponse {
    public constructor(private headers: any, private body: string, private status: number,
        private description: string) { }

    /**
     * Get content of tag in response body using JSON path
     * @param jsonPath 
     * @param description 
     * @returns 
     */
    public async getTagContentByJsonPath(jsonPath: string, description: string): Promise<string> {
        Log.info(`Getting content of ${description}`);
        // eslint-disable-next-line prefer-destructuring
        return jp.query(JSON.parse(this.body), jsonPath)[0];
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
        return this.headers;
    }
}
