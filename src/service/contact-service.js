import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
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

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchContactValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 1
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          firstName: {
            contains: request.name,
          },
        },
        {
          lastName: {
            contains: request.name,
          },
        },
      ],
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
