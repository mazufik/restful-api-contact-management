import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

const login = async (request) => {
  // untuk validasi data
  const loginRequest = validate(loginUserValidation, request);

  // untuk pengecekan data username ada atau tidak ada
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  // kalau tidak ada tampilkan pesan error
  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  // kalau ketemu atau ada
  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password,
  );

  // kalau passwordnya tidak valid
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }

  // kalau ternyata sudah valid, maka di buatkan token
  const token = uuid().toString();

  // tokennya simpan ke database
  return await prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

export default { register, login };
