import Joi from 'joi';

export const categoryValidate = Joi.object({
    nameCategory: Joi.string().min(6).max(255).required(),
    dateCategory: Joi.number(), 
    dateEditCategory: Joi.number()
});
