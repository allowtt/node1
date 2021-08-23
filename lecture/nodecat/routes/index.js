const express = require('express');
const axios = require('axios');

const router = express.Router();

// const URL = 'http://localhost:8002/v1';
const URL = 'http://localhost:8002/v2';
axios.defaults.headers.origin = 'http://localhost:4000';

const request = async (req, api) => {
    try {
      if (!req.session.jwt) { // 세션에 토큰이 없으면
        const tokenResult = await axios.post(`${URL}/token`, {
          clientSecret: process.env.CLIENT_SECRET,
        });
        req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
      }
      return await axios.get(`${URL}${api}`, {
        headers: { authorization: req.session.jwt },
      }); // API 요청
    } catch (error) {
      if (error.response.status === 419) { // 토큰 만료시 토큰 재발급 받기
        delete req.session.jwt;
        return request(req, api);
      } // 419 외의 다른  test333
      return error.response;
    }
  };

router.get('/mypost', async (req, res, next) => {
    try {
        console.log('111112222');
        const result = await request(req, '/posts/my');
        console.log('2233333222');
        console.log(`result: ${result.data}`);
        res.status(200).json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }

});

router.get('/search/:hashtag', async (req, res, next) => {
    try {
        const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/', (req, res) => {
    res.render('main', { key: process.env.CLIENT_SECRET});
});

module.exports = router;