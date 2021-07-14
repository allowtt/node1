'use strict';

console.log(1);
setTimeout(() => {
    console.log(2);
}, 0);
console.log(3);

// Synchronous callback
function printImmediately(print) {
    print();
};
printImmediately(() => console.log('hello'));

// Asynchronous callback
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
};
printWithDelay(() => console.log('printWithDelay'), 2000);

//Callback Hell example

class UserStorage{
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if(id === 'lgy' && password === 'test') {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }

        }, 2000)
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if(user === 'lgy') {
                onSuccess({name: 'lgy', role: 'admin'});
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage();
const id = 'lgy';
const password = 'test1';
userStorage.loginUser(id, password, (user) => {
    userStorage.getRoles(user,
         (userWithRole) => {
            console.log(`hello ${userWithRole.name}, you have a ${userWithRole.role}`);
        },
        (error) => {
            console.log(error);
        }    
    );
}, 
(error) => {
    console.log(error);
});