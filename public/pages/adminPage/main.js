let table = document.querySelector(".table table");

function fecthData() {
  fetch("./php/getDB.php")
    .then((r) => r.json())
    .then((data) => loadData(data));
}

function loadData(data) {
  headers = Object.keys(data[0]);
  let tr = document.createElement("tr");
  headers.forEach((e) => {
    let th = document.createElement("th");
    th.textContent = e;
    tr.append(th);
  });
  table.querySelector("thead").appendChild(tr);
  console.log(data);
  tbody = table.querySelector('tbody');
  data.forEach((e) => {
    tr = document.createElement("tr");
    for (let k in e) {
      let td = document.createElement("td");
      let tt = document.createTextNode(e[k]);
      td.appendChild(tt)
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  console.log(tr);
}

fecthData();
