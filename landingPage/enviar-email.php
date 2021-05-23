<?php
date_default_timezone_set('America/Sao_Paulo');
require_once('src/PHPMailer.php');
require_once('src/SMTP.php');
require_once('src/Exception.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ((isset($_POST['email']) && !empty(trim($_POST['email']))) && (isset($_POST['mensagem']) && !empty($_POST['mensagem']))){

    $nome = !empty($_POST['nome']) ? $_POST['nome'] : 'Não Informado';
    $email = $_POST['email'];
    $assunto = !empty($_POST['assunto']) ? $_POST['assunto'] : 'Não Informado';
    $mensagem = $_POST['mensagem'];
    $data = date ('d/m/Y H:i:s');

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'projetointegrador500@gmail.com';
    $mail->Password = 'qwe102030';
    $mail->Port = 587;

    $mail->setFrom('projetointegrador500@gmail.com');
    $mail->addAddress('projetointegrador500@gmail.com');
    

    $mail->isHTML(true);
    $mail->Subject = $assunto;
    $mail->Body = "Nome: {$nome}<br>
                  Email: {$email}<br>
                  Mensagem: {$mensagem}<br>
                  Data/hora: {$data}";
    

    if($mail->send()) {
    echo 'alert( Email enviado com sucesso! )';
    } else {
    echo 'Email não enviado!';
    }
  }else {
    echo 'Não enviado: informar o email e a mensagem!';
  }
