import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ msg: "Gagal mendapatkan data", success: false });
    console.log(error);
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ msg: "Gagal mendapatkan data", success: false });
    console.log(error);
  }
};

export const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  const users = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (users) {
    return res.status(400).json({
      success: false,
      msg: "User telah terdaftar",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Berhasil menambahkan user", success: true });
  } catch (error) {
    res.status(400).json({ msg: "Gagal menambahkan user", success: false });

    console.log(error);
  }
};

export const editUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({
      success: true,
      msg: "User berhasil di update",
    });
  } catch (error) {
    res.status(400).json({ msg: "Gagal edit user", success: false });
    res.json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      success: true,
      msg: "User berhasil di hapus",
    });
  } catch (error) {
    res.status(400).json({ msg: "Gagal delete user", success: false });
    res.json({ message: error });
  }
};

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  const users = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (users) {
    return res.status(400).json({
      success: false,
      msg: "User telah terdaftar",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil", success: true });
  } catch (error) {
    res.status(400).json({ msg: "Gagal Register", success: false });
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const Get_user = await Users.findAll({
      where: {
        email: req.body.email,
      },
      attributes: ["id", "name", "email"],
    });
    
    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match)
      return res
        .status(400)
        .json({ msg: "Email atau Password Salah", success: false });

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      msg: "Berhasil Login",
      accessToken,
      user: Get_user,
    });
  } catch (error) {
    res.status(400).json({ msg: "Email atau Password Salah", success: false });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
