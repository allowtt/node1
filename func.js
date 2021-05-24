const value = require('./var');
const {odd, even} = value;
console.log(value);
console.log(odd);
console.log(even);

function checkOddOrEven(number) {
    if(number % 2) {
        return odd;
    } else {
        return even;
    }
}

module.exports = checkOddOrEven;