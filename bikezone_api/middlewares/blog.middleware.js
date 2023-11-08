import Joi from "joi";
import CustomError from "../utils/errorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";

const blogSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const validateBlogData = (req, res, next) => {
  const { error } = blogSchema.validate(req.body);
  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    return next(new ErrorHandler("Validation failed", 400, validationErrors));
  }
  next();
};
