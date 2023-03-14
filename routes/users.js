const userRouter = require("express").Router();
const {
  getAllUsers,
  createUsers,
  logInUser,
  logOutUser,
  getUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");

userRouter.get("/all", getAllUsers);
userRouter.post("/create", createUsers);
userRouter.post("/login", logInUser);
userRouter.get("/logout", logOutUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id/update", editUser);
userRouter.delete("/:id/delete", deleteUser);


module.exports = userRouter;
