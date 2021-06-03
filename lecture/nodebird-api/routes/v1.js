const express = require('express');
const jwt = require('jsonwebtoken');

const {verifyToken} = require('./middlewares');
const {Domain, User} = require('../models');

const router = express.Router();

router.post('/token', async (req, res) => {
    const{clientSecret} = req.body;
    try {
        
    } catch(error) {

    }
})