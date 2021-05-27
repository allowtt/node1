const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'email', //req.body.email
        passwordField: 'password',  //req.body.password
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({where: {email}});
            if(exUser) { //로컬디비에 유저가 있는경우
                const result = await bcrypt.compare(password, exUser.password); //비밀번호 비교
                if(result) {
                    done(null, exUser);
                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {    //없는경우
                done(null, false, {message: '가입되지않은 이메일'});
            }
        }catch(err) {
            console.error(err);
        }
    }))
}