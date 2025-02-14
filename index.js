import express from 'express';
import {body} from'express-validator';
import cors from'cors'
import {POST,GET}  from'./router/route.js';
const app = express();
import {config} from 'dotenv'
config();
app.use(express.json());
app.use(cors({
   origin:"*",
   methods:["GET","POST"]
}));
const LISTENING_PORT = process.env.PORT || 8000;


const referralValidation =[
    body('referrerName').notEmpty().withMessage('Referrrer name is required'),
    body('referrerEmail').isEmail().withMessage('Invalid email'),
    body('referredName').notEmpty().withMessage('Referee name is required'),
    body('referredEmail').isEmail().withMessage('Invalid email'),
    body('course').notEmpty().withMessage('course selection is required')
];

app.use('/api',referralValidation,POST);
app.use('/api',GET);

app.listen(LISTENING_PORT,()=>{
    console.log(`Server running on port ${LISTENING_PORT}`)
});