const express = require('express')
const router = express.Router()
require('dotenv').config({path: '../config/config.env'})


router.get('/captcha', async(req, res) =>{

const google_API = process.env.GOOGLE_CAPTCH_API
res.status(200).json({ API: google_API  });

})





