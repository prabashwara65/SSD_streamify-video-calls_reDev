import Joi from "joi";

const passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export const signupSchema = Joi.object ({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordPattern).required().messages({
        "string.pattern.base":
        "Password must be at least 8 chars, include uppercase, lowercase, number & special character",
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});