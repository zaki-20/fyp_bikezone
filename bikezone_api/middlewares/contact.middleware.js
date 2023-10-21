import Joi from "joi";
import ErrorHandler from "../utils/errorHandler.js";

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

export const validateContactData = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    return next(new ErrorHandler("Validation failed", 400, validationErrors));
  }
  next();
};
