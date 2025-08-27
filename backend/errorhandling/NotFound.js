import ExpressError from "./ExpressError.js";

const NotFound = (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
};

export default NotFound;
