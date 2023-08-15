<?php

include_once '../../../php/connection.php';
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"));
  $email = $data->email;
  $password = $data->password;

  $stmt = $conn->prepare("SELECT u.id , u.Email , uf.firstName , uf.secondName , uf.middleName ,uf.lastName , u.password , u.phone_number AS 'Phone Number' , u.date_of_birth AS 'Date of birth' , u.last_login AS 'Last login' FROM user u JOIN user_fullname uf ON uf.id = u.nameID WHERE u.Email = :Em AND u.password = :Ps");
  $stmt->bindParam(':Em', $email);
  $stmt->bindParam(':Ps', $password);
  $stmt->execute();
  $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if ($stmt->rowCount() === 0)
  echo json_encode('none');
  else{
    $id = $user[0]['id'];
    $_SESSION['logedIn'] = $id;

    $updateStmt = $conn->prepare("UPDATE user SET last_login = NOW() WHERE id = :UserId");
    $updateStmt->bindParam(':UserId', $id);
    $updateStmt->execute();

    if ($id == 0)
      echo json_encode('admin');
    else
      echo json_encode($user[0]);
  }
}
