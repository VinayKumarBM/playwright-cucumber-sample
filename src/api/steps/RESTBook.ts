import { Given, Then, When } from "@cucumber/cucumber";
import RequestHeader from "../../support/playwright/API/RequestHeader";
import RESTRequest from "../../support/playwright/API/RESTRequest";
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

When('user makes a request to retrieves all the Books in the System', async function () {
    const endPoint = `${process.env.REST_API_BASE_URL}${Constants.BOOK_EP}${this.id}`;
    this.response = await this.rest.get(this.attach, endPoint, getHeader(), Constants.BOOKS);
});

Then('user should get list of Books', async function () {
    const response: RESTResponse = this.response;
    await Assert.assertNotNull(await response.getBody(), Constants.BOOKS);
});

When('user makes a request to retrieve an Book with id {int}', async function (id: number) {
    const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.SINGLE_BOOK_EP, id.toString(), this.id)}`;
    this.response = await this.rest.get(this.attach, endPoint, getHeader(), Constants.SINGLE_BOOK);
});

Then('user should get the Book with id {int}', async function (id: number) {
    const response: RESTResponse = this.response;
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.ID_JSON_PATH, Constants.SINGLE_BOOK), id, Constants.SINGLE_BOOK);
});

When('user adds a book with details {string}, {string}, {int}, {string}, {int}, {string}, {int}, {string}, {string}',
    async function (bookName: string, available: string, genreId: number, genreName: string, authorID: number,
        authorName: string, age: number, dateAdded: string, dateAddedIso: string) {
        const endPoint = `${process.env.REST_API_BASE_URL}${Constants.BOOK_EP}${this.id}`;
        const requestData = {
            bookName: bookName,
            available: available,
            genreId: genreId,
            genreName: genreName,
            authorID: authorID,
            authorName: authorName,
            age: age,
            dateAdded: dateAdded,
            dateAddedIso: dateAddedIso,
        }
        const request: RESTRequest = this.rest;
        const requestBody = await request.createRequestBody(Constants.BOOK_JSON, requestData);
        this.response = await request.post(this.attach, endPoint, getHeader(), requestBody, Constants.SINGLE_BOOK);
        this.bookID = await this.response.getTagContentByJsonPath(Constants.ID_JSON_PATH, Constants.SINGLE_BOOK);
    });

Then('user should be able to added Book {string}, {string}, {int}, {int}, {string}',
    async function (bookName: string, available: string, genreId: number, authorID: number, dateAddedIso: string) {
        const response: RESTResponse = this.response;
        await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.NAME_JSON_PATH, Constants.SINGLE_BOOK), bookName, Constants.SINGLE_BOOK);
        await Assert.assertEquals((await response.getTagContentByJsonPath(Constants.OUT_OF_PRINT_JSON_PATH, Constants.SINGLE_BOOK)).toString(), available, Constants.SINGLE_BOOK);
        await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.GENRE_ID_JSON_PATH, Constants.SINGLE_BOOK), genreId, Constants.SINGLE_BOOK);
        await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.AUTHOR_ID_JSON_PATH, Constants.SINGLE_BOOK), authorID, Constants.SINGLE_BOOK);
        await Assert.assertContains(await response.getTagContentByJsonPath(Constants.DATE_ADDED_ISO_JSON_PATH, Constants.SINGLE_BOOK), dateAddedIso, Constants.SINGLE_BOOK);
        await Assert.assertNotNull(await response.getTagContentByJsonPath(Constants.ID_JSON_PATH, Constants.SINGLE_BOOK), Constants.SINGLE_BOOK);
    });

Then('user deletes the book that was added', async function () {
    const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.SINGLE_BOOK_EP, this.bookID, this.id)}`;
    this.response = await this.rest.delete(this.attach, endPoint, getHeader(), Constants.SINGLE_BOOK);
});

Then('user should see that book details {string}, {string}, {int}, {int}, {string} are updated', async function (bookName: string, available: string, genreId: number, authorID: number, dateAddedIso: string) {
    const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.SINGLE_BOOK_EP, this.bookID, this.id)}`;
    const response: RESTResponse = await this.rest.get(this.attach, endPoint, getHeader(), Constants.SINGLE_BOOK);
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.NAME_JSON_PATH, Constants.SINGLE_BOOK), bookName, Constants.SINGLE_BOOK);
    await Assert.assertEquals((await response.getTagContentByJsonPath(Constants.OUT_OF_PRINT_JSON_PATH, Constants.SINGLE_BOOK)).toString(), available, Constants.SINGLE_BOOK);
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.GENRE_ID_JSON_PATH, Constants.SINGLE_BOOK), genreId, Constants.SINGLE_BOOK);
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.AUTHOR_ID_JSON_PATH, Constants.SINGLE_BOOK), authorID, Constants.SINGLE_BOOK);
    await Assert.assertContains(await response.getTagContentByJsonPath(Constants.DATE_ADDED_ISO_JSON_PATH, Constants.SINGLE_BOOK), dateAddedIso, Constants.SINGLE_BOOK);
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.ID_JSON_PATH, Constants.SINGLE_BOOK), this.bookID, Constants.SINGLE_BOOK);
});

Then('user searches for books within date range {string} to {string}',
    async function (startDateIso: string, endDateIso: string) {
        const searchBody = {
            "EndDateIso": `${endDateIso}T00:00:00`,
            "StartDateIso": `${startDateIso}T00:00:00`
        }
        const endPoint = `${process.env.REST_API_BASE_URL}${Constants.SEARCH_BOOK_EP}${this.id}`;
        this.response = await this.rest.post(this.attach, endPoint, getHeader(), JSON.stringify(searchBody), Constants.SEARCH_BOOK);
});

Then('user updates the book that was added {string}, {int}, {int}', async function (available: string, genreId: number, authorID: number) {
    const endPoint = `${process.env.REST_API_BASE_URL}${StringUtil.formatString(Constants.SINGLE_BOOK_EP, this.bookID, this.id)}`;
    const bookResponse: RESTResponse = await this.rest.get(this.attach, endPoint, getHeader(), Constants.SINGLE_BOOK);
    const bookBody = JSON.parse(await bookResponse.getBody());
    bookBody["IsOutOfPrint"] = available;
    bookBody["GenreId"] = genreId;
    bookBody["AuthorId"] = authorID;
    this.response = await this.rest.put(this.attach, endPoint, getHeader(), JSON.stringify(bookBody), Constants.SINGLE_BOOK);    
});

Then('user should see book in search result with details {string}, {string}, {int}, {int}, {string}', async function (bookName: string, available: string, genreId: number, authorID: number, dateAddedIso: string) {
    const response: RESTResponse = this.response;
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.FIRST_NAME_JSON_PATH, Constants.SEARCH_BOOK), bookName, Constants.SEARCH_BOOK);
    await Assert.assertEquals((await response.getTagContentByJsonPath(Constants.FIRST_OUT_OF_PRINT_JSON_PATH, Constants.SEARCH_BOOK)).toString(), available, Constants.SEARCH_BOOK);
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.FIRST_GENRE_ID_JSON_PATH, Constants.SEARCH_BOOK), genreId, Constants.SEARCH_BOOK);
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.FIRST_AUTHOR_ID_JSON_PATH, Constants.SEARCH_BOOK), authorID, Constants.SEARCH_BOOK);
    await Assert.assertContains(await response.getTagContentByJsonPath(Constants.FIRST_DATE_ADDED_ISO_JSON_PATH, Constants.SEARCH_BOOK), dateAddedIso, Constants.SEARCH_BOOK);
    await Assert.assertEquals(await response.getTagContentByJsonPath(Constants.FIRST_ID_JSON_PATH, Constants.SEARCH_BOOK), this.bookID, Constants.SEARCH_BOOK);
});