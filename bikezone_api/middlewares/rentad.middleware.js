import Joi from "joi";
import ErrorHandler from "../utils/errorHandler";

const bikeRentValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  model: Joi.number().required(),
  condition: Joi.string().required(),
  location: Joi.string().required(),
  seller: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Validate as a valid MongoDB ObjectId
    .required(),
  contact: Joi.string().required(),
});

export const validateBikeRentData = (req, res, next) => {
  const { error } = bikeRentValidationSchema.validate(req.body);
  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    return next(new ErrorHandler("Validation failed", 400, validationErrors));
  }
  next();
};
