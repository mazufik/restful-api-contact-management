import supertest from "supertest";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  // test yang valid
  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test",
        lastName: "test",
        email: "test@maz.com",
        phone: "080900000000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("test");
    expect(result.body.data.lastName).toBe("test");
    expect(result.body.data.email).toBe("test@maz.com");
    expect(result.body.data.phone).toBe("080900000000");
  });

  // test yang invalid
  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "test",
        email: "test",
        phone: "080900000000223123456",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const { id, firstName, lastName, email, phone } = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contacts/${id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(id);
    expect(result.body.data.firstName).toBe(firstName);
    expect(result.body.data.lastName).toBe(lastName);
    expect(result.body.data.email).toBe(email);
    expect(result.body.data.phone).toBe(phone);
  });

  // test yang salah
  it("should return 404 if contact id is not found", async () => {
    const { id } = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contacts/${id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const { id } = await getTestContact();

    const result = await supertest(web)
      .put(`/api/contacts/${id}`)
      .set("Authorization", "test")
      .send({
        firstName: "Antony",
        lastName: "Kurniawan",
        email: "antony@maz.com",
        phone: "0809000000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(id);
    expect(result.body.data.firstName).toBe("Antony");
    expect(result.body.data.lastName).toBe("Kurniawan");
    expect(result.body.data.email).toBe("antony@maz.com");
    expect(result.body.data.phone).toBe("0809000000");
  });

  // test yang salah
  it("should reject if request is invalid", async () => {
    const { id } = await getTestContact();

    const result = await supertest(web)
      .put(`/api/contacts/${id}`)
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "Kurniawan",
        email: "antony",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  // test kontak tidak ada
  it("should reject if contact is not found", async () => {
    const { id } = await getTestContact();

    const result = await supertest(web)
      .put(`/api/contacts/${id + 1}`)
      .set("Authorization", "test")
      .send({
        firstName: "Antony",
        lastName: "Kurniawan",
        email: "antony@maz.com",
        phone: "0809000000",
      });

    expect(result.status).toBe(404);
  });
});
