<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"));
  $email = $data->email;
  $status = [true , true];
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $status[0] = false;
  };
  $password = $data->password;
  if (!filter_var($password, FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/")))) {
    $status[1] = false;
  }
  echo json_encode(['email'=>$status[0], 'password' => $status[1]]);
}
