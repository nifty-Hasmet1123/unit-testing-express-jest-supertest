import request from "supertest";
import app from "../app.js";
import { it, expect, describe } from "@jest/globals";

class AppTest {
    async testGetAllApiCall() {
        // Create a mock instance of a request using the supertest library
        const response = await request(app).get("/api/get")
        
        // Create a object container mocking of values
        const objectContaining = expect.objectContaining({
            id: expect.any(Number),
            name: expect.stringMatching(/\S/),
            email: expect.stringMatching(/\S/)
        })

        // Create assertions 
        expect(response.status).toBe(200);
        // expect.arrayContaining method will do this if all values are in an array with name and email values
        expect(response.body).toEqual(expect.arrayContaining([objectContaining]));
    };

    // success test suite
    async testGetSuccessIndividualApiCall() {
        const validPk = 1;
        const response = await request(app).get(`/api/get/${validPk}`);

        const objectContainer = expect.objectContaining({
            id: expect.any(Number),
            name: expect.stringMatching(/\S/),
            email: expect.stringMatching(/\S/)
        })

        // create assertion
        expect(response.status).toBe(200);
        expect(response.body).toEqual(objectContainer)
    }
    
    // failure test suite
    async testGetFailedIndividualApiCall() {
        const invalidPk = -1;
        const response = await request(app).get(`/api/get/${invalidPk}`)
        
        // create assertion
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "item does not exist" });
    };

    // post success test suite
    async testPostSuccessApiCall() {
        const payload = {
            id: 123,
            name: "sample_name",
            email: "sample.name@example.com"
        }

        const response = await request(app)
            .post("/api/post")
            .send(payload)
            .expect("Content-Type", /json/)
            
        expect(response.status).toBe(201);
        expect(response.body).toEqual(payload);
    };

    // post failed test suite
    async testPostFailedApiCall() {
        const response = await request(app)
            .post("/api/post")
            .send({})
            .expect("Content-Type", /json/)
        
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: "id, name and email should be included"
        })
    }
}

describe("test AppTest class", () => {
    const instance = new AppTest();

    // test GET all api call
    it("GET - /api/get returns hash of name and email", async () => {
        await instance.testGetAllApiCall()
    });

    // test GET individual api call (success test suite)
    it("GET - /api/get/:pk returns hash of that specific pk", async () => {
        await instance.testGetSuccessIndividualApiCall();
    })

    // test GET individual api call (failure test suite)
    it("GET - /api/get/:pk returns hash of error as key ", async () => {
        await instance.testGetFailedIndividualApiCall();
    })

    // test POST api call (success test suite)
    it("POST - /api/post returns hash of newly created post", async () => {
        await instance.testPostSuccessApiCall();
    })

    // test POST api call (failure test suite)
    it("POST - /api/post returns hash of error as key", async () => {
        await instance.testPostFailedApiCall();
    })
})