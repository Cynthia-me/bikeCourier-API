const Joi = require('joi');

//Signup Validation
const registerValidation = (data) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().alphanum().min(2).required(),
        lastName: Joi.string().min(2).alphanum().required(),
        age: Joi.number().min(18).max(80),
        country: Joi.string().min(4).max(30),
        residence: Joi.string().max(30),
        mail: Joi.string().min(6).required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net']}}),
        pwd: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_pwd: Joi.ref('pwd'),
    });
    return schema.validate(data);
}


 const loginValidation = (data) => {
    const schema = Joi.object().keys({
        mail: Joi.string().min(6).required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net']}}),
        pwd: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_pwd: Joi.ref('pwd')
    });
    return schema.validate(data);
}

const parcelValidation = (data) => {
    const schema = Joi.object().keys({
        parcelItem: Joi.string().required(),
        parcelWeight: Joi.string().required(),
        From : Joi.string().required(),
        To:Joi.string().required(),
        receiver: Joi.string().required(),
        receiver_tel: Joi.number().required(),
        Status:Joi.string()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.parcelValidation = parcelValidation;