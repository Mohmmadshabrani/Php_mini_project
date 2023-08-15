let loginBtn = document.querySelector(".loginBtnCon button");
let signupBtn = document.querySelector(".signUpBtnCon button");

loginBtn.addEventListener("click", (e) => {
  window.location.href = "./pages/login/login.html";
});

signupBtn.addEventListener("click", (e) => {
  window.location.href = "./pages/signUp/signUp.html";
});
