import {body} from "express-validator";

const loginValidation = [
    body('username')
    .trim()
    .notEmpty()
    .withMessage("Usename is required")
    .matches(/^\S+$/)
    .withMessage("Username should not contain spaces")
    .isLength({min: 5, max: 10})
    .withMessage("Username should be between 5 to 10 characters"),


    body('password')
    .trim()
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({min: 4, max:12})
    .withMessage("Password should be between 5 to 12 characters")
]

export {loginValidation};