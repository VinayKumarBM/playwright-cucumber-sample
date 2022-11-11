export default class Constants{
    // REST Endpoints 
    static readonly SESSION_EP = "/session";
    static readonly AUTHOR_EP = "/author?session_id=";
    static readonly SINGLE_AUTHOR_EP = "/author/{0}?session_id={1}";
    static readonly BOOK_EP = "/book?session_id=";
    static readonly SINGLE_BOOK_EP = "/book/{0}?session_id={1}";
    static readonly SEARCH_BOOK_EP = "/book/search?session_id=";

    // REST JSON path
    static readonly ID_JSON_PATH = "$.Id";
    static readonly AUTHOR_ID_JSON_PATH = "$.AuthorId";
    static readonly DATE_ADDED_ISO_JSON_PATH = "$.DateAddedIso";
    static readonly GENRE_ID_JSON_PATH = "$.GenreId";
    static readonly OUT_OF_PRINT_JSON_PATH = "$.IsOutOfPrint";
    static readonly NAME_JSON_PATH = "$.Name";
    static readonly FIRST_ID_JSON_PATH = "$[0].Id";
    static readonly FIRST_AUTHOR_ID_JSON_PATH = "$[0].AuthorId";
    static readonly FIRST_DATE_ADDED_ISO_JSON_PATH = "$[0].DateAddedIso";
    static readonly FIRST_GENRE_ID_JSON_PATH = "$[0].GenreId";
    static readonly FIRST_OUT_OF_PRINT_JSON_PATH = "$[0].IsOutOfPrint";
    static readonly FIRST_NAME_JSON_PATH = "$[0].Name";

    // SOAP Actions
    static readonly ADD_SOAP_ACTION = "http://tempuri.org/Add";
    static readonly SUBTRACT_SOAP_ACTION = "http://tempuri.org/Subtract";
    static readonly MULTIPLY_SOAP_ACTION = "http://tempuri.org/Multiply";
    static readonly DIVIDE_SOAP_ACTION = "http://tempuri.org/Divide";

    // SOAP Xpath
    static readonly ADD_RESULT_XPATH = "//*[local-name()='AddResult']/text()";
    static readonly SUBTRACT_RESULT_XPATH = "//*[local-name()='SubtractResult']/text()";
    static readonly MULTIPLY_RESULT_XPATH = "//*[local-name()='MultiplyResult']/text()";
    static readonly DIVIDE_RESULT_XPATH = "//*[local-name()='DivideResult']/text()";

    // Constants
    static readonly USER = "librarian";
    static readonly CONTENT_TYPE = "content-type";
    static readonly APPLICATION_JSON = "application/json";
    static readonly ACCEPT = "accept";
    static readonly AUTHORIZATION = "authorization";
    static readonly BASIC = "Basic";
    static readonly BASE64 = "base64";
    static readonly STATUS_CODE = "Status Code";    
    static readonly SESSION = "Session";    
    static readonly AUTHORS = "Authors"    
    static readonly SINGLE_AUTHOR = "Single Author";
    static readonly BOOKS = "Books"
    static readonly SINGLE_BOOK = "Single Book";
    static readonly TEXT_XML = "text/xml;charset=UTF-8"
    static readonly SOAP_ACTION = "SOAPAction";    
    static readonly XML_FORMAT = ".xml";
    static readonly ADD = "add";
    static readonly SUBTRACT = "subtract";
    static readonly MULTIPLY = "multiply";
    static readonly DIVIDE = "divide";
    static readonly BOOK_JSON = "book.json";
    static readonly SEARCH_BOOK = "Search Book";
}