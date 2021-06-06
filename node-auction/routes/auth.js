const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

//회원가입 라우터
router.post('/join', isNotLoggedIn, async(req, res, next) => {
    const {email, nick, password, money} = req.body;
    try {
        const exUser = await User.findOne({ where: {email}});
        if(exUser) {
            return res.redirect('/join?error=exist');
        }
        
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
            money,
        });

        console.log('회원가입 성공');
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

//로그인시
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {    //req.login하면 passport/index에 시리얼라이즈유저로 간다.
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            //세션 쿠키 브라우저로 보내는게 숨겨져있다.
            return res.redirect('/');
        });
    })(req, res, next); //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

