<?php
include_once '../../../php/connection.php';
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"));

  $fullname = explode(' ', $data->fullname);

  $FullNamequery = 'INSERT INTO user_fullname (firstName , secondName , middleName , lastName)VALUES (:FN , :SN , :MN , :LN)';
  $stmt = $conn->prepare($FullNamequery);

  $stmt->bindParam(':FN', $fullname[0]);
  $stmt->bindParam(':SN', $fullname[1]);
  $stmt->bindParam(':MN', $fullname[2]);
  $stmt->bindParam(':LN', $fullname[3]);
  $stmt->execute();
  $nameID = $conn->lastInsertId();

  $DOB = new DateTime($data->dob);

  $userQuery = "INSERT INTO user (Email, password, phone_number ,nameID , date_of_birth) VALUES (:Em, :Ps, :PN , :NID , :DOB)";
  $stmt = $conn->prepare($userQuery);

  $stmt->bindParam(':Em', $data->email);
  $stmt->bindParam(':Ps', $data->password);
  $stmt->bindParam(':PN', $data->phonenumber);
  $da = $DOB->format('Y-m-d H:i:s');
  $stmt->bindParam(':NID', $nameID);
  $stmt->bindParam(':DOB',$da);
  $stmt->execute();

  $last = $conn->lastInsertId();
  $_SESSION['logedIn'] = $last;

  $stmt = $conn->query("SELECT u.Email , uf.firstName , uf.secondName , uf.middleName , uf.lastName  , u.phone_number FROM user u join user_fullname uf on uf.id = u.nameID where u.id = $last");

  $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($users);
}
