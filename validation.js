const Joi = require("joi");

const validateReport = (data) => {
  const schema = Joi.object({
    reportDetails: Joi.object().keys({
      userID: Joi.required(),
    marketID: Joi.required(),
    marketName: Joi.string().required(),
    cmdtyID: Joi.string().required(),
    marketType: Joi.string(),
    cmdtyName: Joi.string().required(),
    priceUnit: Joi.string().required(),
    convFctr: Joi.number().required(),
    price: Joi.number().required(),
    }).required()
  });
  return schema.validate(data);
};

module.exports.validateReport = validateReport;
