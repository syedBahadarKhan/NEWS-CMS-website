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


const userValidation = [
    body('fullname')
    .trim()
    .notEmpty()
    .withMessage("Fullname is required")
    .isLength({min: 3, max: 15})
    .withMessage("Fullname should be between 3 to 15 characters"),

     body('username')
    .trim()
    .notEmpty()
    .withMessage("Usename is required")
    .matches(/^\S+$/)
    .withMessage("Username should not contain spaces")
    .isLength({min: 5, max: 12})
    .withMessage("Username should be between 5 to 12 characters"),

    body('password')
    .trim()
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({min: 4, max:12})
    .withMessage("Password should be between 5 to 12 characters"),

    body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(['admin', 'author'])
    .withMessage("Role must be either admin or author")
]


const userupdateValidation = [
     body('fullname')
    .trim()
    .notEmpty()
    .withMessage("Fullname is required")
    .isLength({min: 3, max: 15})
    .withMessage("Fullname should be between 3 to 15 characters"),

    body('password')
    .optional({checkFalsy:true})
    .isLength({min: 4, max:12})
    .withMessage("Password should be between 5 to 12 characters"),

    body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(['admin', 'author'])
    .withMessage("Role must be either admin or author")
]


const categoryValidation = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({min: 3, max: 15})
    .withMessage("Category name should be between 3 to 15 characters"),

   body("description")
   .isLength({max: 100})
    .withMessage("Description should not exceed 100 characters")

]

const articleValidation = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({min: 5, max: 50})
    .withMessage("Title should be between 5 to 100 characters"),

    body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({min: 50, max: 5000})
    .withMessage("Content should be at least 50 characters long"),

    body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

   
]




export default {loginValidation, userValidation, categoryValidation, articleValidation, userupdateValidation};