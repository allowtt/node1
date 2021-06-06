const express = require('express');
const {v4: uuidv4} = require('uuid');
const {User, Domain} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

console.log('index.js 호출');

router.get('/', async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: { id: req.user && req.user.id || null },
        include: { model: Domain },
      });
      // User.findAll({
      //   where: {id: req.user},
      // }).then(results => {
      //   console.log(results);
      // }).catch(error => {
      //   console.error(error);
      // }) ;
      res.render('login', {
        user,
        domains: user && user.Domains,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.post('/domain', isLoggedIn, async (req, res, next) => {
    try {
        console.log(req.user);
        console.log('========================================================')
        console.log(req.body);
        await Domain.create({
            UserId: req.user.id,
            host: req.body.host,
            type: req.body.type,
            clientSecret: uuidv4(),
        });
        res.redirect('/')
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;