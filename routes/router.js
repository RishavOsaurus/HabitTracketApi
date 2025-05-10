import express from 'express'
import { getHabits, createHabits,editHabits,delHabits} from '../controller/habitcontroller.js'
import { query, body,param} from 'express-validator'
const router = express.Router()
import { expVal } from '../utils/utils.js'
router.get('/habits',[query('completed')
    .optional()
    .isBoolean()
    .withMessage("Completed Must be True or False"),
    query('frequency')
        .optional()
        .isIn(['daily','weekly','monthly'])
        .withMessage("Freq Must be Daily, Weekly or Monthly")
    ],
    expVal,
    getHabits)

router.post('/habits',[
    body('name')
    .exists().withMessage("Name is Required")
    .isString().withMessage("Needs to be a String")
    .isLength({min:3 }).withMessage('Name must be atleast 3 characters long'),

    body('description')
    .exists().withMessage("Description is Required")
    .isString().withMessage("Description to be a String")
    .isLength({min:5 }).withMessage('Description must be atleast 3 characters long'),

    body('frequency')
    .exists().withMessage("Frequency is Required")
    .isString().withMessage("Frequency to be a String")
    .isIn(['daily','weekly','monthly']).withMessage("Frequency must be 'daily', 'weekly', or 'monthly'"),

      body('completed')
    .exists().withMessage('Completed is required')
    .isBoolean().withMessage('Completed must be true or false')

],expVal,createHabits)

router.patch("/habits/:id",[
    param('id')
        .exists()
        .withMessage("ID IS REQUIRED")
        .isInt({min: 1}).withMessage("ID Must be a Valid Integer"),
   body('name')
        .optional()
        .isString().withMessage("Needs to be a String")
        .isLength({min:3 }).withMessage('Name must be atleast 3 characters long'),

    body('description')
        .optional()
        .isString().withMessage("Description to be a String")
        .isLength({min:5 }).withMessage('Description must be atleast 3 characters long'),

    body('frequency')
        .optional()
        .isString().withMessage("Frequency to be a String")
        .isIn(['daily','weekly','monthly']).withMessage("Frequency must be 'daily', 'weekly', or 'monthly'"),

      body('completed')
        .optional()
        .isBoolean().withMessage('Completed must be true or false')
    
],expVal,editHabits)

router.put("/habits/:id",
     param('id')
        .exists()
        .withMessage("ID IS REQUIRED")
        .isInt({min: 1}).withMessage("ID Must be a Valid Integer"),
   body('name')
        .exists().withMessage("Name Required")
        .isString().withMessage("Needs to be a String")
        .isLength({min:3 }).withMessage('Name must be atleast 3 characters long'),

    body('description')
        .exists().withMessage("Description Required")
        .isString().withMessage("Description to be a String")
        .isLength({min:5 }).withMessage('Description must be atleast 3 characters long'),

    body('frequency')
        .exists().withMessage("Frequency Required")
        .isString().withMessage("Frequency to be a String")
        .isIn(['daily','weekly','monthly']).withMessage("Frequency must be 'daily', 'weekly', or 'monthly'"),

      body('completed')
        .exists().withMessage("Completed Required")
        .isBoolean().withMessage('Completed must be true or false')
        .isBoolean().withMessage('Completed must be true or false')
   , expVal,editHabits)

router.delete("/habits/:id",delHabits)

export default router