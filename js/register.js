import{checkLogin,chekPassword,checkLoginCorrect,chekPasswordCorrect,errorLogin,errorPassword,userUndefined}from"./checkvalue.js";import{mainPage}from"./script.js";let form=document.getElementById("form"),login=document.getElementById("login"),password=document.getElementById("password"),formContainer=document.getElementById("form-container");function inputData(e,t){return fetch("https://reqres.in/api/register",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:e,password:t})})}function mainLogin(){localStorage.getItem("token")?(formContainer.classList.add("correct"),mainPage()):form.addEventListener("submit",e=>{e.preventDefault();var e=login.value,t=password.value;e?t?inputData(e,t).then(e=>{if(400!==e.status)return formContainer.classList.add("correct"),mainPage(),e.json();userUndefined.textContent="Такого користувача не знайдено! Введіть повторно дані",login.value="",password.value=""}).then(e=>(localStorage.setItem("token",e.token),e)).catch(e=>console.log(e)):(errorPassword.textContent="Поле не має бути порожнім",password.classList.add("form-input-error")):(errorLogin.textContent="Поле не має бути порожнім11111",login.classList.add("form-input-error"))})}login.addEventListener("blur",checkLogin),password.addEventListener("blur",chekPassword),login.addEventListener("focus",checkLoginCorrect),password.addEventListener("focus",chekPasswordCorrect);export{login,password,formContainer,mainLogin};