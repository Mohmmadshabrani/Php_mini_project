<?php
include_once '../../../php/connection.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  session_start();
  $id = $_SESSION['logedIn'];
  if ($id == 0) {
    $stmt = $conn->prepare(
      "SELECT u.id AS 'ID',
       u.Email ,
        uf.firstName AS 'First Name' ,
        uf.secondName AS 'Second Name' ,
        uf.middleName AS 'Middle Name',
        uf.lastName AS 'Last Name' ,
        u.password AS 'Password' ,
        u.phone_number AS 'Phone Number' ,
        DATE_FORMAT(u.date_of_birth, '%d-%b-%y') AS 'Date of birth' ,
        DATE_FORMAT(u.last_login, '%d-%b-%y') AS 'Last login'
        FROM user u JOIN user_fullname uf ON uf.id = u.nameID"
    );
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
  } else
    echo json_encode('NOT_ALLOWED');
}
