import { body, validationResult } from "express-validator";

const validator = {
    postValidator: [
        body("description").notEmpty().withMessage("enter discription"),
        body("status").isLowercase().withMessage("enter lowercase")
    ],
    putValidator: [
        body("description").optional().isEmpty().withMessage("enter discription"),
        body("status").optional().isLowercase().withMessage("enter lowercase")
    ],
    result: validationResult
}

export default validator;