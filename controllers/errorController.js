
const errorHandler = async (req, res) => {
  return res.status(200).send({
    msg: `We haven't created this page yet`,
  });
};

module.exports = errorHandler;
