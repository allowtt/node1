'use strict';

//State: pending -> fulfilled or rejected
//Producer vs Consumer

// 1. Producer
//new Promise를 하는순간 executor가 자동으로 바로 실행됨
const promise = new Promise((resolve, reject) => {
    //doing some heavy work(network, read files)
    console.log('doing something');
    setTimeout(() => {
        // resolve('lgy');
        reject(new Error('error....'));
    }, 2000);
});

promise.then(value => {
    console.log(value);
})
.catch(error => {
    console.log(1);
    console.error(error);
    console.log(2);
})
.finally(() => {
    console.log('finally');
});
