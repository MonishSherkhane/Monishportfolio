<?php 
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST["send"])) {
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];


//Load Composer's autoloader
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'monishsherkhane07@gmail.com';                     //SMTP username
    $mail->Password   = 'rvtw ousa tshb wqpc';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('monishsherkhane07@gmail.com', 'contact form');
    $mail->addAddress('monishsherkhane07@gmail.com', 'website contact form');     //Add a recipient
  

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Enquiry from website Contact Form';
    $mail->Body    = " <b>Sender Name :</b> $name <br>  <b>Sender Email :</b> $email <br> <b>Subject :</b> $message";
    

    $mail->send();
    echo "<div class='success'>Message has been sent</div>";
} catch (Exception $e) {
  echo "<div class='alert'>Message could not be sent. Mailer Error: {$mail->ErrorInfo}</div>";
}

}
?>