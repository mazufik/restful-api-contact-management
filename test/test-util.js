import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("secret", 10),
      name: "Test Name",
      token: "test",
    },
  });
};

const getTestUser = async () => {
  return await prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      firstName: "test",
      lastName: "test",
      email: "test@maz.com",
      phone: "080900000",
    },
  });
};

const getTestContact = async () => {
  const result = await prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });

  return result;
};

export {
  createTestContact,
  createTestUser,
  getTestContact,
  getTestUser,
  removeAllTestContacts,
  removeTestUser,
};
