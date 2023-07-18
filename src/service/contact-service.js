import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  // validasi data
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  // kalau sudah valid baru create contactnya
  return await prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "contact is not found");
  }

  return contact;
};

export default {
  create,
  get,
};
