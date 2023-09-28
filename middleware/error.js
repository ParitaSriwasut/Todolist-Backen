//error middleware has 4 parameters
module.exports = (err, req, res, next) => {
  console.log(err);
  //check a error
  res.status(500).json({ message: err.message });
};
