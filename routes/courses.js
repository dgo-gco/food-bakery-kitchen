const courseRouter = require("express").Router();
const { getAllCourses, createCourses, getCourseById, editCourse, deleteCourse } = require('../controllers/courseController')

courseRouter.get("/all", getAllCourses);
courseRouter.post("/create", createCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.put("/:id/update", editCourse);
courseRouter.delete("/:id/delete", deleteCourse);


module.exports = courseRouter