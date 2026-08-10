import request from "supertest";
import { app } from "./app.js";


test("index route works", done => {
  request(app)
   .get("/")
     .expect("Content-Type", /json/)
     .expect({ name: "frodo"})
     .expect(200, done);
});

