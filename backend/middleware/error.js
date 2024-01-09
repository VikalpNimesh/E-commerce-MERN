// const ErrorHander = require("../utils/ErrorHander.js");
const ErrorHander = require("../utils/errorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHander(400, message);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHander(400, message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHander(400, message);
  }

  //wrong mongodb id err
  if (err.name == "CastError") {
    const message = ` Resource not found. Invalid : ${err.path}  `;
    err = new ErrorHander(400, message);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal Server Error";

//   // Wrong Mongodb Id error
//   if (err.name === "CastError") {
//     const message = `Resource not found. Invalid: ${err.path}`;
//     err = new ErrorHander(message, 400);
//   }

//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//   });
// };
