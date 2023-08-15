let form = document.querySelector("#login-form");

let submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    form.email.value.trim().length !== 0 &&
    form.password.value.trim().length !== 0
  ) {
    let credentials = {
      email: form.email.value.trim(),
      password: form.password.value.trim(),
    };
    fetch("./php/queryUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((r) => r.json())
      .then((data) => handleResponse(data));
  } else {
    console.log(form.email.value.trim().length);
    if (form.email.value.trim().length == 0) 
        alertWrong(form.email, 'write anything dude!')
    if (form.password.value.trim().length == 0) 
        alertWrong(form.password, 'just put a basic complex long bs')
  }
});

function handleResponse(data) {
  console.log(typeof data);
  if (data === "admin") window.location.href = "../adminPage/adminPage.html";
  else if (data === "none") notAnAccount();
  else window.location.href = '../mainPage/mainPage.html';
}
function notAnAccount(){
  alertWrong(form.email , 'An Invalid Email Or Password');
  form.password.value = '';
}
function alertWrong(e, errMas) {
  e.value = "";
  e.classList.add("alert");
  warningElement = `${errMas}`;
  e.placeholder = warningElement;
}
