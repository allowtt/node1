const { exception } = require('console');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('combined')); //요청과 ~~ 기록하는거  combined가 좀더 정확함
app.use(cookieParser('lgy'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'lgy',
    cookie: {
        httpOnly: true,
    },
    // name: 'connect.sid',
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log("서버로 보낼때마다 실행(모든요청에)1");
    next();
},(req, res, next) => {
    console.log("서버로 보낼때마다 실행(모든요청에)2");
    next();
},(req, res, next) => {
    console.log("서버로 보낼때마다 실행(모든요청에)2");
    // throw new Error('에러발생');
    next();    
});
app.get('/', (req, res) => {
    req.cookies;
    req.signedCookies;  //서명(암호화)된 쿠키
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly: true,
        path: '/',
    })
    const test123 = {"t1" : "t111","t2" : "t222"};
    // res.send(JSON.stringify(test123));
    res.sendFile(path.join(__dirname, './index.html'));
});
app.post('/', (req, res) => {
    res.send('hello express(post)');
});
app.get('/about', (req, res) => {
    res.send('about ~~~~');
});
app.post('/json', (req, res) => {
    res.json({hello : 'lgy'});
});
app.get('/category/:name', (req, res) => {
    res.send(`hello ${req.params.name}`);
});

app.use((req, res, next) => {
    // res.send('404에러');
    // console.log(res);
    res.status(200).send('404에러');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러가발생했다.');
});
app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
