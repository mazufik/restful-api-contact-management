import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
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

const getUser = async (username) => {
  // validasi data username
  username = validate(getUserValidation, username);

  // mengambil data dari database
  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  // kita cek, kalau usernya tidak ada
  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

const updateUser = async (request) => {
  // validasi datanya
  const user = validate(updateUserValidation, request);

  // mengecek data yang akan di update di database
  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  // jika data usernya tidak ada
  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User is not found");
  }

  // kalau user di temukan
  const data = {};
  // kalau ingin update nama
  if (user.name) {
    data.name = user.name;
  }
  // kalau ingin update password
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  // validasi data
  username = validate(getUserValidation, username);

  // cek ke database
  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  // kalau user tidak ada
  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

export default { register, login, getUser, updateUser, logout };
