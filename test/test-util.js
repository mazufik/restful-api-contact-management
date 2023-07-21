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

const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: "test",
        firstName: `test ${i}`,
        lastName: `test ${i}`,
        email: `test${i}@maz.com`,
        phone: `080900000${i}`,
      },
    });
  }
};

const removeAllTestAddresses = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};

const createTestAddress = async () => {
  const contact = await getTestContact();
  await prismaClient.address.create({
    data: {
      contactId: contact.id,
      street: "jalan test",
      city: "kota test",
      province: "provinsi test",
      country: "indonesia",
      postalCode: "234234",
    },
  });
};

const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};

export {
  createManyTestContact,
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  getTestUser,
  removeAllTestAddresses,
  removeAllTestContacts,
  removeTestUser,
};
