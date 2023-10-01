"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const { Select } = require('enquirer');
console.log("testando");
function getAutores() {
    fetch('http://localhost:3100/autor/')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
}
getAutores();
let contador = 1;
