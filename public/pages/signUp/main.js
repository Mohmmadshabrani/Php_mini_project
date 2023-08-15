let submitBtn = document.querySelector(".submitBtn button");
let form = document.querySelector("#signup-form");
let userName = document.getElementById("username").value;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let a = validate();
  if (a) {
    console.log(1);
  }
});

function validate() {
  let status = true;
  status = status && validateName(form.fullName);
  status = status && validateUserName(form.username);
  status = status && validateEmailAndPassword();
  status = status && restOfvaliadtion();
  console.log(status);
  if (status) insertDB();
}

function insertDB() {

  let user = {
    fullname: form.fullName.value,
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
    dob: form.dob.value,
    phonenumber: form.phonenumber.value,
  };
  console.log(JSON.stringify(user));
  fetch("./php/insert.php", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(user),
  })
    .then((r) => r.json())
    .then((data) => {
      if(data[0]['Email']){
        window.location.href = "../mainPage/mainPage.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function validateEmailAndPassword() {
  return new Promise((resolve, reject) => {
    formData = new FormData(form);
    formData = Object.fromEntries(formData);
    fetch("./php/validateForm.php", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        let status = true;
        if (!data.email) {
          status = false;
          alertWrong(form.email, "Invalid Email");
        }

        if (!data.password) {
          status = false;
          alertWrong(form.password, "Invalid Password");
        }
        resolve(status);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
}

function restOfvaliadtion() {
  let status = true;
  if (!(form.conformpassword.value == form.password.value)) {
    status = false;
    alertWrong(form.conformpassword, "Passwords does not match");
  }
  status = status && validateDate(form.dob);
  status = status && validatephonenumber(form.phonenumber);
  return status;
}
function validatephonenumber(e) {
  if (checkEmpty(e)) return false;

  let value = e.value.trim();

  if (value.length === 10) {
    let pattern = /^[0-9]+$/;
    if (!pattern.test(value)) {
      alertWrong(e, "Phone number can only contain numbers");
      return false;
    }
  } else if (value.length === 14) {
    let pattern = /^00[0-9]+$/;
    if (!pattern.test(value)) {
      alertWrong(e, "Invalid format for 14-digit phone number");
      return false;
    }
  } else {
    alertWrong(e, "Phone number should be either 10 or 14 digits");
    return false;
  }
  return true;
}

function validateDate(e) {
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(
    currentDate.getFullYear() - 16,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  if (checkEmpty(e)) {
    return false;
  }
  const inputDate = new Date(e.value);

  if (inputDate > eighteenYearsAgo) {
    e.type = "text";
    e.value = "";
    e.classList.add("alert");
    e.placeholder = "Must Be Older Than 16";

    return false;
  }
  return true;
}
function validateUserName(e) {
  if (checkEmpty(e)) return false;
  let pattern = /^[a-zA-Z0-9_.]+$/i;
  if (!e.value.match(pattern)) {
    alertWrong(
      e,
      "Cannot contain special characters except underscores or periods"
    );
    return false;
  }
  return true;
}
function validateName(e) {
  if (checkEmpty(e)) return false;
  let pattern = /^[A-Za-z]+ [A-Za-z]+ [A-Za-z]+ [A-Za-z]+$/i;
  if (!e.value.match(pattern)) {
    alertWrong(e, "Enter 4-part Name With only letters in it");
    return false;
  }
  return true;
}

function alertWrong(e, errMas) {
  e.value = "";
  e.classList.add("alert");
  warningElement = `${errMas}`;
  e.placeholder = warningElement;
}
function checkEmpty(ele) {
  if (ele.value.trim() === "") {
    alertWrong(ele, "This field is mandatory");
    return true;
  }
  return false;
}
