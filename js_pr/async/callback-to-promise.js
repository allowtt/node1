'use strict';

//Callback Hell example
class UserStorage{
    loginUser(id, password) {
        return new Promise((reslove, reject) => {
            setTimeout(() => {
                if(id === 'lgy' && password === 'test') {
                    reslove(id);
                } else {
                    reject(new Error('not found'));
                }
    
            }, 2000);
        });
    }
    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(user === 'lgy') {
                    reslove({name: 'lgy', role: 'admin'});
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        });
    }
}

const userStorage = new UserStorage();
const id = 'lgy';
const password = 'test';

userStorage.loginUser(id, password)
.then(userStorage.getRoles)
,then(user => console.log(`${user.name}, you have a ${user.role}`))
.catch(error => console.log(error));
// userStorage.loginUser(id, password, (user) => {
//     userStorage.getRoles(user,
//          (userWithRole) => {
//             console.log(`hello ${userWithRole.name}, you have a ${userWithRole.role}`);
//         },
//         (error) => {
//             console.log(error);
//         }    
//     );
// }, 
// (error) => {
//     console.log(error);
// });