let name = document.querySelector(".title span");
let email = document.querySelector(".userinfo .email span");
let Fname = document.querySelector(".userinfo .Name span");
let phoneNum = document.querySelector(".userinfo .phoneNumber span");

fecthData();

function fecthData() {
  fetch("./php/getData.php")
    .then((r) => r.json())
    .then((data) => loadData(data[0]));
}

function loadData(data) {
  console.log(data);
  name.innerHTML = data["firstName"];
  email.innerHTML = data["Email"];
  Fname.innerHTML = `${data["firstName"]} ${data["secondName"]} ${data["middleName"]} ${data["lastName"]}`;
  phoneNum.innerHTML = data["phone_number"];
}
