const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({
      msg: "Here you have all the users:",
      users,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const createUsers = async (req, res) => {
  try {
    const { name, lastName, email, zipCode, password } = req.body;
    if (!(name || lastName || email || zipCode || password)) {
      return res.status(200).send({
        msg: "All fields are required",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(200).send({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      lastName,
      email: email.toLowerCase(),
      zipCode,
      password: hashedPassword,
    });

    const token = jwt.sign({}, process.env.TOKEN_KEY, { expiresIn: "3m" });
    user.token = token;
    return res.status(200).send({
      msg: "User successfully created",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(200).send({
        msg: "All fields are required",
      });
    }
    const confirmUser = await User.findOne({ email });
    if (!confirmUser) {
      return res.status(200).send({
        msg: "Please register to log in.",
      });
    }
    if (confirmUser && (await bcrypt.compare(password, confirmUser.password))) {
      const token = jwt.sign({}, process.env.TOKEN_KEY, { expiresIn: "3m" });
      confirmUser.token = token;
      return res.status(200).send({
        msg: `Welcome to our site! You're logged in!`,
        confirmUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const logOutUser = async (req, res) => {
  try {
      console.log(req.session)
      return res.status(200).send({
          message: req.session
      })
  } catch (error) {
      return res.status(500).send({
          message: error.message
      })
  }
};

const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if(!user){
            return res.status(200).send({
                msg: 'User not registered'
            })
        }
        return res.status(200).send({
            msg: 'User found:',
            user
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
};

const editUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id, req.body)
        if(!user){
            return res.status(200).send({
                msg: 'User not registered'
            })
        }
        return res.status(200).send({
            msg: 'User found:',
            user
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(200).send({
                msg: 'User not registered'
            })
        }
        return res.status(200).send({
            msg: 'User deleted:',
            user
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
};

module.exports = {
  getAllUsers,
  createUsers,
  logInUser,
  logOutUser,
  getUser,
  editUser,
  deleteUser,
};
