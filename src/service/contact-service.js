import { prismaClient } from "../application/database.js";
import { createContactValidation } from "../validation/contact-validation.js";
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

export default {
  create,
};
