import Joi from "joi";

export const workshopValidationSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  city: Joi.string().required(),
  contact: Joi.number().required(),
  address: Joi.string().required(),
  owner: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Validate as a valid MongoDB ObjectId
    .required(),
  timeSlots: Joi.array()
    .items(
      Joi.object({
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
      })
    )
    .required(),
});

export const validateWorkshopData = (req, res, next) => {
  const { error } = workshopValidationSchema.validate(req.body);
  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    return next(new ErrorHandler("Validation failed", 400, validationErrors));
  }
  next();
};
