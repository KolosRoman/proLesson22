import {mainLogin} from './register.js';
import {nextOpenPage, lastOpenPage, addNewUser, updateUser, deleteUser, exit} from './script.js';

let btnNext = document.getElementById('button-next');
let btnPrev = document.getElementById('button-previous');
let btnExit = document.getElementById('button-exit');
let addButton = document.getElementById('add-button');
let updateButton = document.getElementById('update-button');
let deleteButton = document.getElementById('delete-button');

mainLogin();



btnNext.addEventListener('click', nextOpenPage);

btnPrev.addEventListener('click', lastOpenPage);

btnExit.addEventListener('click', exit);

addButton.addEventListener('click', addNewUser);

updateButton.addEventListener('click', updateUser);

deleteButton.addEventListener('click', deleteUser);

