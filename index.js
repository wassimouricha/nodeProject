const text = "Je suis un papy de 90 ans";
const regex = /[0-9]+ ans/;

const regux = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/;
const plaque = "BP-499-EV";

const match = text.match(regex);
const matchus = plaque.match(regux);

const mailregex = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+=?^_`{|}~]+@[gmail.com | outlook.com | orange.fr | wanadoo.fr | yahoo.com]+$/;
const mail = "wbouricha5@orange.fr";
const matchmail = mail.match(mailregex);

const phoneregex = /^(\+33|0)[0-9]{1}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$/;
const phone = "+33695580726";
const matchphone = phone.match(phoneregex);

console.log(match);
console.log(matchus);
console.log(matchmail);
console.log(matchphone);

