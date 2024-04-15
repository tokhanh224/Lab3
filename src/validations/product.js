import Joi from 'joi';

export const ProductValidate = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    price: Joi.number().min(0).required(),
    categoryID: Joi.string().required()
});
