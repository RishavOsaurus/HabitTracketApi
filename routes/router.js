import express from 'express'
import { getHabits, createHabits} from '../controller/habitcontroller.js'
import { query, body} from 'express-validator'
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
export default router