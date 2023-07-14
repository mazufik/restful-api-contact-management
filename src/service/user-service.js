import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  // untuk validasi data
  const user = validate(registerUserValidation, request);

  // untuk mencek apakah usernya ada atau tidak ada
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  // kalau ada tampilkan pesan error
  if (countUser === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  // untuk enkripsi password
  user.password = await bcrypt.hash(user.password, 10);

  // kalau tidak ada tambahkan ke database
  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

export default { register };
