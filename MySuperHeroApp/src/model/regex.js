var expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
var email = 'wbouricha5@gmail.com';
var result = expression.test(email); // true
console.log('l\'e-mail est ' + (result ? 'correct' : 'incorrect'));
var regexName = new RegExp(/^[a-zA-Z0-9 ]*$/);
var nameR = "wassim";
var resultName = regexName.test(nameR);
console.log('Le nom est ' + (resultName ? 'correct' : 'incorrect'));
var regexPower = /^[a-zA-Z- ]*$/;
var power = "spider-sense";
var resultPower = regexPower.test(power);
console.log('Le pouvoir est ' + (resultPower ? 'correct' : 'incorrect'));
