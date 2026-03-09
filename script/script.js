const loginPart = document.getElementById("login_part");
const mainPart = document.getElementById("main_part");
const username = document.getElementById("username");
const pass = document.getElementById("pass");
const signinBtn = document.getElementById("signin_btn");
const newissue = document.getElementById("newissue");
const search = document.getElementById("search");
if(username === "admin" && pass === "admin123")
{
    loginPart.classList.add.hidden;
    mainPart.classList.remove.hidden;
}
const mainpage=()=>{
//     if(username.value === "admin" && pass.value === "admin123")
// {
//     loginPart.classList.add("hidden");
//     mainPart.classList.remove("hidden");
// }
// else{
//     alert("Wrong username or password.Please try again.")
// }
}