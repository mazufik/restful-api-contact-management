import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "mazufik",
      },
    });
  });

  // skenario testing sukses menambahkan user
  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "mazufik",
      password: "secret",
      name: "Maz Ufik",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("mazufik");
    expect(result.body.data.name).toBe("Maz Ufik");
    expect(result.body.data.password).toBeUndefined();
  });

  // skenario testing gagal menambahkan user (username, password dan name kosong)
  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  // skenario testing untuk mencek username dublikat
  it("should reject if username already registered", async () => {
    // data ke 1
    let result = await supertest(web).post("/api/users").send({
      username: "mazufik",
      password: "secret",
      name: "Maz Ufik",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("mazufik");
    expect(result.body.data.name).toBe("Maz Ufik");
    expect(result.body.data.password).toBeUndefined();

    // data ke 2
    result = await supertest(web).post("/api/users").send({
      username: "mazufik",
      password: "secret",
      name: "Maz Ufik",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
