const Course = require("../models/courseModel");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).send({
      msg: "Here you have all the courses: ",
      courses,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const createCourses = async (req, res) => {
  try {
    const { title, description, maxStudents, cost } = req.body;
    if (!(title || description || maxStudents || cost)) {
      return res.status(200).send({
        msg: "All fields are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      maxStudents,
      cost,
    });

    return res.status(200).send({
      msg: "Course successfully created",
      course,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
    try {
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) {
        return res.status(200).send({
          msg: "course not registered",
        });
      }
      return res.status(200).send({
        msg: "course found:",
        course,
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };

const editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body);
    if (!course) {
      return res.status(200).send({
        msg: "course not registered",
      });
    }
    return res.status(200).send({
      msg: "course found:",
      course,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(200).send({
        msg: "course not registered",
      });
    }
    return res.status(200).send({
      msg: "course deleted:",
      course,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = { getAllCourses, createCourses, getCourseById, editCourse, deleteCourse };
