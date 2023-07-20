import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAddressValidation } from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, contactId, request) => {
  // validasi
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  // cek contact ada atau tidak ada
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  // validasi address
  const address = validate(createAddressValidation, request);
  address.contactId = contactId;

  // kalau contact nya ada
  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

export default {
  create,
};
