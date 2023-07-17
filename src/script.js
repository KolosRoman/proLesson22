import {formContainer, login, password} from './register.js';

let userBlock = document.getElementById('user-block');
let page1 = document.getElementById('page1');
let page2 = document.getElementById('page2');
let counter = 1;

export function mainPage() {
    fetch(`https://reqres.in/api/users?page=${counter}`)
        .then(response => response.json())
        .then(response => {
            if (counter === 1) {
                let mappedUsers = response.data.map((user) => {
                    user.name = `${user.first_name} ${user.last_name}`
                    return user;
                })
            
                mappedUsers.forEach((user) => {
                    const card = document.createElement('div');
                    const cardTitle = document.createElement('h3');
                    const cardEmail = document.createElement('p');
                    const cardAvatar = document.createElement('img');
                    const cardId = document.createElement('p');
                    cardId.innerText = user.id;
                    cardId.classList.add('id-number');
                    cardAvatar.alt = 'photo-user';
                    cardTitle.innerText = user.name;
                    cardTitle.classList.add('page-name');
                    cardEmail.innerText = user.email;
                    cardEmail.classList.add('page-email');
                    cardAvatar.src = user.avatar;
                    card.append(cardTitle, cardEmail, cardAvatar, cardId);
                    card.classList.add('card-block');
                    page1.insertAdjacentElement('beforeend', card);
                })
                userBlock.append(page1);
            }
            counter++
        })
        .catch(error => console.log(error))
}

export async function nextOpenPage() {
    if(counter === 2) {
        while (page2.firstChild) {
            page2.firstChild.remove();
        }
        try {
            let result = await fetch(`https://reqres.in/api/users?page=${counter}`);
            let response = await result.json();
            let mappedUsers = response.data.map((user) => {
                    user.name = `${user.first_name} ${user.last_name}`
                    return user;
                })
            
            mappedUsers.forEach((user) => {
                const card = document.createElement('div');
                const cardTitle = document.createElement('h3');
                const cardEmail = document.createElement('p');
                const cardAvatar = document.createElement('img');
                const cardId = document.createElement('p');
                cardId.innerText = user.id;
                cardId.classList.add('id-number');
                cardAvatar.alt = 'photo-user';
                cardTitle.innerText = user.name;
                cardTitle.classList.add('page-name');
                cardEmail.innerText = user.email;
                cardEmail.classList.add('page-email');
                cardAvatar.src = user.avatar;
                card.append(cardTitle, cardEmail, cardAvatar, cardId);
                card.classList.add('card-block');
                page2.insertAdjacentElement('beforeend', card);
            })
            userBlock.append(page2);
        } catch (error) {
            console.log(error);
        }
        counter--
    }
    
    page1.classList.add('active')
    page2.classList.remove('active')
}

export async function lastOpenPage() {
    if(counter === 1) {
        while (page1.firstChild) {
            page1.firstChild.remove();
        }

        try {
            let result = await fetch(`https://reqres.in/api/users?page=${counter}`);
            let response = await result.json();
            
            let mappedUsers = response.data.map((user) => {
                    user.name = `${user.first_name} ${user.last_name}`
                    return user;
                })
            
            mappedUsers.forEach((user) => {
                const card = document.createElement('div');
                const cardTitle = document.createElement('h3');
                const cardEmail = document.createElement('p');
                const cardAvatar = document.createElement('img');
                const cardId = document.createElement('p');
                cardId.innerText = user.id;
                cardId.classList.add('id-number');
                cardAvatar.alt = 'photo-user';
                cardTitle.innerText = user.name;
                cardTitle.classList.add('page-name');
                cardEmail.innerText = user.email;
                cardEmail.classList.add('page-email');
                cardAvatar.src = user.avatar;
                card.append(cardTitle, cardEmail, cardAvatar, cardId);
                card.classList.add('card-block');
                page1.insertAdjacentElement('beforeend', card);
            })
            userBlock.append(page1);
        } catch (error) {
            console.log(error);
        }
        counter++
    }
    
    page2.classList.add('active')
    page1.classList.remove('active')
}


let inputName = document.getElementById('user-name');
let inputSurname = document.getElementById('surname');
let inputEmail = document.getElementById('email');
let inputJob = document.getElementById('job');
let inputId = document.getElementById('id-number');
let createUsersBlock = document.getElementById('create-users');
let errorMessage = document.getElementById('error');


export async function addNewUser() {
    if(!inputName.value || !inputSurname.value || !inputEmail.value || !inputJob.value) {
        errorMessage.innerText = 'Всі поля мають бути заповнені';
        return;
    }

    let newCard = document.createElement('div');
    let newCardTitle = document.createElement('h3');
    let newId = document.createElement('p');
    let newCardEmail = document.createElement('p');
    let newCardJob = document.createElement('p');

    try {
        let newPerson = {
            name: inputName.value,
            surname: inputSurname.value,
            email: inputEmail.value,
            job: inputJob.value,
        }
    
        let result = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newPerson)
        })
    
        let response = await result.json();
        newId.innerText = response.id;
        newId.classList.add('id-number');
        newCardTitle.innerText = `${response.name} ${response.surname}`;
        newCardTitle.classList.add('new-user-title');
        newCardEmail.innerText = response.email;
        newCardEmail.classList.add('new-user-email');
        newCardJob.innerText = response.job;
        newCardJob.classList.add('new-user-job');
        newCard.append(newId, newCardTitle, newCardEmail, newCardJob);
        newCard.classList.add('newCard');
        createUsersBlock.append(newCard);
    } catch (error) {
        console.log(error);
    }

    inputName.value = '';
    inputSurname.value = '';
    inputEmail.value = '';
    inputJob.value = '';
    errorMessage.innerText = '';
}

export function updateUser() {
    let updateNum = inputId.value;
    let updateCardArray = document.getElementsByClassName('newCard');
    let updateCardMain = document.getElementsByClassName('card-block');

    let updatePerson = {
        name: inputName.value,
        surname: inputSurname.value,
        email: inputEmail.value,
        job: inputJob.value,
    }

    let updateUser = fetch(`https://reqres.in/api/users/${updateNum}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatePerson)
    })

    updateUser.then(response => {
        if(response.status === 200)
        return response.json();
    })
        .then(response => {
            for (let updateCard of updateCardArray) {
                let idNumber = updateCard.querySelector('.id-number').innerText
                if (idNumber === updateNum) {
                    if(response.name) {
                        let userName = updateCard.querySelector('.new-user-title').innerText.split(' ')[0];
                        let str = updateCard.querySelector('.new-user-title').innerText.replace(userName, response.name);
                        updateCard.querySelector('.new-user-title').innerText = str;
                    }
                    if(response.surname) {
                        let userSurname = updateCard.querySelector('.new-user-title').innerText.split(' ')[1];
                        let str = updateCard.querySelector('.new-user-title').innerText.replace(userSurname, response.surname);
                        updateCard.querySelector('.new-user-title').innerText = str;
                    }
                    if(response.email) {
                        updateCard.querySelector('.new-user-email').innerText = response.email;
                    }
                    if(response.job) {
                        updateCard.querySelector('.new-user-job').innerText = response.job;
                    }
                }
            }

            for (let updateCard of updateCardMain) {
                let idNumber = updateCard.querySelector('.id-number').innerText
                if (idNumber === updateNum) {
                    if(response.name) {
                        let userName = updateCard.querySelector('.page-name').innerText.split(' ')[0];
                        let str = updateCard.querySelector('.page-name').innerText.replace(userName, response.name);
                        updateCard.querySelector('.page-name').innerText = str;
                    }
                    if(response.surname) {
                        let userSurname = updateCard.querySelector('.page-name').innerText.split(' ')[1];
                        let str = updateCard.querySelector('.page-name').innerText.replace(userSurname, response.surname);
                        updateCard.querySelector('.page-name').innerText = str;
                    }
                    if(response.email) {
                        updateCard.querySelector('.page-email').innerText = response.email;
                    }
                }
            }

        })
        .catch(error => console.log(error))


    inputName.value = '';
    inputSurname.value = '';
    inputEmail.value = '';
    inputJob.value = '';
    inputId.value = '';
}

export async function deleteUser() {
    let delatePerson = inputId.value;
    let delateCardArray = document.getElementsByClassName('newCard');
    let delateCardMain = document.getElementsByClassName('card-block');

    try {
        let result = await fetch(`https://reqres.in/api/users/${delatePerson}`, {
        method: 'DELETE'
    })
    
    if(result.status === 204) {
        for (let delateCard of delateCardArray) {
            let idNumber = delateCard.querySelector('.id-number').innerText
            if (idNumber === delatePerson) {
                delateCard.remove();
            }
        }

        for (let delateCard of delateCardMain) {
            let idNumber = delateCard.querySelector('.id-number').innerText
            
            if (idNumber === delatePerson) {
                delateCard.remove();
            }
        }
    }
    } catch (error) {
        console.log(error);
    }

    inputId.value = '';
}


export function exit() {
    localStorage.removeItem('token');
    formContainer.classList.remove('correct');
    login.value = '';
    password.value = '';
}