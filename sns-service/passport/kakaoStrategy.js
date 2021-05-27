const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {    //oauth2 공부필요
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({
                where : {snsId: profile.id, provider: 'kakao'},
            });
            if(exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                    
                    
                })
            }
        }catch(err) {
            console.error(err);
            done(error);
        }
    }))
}