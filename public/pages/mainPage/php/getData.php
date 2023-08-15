<?php 
include_once '../../../php/connection.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  session_start();
  $id = $_SESSION['logedIn'];

  $stmt = $conn->query("SELECT u.Email , uf.firstName , uf.secondName , uf.middleName , uf.lastName  , u.phone_number FROM user u join user_fullname uf on uf.id = u.nameID where u.id = $id");

  $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
  echo json_encode($users);
}
